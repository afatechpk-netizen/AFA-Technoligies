import fs from "fs";
import path from "path";

export interface ContactQuery {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  market: string;
  phone?: string;
  pod?: string;
  team?: string;
  goal?: string;
  message?: string;
  source: string;
  status: "New" | "Contacted" | "Meeting Scheduled" | "Qualified" | "Closed";
  notes?: string;
}

// Global in-memory cache to guarantee persistence across requests in serverless runtime
declare global {
  // eslint-disable-next-line no-var
  var __afa_queries_cache: ContactQuery[] | undefined;
}

const initialSeedQueries: ContactQuery[] = [
  {
    id: "lead_seed_001",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    name: "Alexander Vance",
    email: "a.vance@cybershield.io",
    company: "CyberShield Enterprise",
    market: "North America (US & Canada)",
    phone: "+1 (415) 890-2341",
    pod: "Cybersecurity & Infrastructure Auth",
    source: "Hero Lead Form",
    status: "New",
    notes: "High priority lead. Seeking outbound sales team for FIDO2 and Zero-Trust auth solution.",
  },
  {
    id: "lead_seed_002",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    name: "Sophia Martinez",
    email: "smartinez@apexplatform.ai",
    company: "Apex Conversational AI",
    market: "EMEA (UK & Europe)",
    phone: "+44 20 7946 0912",
    team: "Full Growth Pod (SDRs + AEs)",
    goal: "Expand enterprise pipeline across UK and DACH regions",
    message: "We have proven product-market fit in Spain and want AFA Technologies to ramp our sales pipeline across UK and Germany.",
    source: "Contact Section",
    status: "Meeting Scheduled",
    notes: "Discovery call booked for Thursday 2:00 PM GMT.",
  },
  {
    id: "lead_seed_003",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    name: "Marcus Sterling",
    email: "m.sterling@keystoneadvisory.co.uk",
    company: "Sterling Global Partners",
    market: "Global Multi-Region",
    phone: "+44 161 496 0123",
    pod: "Enterprise Advisory & Professional Services",
    source: "Hero Lead Form",
    status: "Qualified",
    notes: "Partners approved engagement scope. Contract review in progress.",
  },
];

function getStorageFilePath(): string {
  // In serverless production environments (Vercel), write to /tmp
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "afa_queries.json");
  }
  return path.join(process.cwd(), "data", "queries.json");
}

function ensureDataDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignore if cannot create
    }
  }
}

export function getAllQueries(): ContactQuery[] {
  // Return cached in-memory array if already populated
  if (globalThis.__afa_queries_cache && globalThis.__afa_queries_cache.length > 0) {
    return globalThis.__afa_queries_cache;
  }

  const filePath = getStorageFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      const parsed: ContactQuery[] = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__afa_queries_cache = parsed;
        return parsed;
      }
    }
  } catch {
    // If file read fails, fall back to seed
  }

  // Seed default queries
  globalThis.__afa_queries_cache = [...initialSeedQueries];
  saveToDisk(globalThis.__afa_queries_cache);
  return globalThis.__afa_queries_cache;
}

function saveToDisk(queries: ContactQuery[]) {
  const filePath = getStorageFilePath();
  try {
    ensureDataDirectoryExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(queries, null, 2), "utf8");
  } catch (err) {
    console.warn("Could not write queries to disk, kept in memory:", err);
  }
}

export function addQuery(
  input: Omit<ContactQuery, "id" | "createdAt" | "status">
): ContactQuery {
  const queries = getAllQueries();

  const newQuery: ContactQuery = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "New",
    ...input,
  };

  queries.unshift(newQuery);
  globalThis.__afa_queries_cache = queries;
  saveToDisk(queries);

  return newQuery;
}

export function updateQuery(
  id: string,
  updates: Partial<Omit<ContactQuery, "id" | "createdAt">>
): ContactQuery | null {
  const queries = getAllQueries();
  const index = queries.findIndex((q) => q.id === id);
  if (index === -1) return null;

  queries[index] = {
    ...queries[index],
    ...updates,
    id: queries[index].id,
    createdAt: queries[index].createdAt,
  };

  globalThis.__afa_queries_cache = queries;
  saveToDisk(queries);

  return queries[index];
}

export function updateQueryStatus(
  id: string,
  status: ContactQuery["status"],
  notes?: string
): ContactQuery | null {
  return updateQuery(id, { status, ...(typeof notes === "string" ? { notes } : {}) });
}

export function deleteQuery(id: string): boolean {
  const queries = getAllQueries();
  const nextQueries = queries.filter((q) => q.id !== id);
  if (nextQueries.length === queries.length) return false;

  globalThis.__afa_queries_cache = nextQueries;
  saveToDisk(nextQueries);
  return true;
}
