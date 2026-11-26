"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ContactQuery } from "@/lib/storage";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [adminUser, setAdminUser] = useState<string>("Admin");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");

  // Modals state
  const [selectedLead, setSelectedLead] = useState<ContactQuery | null>(null);
  const [editingLead, setEditingLead] = useState<ContactQuery | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<{ id: string; name: string } | null>(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    market: "",
    pod: "",
    team: "",
    goal: "",
    message: "",
    status: "New" as ContactQuery["status"],
    notes: "",
  });

  const [leadNotes, setLeadNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Fetch queries from API
  const fetchQueries = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/queries");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setQueries(data.data || []);
        if (data.admin) setAdminUser(data.admin);
      }
    } catch (err) {
      console.error("Failed to load queries:", err);
    } finally {
      setIsLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // Open Edit Modal with lead details
  const openEditModal = (q: ContactQuery) => {
    setEditingLead(q);
    setEditFormData({
      name: q.name || "",
      email: q.email || "",
      phone: q.phone || "",
      company: q.company || "",
      market: q.market || "",
      pod: q.pod || "",
      team: q.team || "",
      goal: q.goal || "",
      message: q.message || "",
      status: q.status || "New",
      notes: q.notes || "",
    });
  };

  // Submit Edit Form
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    setIsSavingEdit(true);
    try {
      const res = await fetch("/api/admin/queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingLead.id,
          name: editFormData.name.trim(),
          email: editFormData.email.trim(),
          phone: editFormData.phone.trim() || undefined,
          company: editFormData.company.trim(),
          market: editFormData.market.trim(),
          pod: editFormData.pod.trim() || undefined,
          team: editFormData.team.trim() || undefined,
          goal: editFormData.goal.trim() || undefined,
          message: editFormData.message.trim() || undefined,
          status: editFormData.status,
          notes: editFormData.notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setQueries((prev) =>
          prev.map((q) => (q.id === editingLead.id ? { ...q, ...data.data } : q))
        );
        if (selectedLead && selectedLead.id === editingLead.id) {
          setSelectedLead(data.data);
          setLeadNotes(data.data.notes || "");
        }
        setEditingLead(null);
        showTemporaryMessage("Query details updated successfully.");
      } else {
        alert(data.error || "Failed to update query.");
      }
    } catch (err) {
      console.error("Failed to update query:", err);
      alert("Error saving updates. Please try again.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Quick Status update handler
  const handleStatusChange = async (
    id: string,
    newStatus: ContactQuery["status"],
    notes?: string
  ) => {
    try {
      const res = await fetch("/api/admin/queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setQueries((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, status: newStatus, notes: notes ?? q.notes } : q
          )
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) =>
            prev ? { ...prev, status: newStatus, notes: notes ?? prev.notes } : null
          );
        }
        showTemporaryMessage("Status updated successfully.");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Execute Delete
  const confirmDeleteQuery = async () => {
    if (!deleteConfirmId) return;
    const { id } = deleteConfirmId;

    try {
      const res = await fetch(`/api/admin/queries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        if (editingLead?.id === id) setEditingLead(null);
        showTemporaryMessage("Inquiry permanently deleted.");
      } else {
        alert(data.error || "Failed to delete query.");
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  // Save notes handler
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNotes(true);
    await handleStatusChange(selectedLead.id, selectedLead.status, leadNotes);
    setIsSavingNotes(false);
    showTemporaryMessage("Internal notes saved.");
  };

  const showTemporaryMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Filtered queries calculation
  const filteredQueries = useMemo(() => {
    return queries.filter((q) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        q.name.toLowerCase().includes(searchLower) ||
        q.email.toLowerCase().includes(searchLower) ||
        q.company.toLowerCase().includes(searchLower) ||
        (q.phone && q.phone.toLowerCase().includes(searchLower)) ||
        (q.pod && q.pod.toLowerCase().includes(searchLower)) ||
        (q.team && q.team.toLowerCase().includes(searchLower)) ||
        (q.message && q.message.toLowerCase().includes(searchLower)) ||
        (q.notes && q.notes.toLowerCase().includes(searchLower));

      const matchesStatus = statusFilter === "All" || q.status === statusFilter;
      const matchesSource = sourceFilter === "All" || q.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [queries, searchQuery, statusFilter, sourceFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = queries.length;
    const newCount = queries.filter((q) => q.status === "New").length;
    const scheduledCount = queries.filter(
      (q) => q.status === "Meeting Scheduled" || q.status === "Contacted"
    ).length;
    const qualifiedCount = queries.filter((q) => q.status === "Qualified").length;
    const closedCount = queries.filter((q) => q.status === "Closed").length;
    return { total, newCount, scheduledCount, qualifiedCount, closedCount };
  }, [queries]);

  // Export to CSV
  const handleExportCSV = () => {
    if (queries.length === 0) {
      alert("No data to export.");
      return;
    }
    const headers = [
      "ID",
      "Date",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Market",
      "Product / Pod",
      "Goal / Message",
      "Source",
      "Status",
      "Notes",
    ];

    const rows = queries.map((q) => [
      `"${q.id}"`,
      `"${new Date(q.createdAt).toLocaleString()}"`,
      `"${q.name.replace(/"/g, '""')}"`,
      `"${q.email.replace(/"/g, '""')}"`,
      `"${(q.phone || "").replace(/"/g, '""')}"`,
      `"${q.company.replace(/"/g, '""')}"`,
      `"${(q.market || "").replace(/"/g, '""')}"`,
      `"${(q.pod || q.team || "").replace(/"/g, '""')}"`,
      `"${(q.message || q.goal || "").replace(/"/g, '""')}"`,
      `"${q.source.replace(/"/g, '""')}"`,
      `"${q.status}"`,
      `"${(q.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `afa_technologies_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status: ContactQuery["status"]) => {
    switch (status) {
      case "New":
        return "status-tag--new";
      case "Contacted":
        return "status-tag--contacted";
      case "Meeting Scheduled":
        return "status-tag--scheduled";
      case "Qualified":
        return "status-tag--qualified";
      case "Closed":
        return "status-tag--closed";
      default:
        return "";
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="admin-portal-root">
      {/* Top Navigation Bar */}
      <header className="admin-header">
        <div className="admin-header-wrap">
          <div className="admin-brand-left">
            <a href="/admin" className="admin-brand-link">
              <Image
                src="/images/logo.webp"
                alt="AFA Technologies Logo"
                width={46}
                height={46}
                className="admin-header-logo"
                priority
              />
              <div>
                <span className="admin-title">AFA Technologies</span>
                <span className="admin-subtitle">Inbound &amp; Outbound Leads Admin</span>
              </div>
            </a>
          </div>

          <div className="admin-header-right">
            <div className="admin-live-badge">
              <span className="live-ping-dot" />
              <span>
                Signed in as: <b>{adminUser}</b>
              </span>
            </div>

            <button
              onClick={() => fetchQueries(true)}
              className={`btn-admin-action ${isRefreshing ? "is-loading" : ""}`}
              title="Refresh leads data"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="btn-admin-action"
              title="Download CSV"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Export CSV</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn-admin-action"
              title="View Live Website"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Live Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="btn-admin-logout"
              title="Log out"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="admin-main-wrap">
        {actionMessage && (
          <div className="admin-toast-banner" role="status">
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Dashboard Title & Quick Stats */}
        <div className="admin-section-header">
          <div>
            <h1 className="admin-page-title">Client Inquiries &amp; Consultations</h1>
            <p className="admin-page-desc">
              Manage incoming consultation requests from Hero and Contact forms. Edit, update status, and track sales pipeline.
            </p>
          </div>

          <div className="admin-stats-pills">
            <div className="stat-pill" onClick={() => setStatusFilter("All")}>
              <span className="stat-pill-num">{metrics.total}</span>
              <span className="stat-pill-lbl">Total Queries</span>
            </div>
            <div
              className={`stat-pill stat-pill--new ${statusFilter === "New" ? "active" : ""}`}
              onClick={() => setStatusFilter("New")}
            >
              <span className="stat-pill-num">{metrics.newCount}</span>
              <span className="stat-pill-lbl">New Leads</span>
            </div>
            <div
              className={`stat-pill stat-pill--progress ${
                statusFilter === "Meeting Scheduled" ? "active" : ""
              }`}
              onClick={() => setStatusFilter("Meeting Scheduled")}
            >
              <span className="stat-pill-num">{metrics.scheduledCount}</span>
              <span className="stat-pill-lbl">In Progress</span>
            </div>
            <div
              className={`stat-pill stat-pill--qualified ${
                statusFilter === "Qualified" ? "active" : ""
              }`}
              onClick={() => setStatusFilter("Qualified")}
            >
              <span className="stat-pill-num">{metrics.qualifiedCount}</span>
              <span className="stat-pill-lbl">Qualified</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="admin-controls-card">
          <div className="search-input-box">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, company, pod, notes, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <div className="filters-group">
            <div className="filter-select-item">
              <label>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Meeting Scheduled">Meeting Scheduled</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="filter-select-item">
              <label>Form Source:</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <option value="All">All Sources</option>
                <option value="Hero Lead Form">Hero Lead Form</option>
                <option value="Contact Section">Contact Section</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Table Card */}
        <div className="admin-table-container">
          {isLoading ? (
            <div className="admin-loading-state">
              <div className="admin-spinner-large" />
              <p>Loading inquiries...</p>
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="admin-empty-state">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <h3>No inquiries found</h3>
              <p>
                {searchQuery || statusFilter !== "All" || sourceFilter !== "All"
                  ? "Try resetting your search query or filters."
                  : "New submissions from the website will automatically appear here."}
              </p>
            </div>
          ) : (
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Client / Company</th>
                  <th>Contact Info</th>
                  <th>Target Market / Product</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.map((q) => (
                  <tr key={q.id}>
                    <td className="cell-client">
                      <div className="lead-avatar-col">
                        <div className="lead-avatar-badge">
                          {q.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="lead-name-text">{q.name}</div>
                          <div className="lead-company-text">{q.company}</div>
                        </div>
                      </div>
                    </td>

                    <td className="cell-contact">
                      <a
                        href={`mailto:${q.email}`}
                        className="lead-email-link"
                        title="Click to email"
                      >
                        {q.email}
                      </a>
                      {q.phone && (
                        <div className="lead-phone-text">
                          <a href={`tel:${q.phone}`} className="lead-phone-link">
                            {q.phone}
                          </a>
                        </div>
                      )}
                    </td>

                    <td className="cell-details">
                      <div className="lead-market-tag">{q.market || "General"}</div>
                      <div className="lead-pod-sub">
                        {q.pod || q.team || "Dedicated Pod"}
                      </div>
                    </td>

                    <td className="cell-source">
                      <span className="source-pill">{q.source}</span>
                    </td>

                    <td className="cell-date">{formatDate(q.createdAt)}</td>

                    <td className="cell-status">
                      <select
                        value={q.status}
                        onChange={(e) =>
                          handleStatusChange(
                            q.id,
                            e.target.value as ContactQuery["status"]
                          )
                        }
                        className={`status-select ${getStatusBadgeClass(q.status)}`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="Meeting Scheduled">● Meeting Scheduled</option>
                        <option value="Qualified">● Qualified</option>
                        <option value="Closed">● Closed</option>
                      </select>
                    </td>

                    <td className="cell-actions" style={{ textAlign: "right" }}>
                      <button
                        onClick={() => {
                          setSelectedLead(q);
                          setLeadNotes(q.notes || "");
                        }}
                        className="btn-view-details"
                        title="View details & notes"
                      >
                        View
                      </button>

                      <button
                        onClick={() => openEditModal(q)}
                        className="btn-edit-details"
                        title="Edit inquiry details"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          setDeleteConfirmId({ id: q.id, name: q.name })
                        }
                        className="btn-delete-row"
                        title="Delete inquiry"
                        aria-label="Delete inquiry"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* VIEW MODAL */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <span className="modal-lead-source">{selectedLead.source}</span>
                <h2 className="modal-lead-name">{selectedLead.name}</h2>
                <span className="modal-lead-company">{selectedLead.company}</span>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  className="btn-modal-edit"
                  onClick={() => {
                    openEditModal(selectedLead);
                    setSelectedLead(null);
                  }}
                  title="Edit this inquiry"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  className="btn-close-modal"
                  onClick={() => setSelectedLead(null)}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-grid-2">
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="detail-val-link"
                  >
                    {selectedLead.email} &rarr;
                  </a>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="detail-val-link">
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <span className="detail-val" style={{ color: "#94a3b8" }}>
                      Not provided
                    </span>
                  )}
                </div>

                <div className="detail-item">
                  <span className="detail-label">Submission Date</span>
                  <span className="detail-val">
                    {formatDate(selectedLead.createdAt)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Target Market</span>
                  <span className="detail-val">
                    {selectedLead.market || "Unspecified"}
                  </span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Required Product / Pod / Team</span>
                  <span className="detail-val">
                    {selectedLead.pod || selectedLead.team || "Dedicated Pod"}
                  </span>
                </div>
              </div>

              {(selectedLead.message || selectedLead.goal) && (
                <div className="detail-item full-width">
                  <span className="detail-label">Submitted Message / Goal</span>
                  <div className="message-box">
                    <p>{selectedLead.message || selectedLead.goal}</p>
                  </div>
                </div>
              )}

              {/* Status Selector */}
              <div className="detail-item full-width">
                <span className="detail-label">Lead Status</span>
                <div className="status-selector-row">
                  {(
                    [
                      "New",
                      "Contacted",
                      "Meeting Scheduled",
                      "Qualified",
                      "Closed",
                    ] as const
                  ).map((st) => (
                    <button
                      key={st}
                      className={`status-btn-choice ${
                        selectedLead.status === st ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        handleStatusChange(selectedLead.id, st, leadNotes)
                      }
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="detail-item full-width">
                <span className="detail-label">Internal Sales Notes</span>
                <textarea
                  className="lead-notes-area"
                  rows={4}
                  placeholder="Add notes about calls, discovery meetings, commercial requirements..."
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="btn-save-notes"
                >
                  {isSavingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={`mailto:${selectedLead.email}?subject=AFA%20Technologies%20-%20Sales%20Pod%20Strategy%20Follow-up`}
                  className="btn-email-lead"
                >
                  Email {selectedLead.name.split(" ")[0]} &rarr;
                </a>
                <button
                  onClick={() => {
                    const l = selectedLead;
                    setSelectedLead(null);
                    setDeleteConfirmId({ id: l.id, name: l.name });
                  }}
                  className="btn-delete-footer"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="btn-close-footer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingLead && (
        <div className="modal-backdrop" onClick={() => setEditingLead(null)}>
          <div
            className="admin-modal-card admin-edit-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <span className="modal-lead-source">Edit Inquiry Details</span>
                <h2 className="modal-lead-name">Edit Lead: {editingLead.name}</h2>
              </div>
              <button
                className="btn-close-modal"
                onClick={() => setEditingLead(null)}
                aria-label="Close edit modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="modal-grid-2">
                  <div className="form-group-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      required
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="+92 343 6622666"
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.company}
                      onChange={(e) =>
                        setEditFormData((p) => ({ ...p, company: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Target Market</label>
                    <input
                      type="text"
                      value={editFormData.market}
                      onChange={(e) =>
                        setEditFormData((p) => ({ ...p, market: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Product / Pod / Team</label>
                    <input
                      type="text"
                      value={editFormData.pod || editFormData.team}
                      onChange={(e) =>
                        setEditFormData((p) => ({
                          ...p,
                          pod: e.target.value,
                          team: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="form-group-field full-width">
                  <label>Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData((p) => ({
                        ...p,
                        status: e.target.value as ContactQuery["status"],
                      }))
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Meeting Scheduled">Meeting Scheduled</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="form-group-field full-width">
                  <label>Message / Goal</label>
                  <textarea
                    rows={3}
                    value={editFormData.message || editFormData.goal}
                    onChange={(e) =>
                      setEditFormData((p) => ({
                        ...p,
                        message: e.target.value,
                        goal: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="form-group-field full-width">
                  <label>Internal Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Add or update internal notes..."
                    value={editFormData.notes}
                    onChange={(e) =>
                      setEditFormData((p) => ({ ...p, notes: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="btn-save-edit-submit"
                >
                  {isSavingEdit ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="btn-close-footer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div
          className="modal-backdrop"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="admin-modal-card confirm-delete-card"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h2 className="modal-lead-name" style={{ color: "#ef4444" }}>
                Delete Inquiry
              </h2>
              <button
                className="btn-close-modal"
                onClick={() => setDeleteConfirmId(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ gap: "10px" }}>
              <p style={{ margin: 0, color: "#334155", fontSize: "0.95rem" }}>
                Are you sure you want to permanently delete the inquiry from{" "}
                <b>&quot;{deleteConfirmId.name}&quot;</b>?
              </p>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={confirmDeleteQuery}
                className="btn-confirm-delete"
              >
                Yes, Delete Inquiry
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-close-footer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
