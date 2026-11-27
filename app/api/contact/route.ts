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

    const targetEmail = "sales@afatechnologiesltd.com";

    // Optional email delivery via Resend if RESEND_API_KEY is configured in environment
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "AFA Technologies <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: email.trim().toLowerCase(),
            subject: `New Growth Strategy Call Request: ${company.trim()} (${name.trim()})`,
            text: [
              `Name: ${name.trim()}`,
              `Email: ${email.trim().toLowerCase()}`,
              `Company: ${company.trim()}`,
              `Target Market: ${(market || "Unspecified").trim()}`,
              `Sales Team Size: ${team ? String(team).trim() : "Not specified"}`,
              `Primary Goal: ${goal ? String(goal).trim() : "Not specified"}`,
              `Products/Services: ${pod ? String(pod).trim() : "Not specified"}`,
              `Message: ${message ? String(message).trim() : "None"}`,
              `Source: ${source || "Website Lead Form"}`,
            ].join("\n"),
          }),
        });
      } catch (emailErr) {
        console.warn("Email delivery warning (lead still saved):", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your query has been successfully received.",
        leadId: savedLead.id,
        recipient: targetEmail,
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
