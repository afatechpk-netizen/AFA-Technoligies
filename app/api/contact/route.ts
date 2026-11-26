import { NextResponse } from "next/server";
import { addQuery } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, market, pod, team, goal, message, source } = body;

    // Validate essential fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!company || typeof company !== "string" || !company.trim()) {
      return NextResponse.json(
        { error: "Company name is required." },
        { status: 400 }
      );
    }

    const savedLead = addQuery({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      company: company.trim(),
      market: (market || "Unspecified").trim(),
      pod: pod ? String(pod).trim() : undefined,
      team: team ? String(team).trim() : undefined,
      goal: goal ? String(goal).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      source: source || "Website Lead Form",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your query has been successfully received.",
        leadId: savedLead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Internal server error processing submission." },
      { status: 500 }
    );
  }
}
