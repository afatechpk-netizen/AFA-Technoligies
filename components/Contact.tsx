"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    market: "",
    pod: "",
    team: "",
    goal: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = true;
    }
    if (!formData.company.trim()) newErrors.company = true;
    if (!formData.market) newErrors.market = true;
    if (!formData.pod) newErrors.pod = true;
    if (!formData.team) newErrors.team = true;
    if (!formData.goal) newErrors.goal = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            market: formData.market,
            pod: formData.pod,
            team: formData.team,
            goal: formData.goal,
            message: formData.message,
            source: "Contact Section",
          }),
        });
      } catch (err) {
        console.warn("Contact form submission error:", err);
      } finally {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <section
      className="section section--mist"
      id="contact"
      style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}
    >
      <div className="wrap">
        <div className="contact-panel">
          <div className="contact-copy reveal-slide-left">
            <h2>
              Ready to turn outbound into your most reliable growth channel?
            </h2>
            <p>
              Schedule a 25-minute GTM strategy session with our leadership team
              to map out a custom sales pod for your target market.
            </p>
            <ul className="agenda">
              <li>
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11.5l4.5 4.5L18 6" />
                </svg>
                A quick review of your current sales motion and goals
              </li>
              <li>
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11.5l4.5 4.5L18 6" />
                </svg>
                A recommended pod structure for your target market
              </li>
              <li>
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11.5l4.5 4.5L18 6" />
                </svg>
                A clear 14-day launch plan, with no obligation
              </li>
            </ul>

            <p className="contact-alt">
              Prefer direct outreach? Write to{" "}
              <a href="mailto:hello@afatechnologiesltd.com">
                hello@afatechnologiesltd.com
              </a>{" "}
              or call{" "}
              <a href="tel:+923436622666">
                +92 343 6622666
              </a>
            </p>

            <div className="contact-advisor">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                alt="AFA Technologies Senior GTM Sales Strategist"
                className="advisor-avatar"
                width={48}
                height={48}
                loading="lazy"
              />
              <div>
                <b>Direct GTM Leadership Access</b>
                <span>
                  Speak directly with our senior pipeline strategists &mdash; no
                  junior qualifiers.
                </span>
              </div>
            </div>
          </div>

          <div className="form-card reveal-slide-right">
            {!isSubmitted ? (
              <form id="lead-form" noValidate onSubmit={handleSubmit}>
                <h3>Tell us about your product &amp; goals</h3>

                <div className="row2">
                  <div className={`field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="f-name">Full name</label>
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <span className="err">Enter your full name.</span>
                  </div>
                  <div className={`field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="f-email">Work email</label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <span className="err">
                      Enter a work email like name@company.com.
                    </span>
                  </div>
                </div>

                <div className="row2">
                  <div className={`field ${errors.company ? "has-error" : ""}`}>
                    <label htmlFor="f-company">Company name</label>
                    <input
                      id="f-company"
                      name="company"
                      type="text"
                      placeholder="Acme Technologies"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <span className="err">Enter your company name.</span>
                  </div>
                  <div className={`field ${errors.market ? "has-error" : ""}`}>
                    <label htmlFor="f-market">Target market</label>
                    <select
                      id="f-market"
                      name="market"
                      required
                      value={formData.market}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Choose a target market</option>
                      <option value="North America (US & Canada)">North America (US &amp; Canada)</option>
                      <option value="EMEA (UK & Europe)">EMEA (UK &amp; Europe)</option>
                      <option value="APAC (Asia-Pacific)">APAC (Asia-Pacific)</option>
                      <option value="Global Multi-Region">Global Multi-Region</option>
                    </select>
                    <span className="err">Choose a target market.</span>
                  </div>
                </div>

                <div className="row2">
                  <div className={`field ${errors.pod ? "has-error" : ""}`}>
                    <label htmlFor="f-pod">Product / service category</label>
                    <select
                      id="f-pod"
                      name="pod"
                      required
                      value={formData.pod}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select product or service</option>
                      <option value="B2B SaaS & Software Platform">B2B SaaS &amp; Software Platform</option>
                      <option value="Cybersecurity & Infrastructure Auth">Cybersecurity &amp; Infrastructure Auth</option>
                      <option value="AI & Digital Platform Technology">AI &amp; Digital Platform Technology</option>
                      <option value="Enterprise Advisory & Professional Services">Enterprise Advisory &amp; Services</option>
                      <option value="Custom Tech Solution / Other">Custom Tech Solution / Other</option>
                    </select>
                    <span className="err">Select product or service.</span>
                  </div>
                  <div className={`field ${errors.team ? "has-error" : ""}`}>
                    <label htmlFor="f-team">Current sales team size</label>
                    <select
                      id="f-team"
                      name="team"
                      required
                      value={formData.team}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Choose your team size</option>
                      <option value="No team yet (Founder-led)">No team yet (Founder-led)</option>
                      <option value="1 to 5 SDRs/AEs">1 to 5 SDRs / AEs</option>
                      <option value="6 to 20 sales team">6 to 20 sales team</option>
                      <option value="20+ Enterprise Sales Org">20+ Enterprise Sales Org</option>
                      <option value="Looking for fully outsourced pod">Looking for fully outsourced pod</option>
                    </select>
                    <span className="err">Choose your team size.</span>
                  </div>
                </div>

                <div className={`field ${errors.goal ? "has-error" : ""}`}>
                  <label htmlFor="f-goal">Primary commercial goal</label>
                  <select
                    id="f-goal"
                    name="goal"
                    required
                    value={formData.goal}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Choose a primary goal</option>
                    <option value="Accelerate enterprise pipeline">Accelerate enterprise pipeline</option>
                    <option value="Enter new geographic market">Enter new geographic market</option>
                    <option value="Outsource outbound SDR function">Outsource outbound SDR function</option>
                    <option value="Close high-value enterprise deals">Close high-value enterprise deals</option>
                    <option value="Build RevOps and CRM">Build RevOps and CRM</option>
                    <option value="Other custom requirement">Other custom requirement</option>
                  </select>
                  <span className="err">Choose a primary goal.</span>
                </div>

                <div className="field">
                  <label htmlFor="f-msg">
                    Anything else we should know? <small>(optional)</small>
                  </label>
                  <textarea
                    id="f-msg"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your product, deal size, or target timeline..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button className="btn btn--navy" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Book my growth strategy call \u2192"}
                </button>
                <p className="form-note">
                  We reply within one business day. 100% confidential. Your details are never shared.
                </p>
              </form>
            ) : (
              <div className="form-done is-shown" role="status" aria-live="polite">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="20" />
                  <path d="M15 25l6 6 12-14" />
                </svg>
                <h3>Thank you. We have your request.</h3>
                <p>
                  Our team will be in touch within 24 hours to review your commercial blueprint and schedule your strategy call.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
