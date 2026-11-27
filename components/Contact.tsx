"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    market: "",
    team: "",
    goal: "",
    pod: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
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
    if (!formData.goal) newErrors.goal = true;
    if (!formData.pod.trim()) newErrors.pod = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            market: formData.market,
            team: formData.team || undefined,
            goal: formData.goal,
            pod: formData.pod,
            message: formData.message,
            recipient: "sales@afatechnologiesltd.com",
            source: "Contact Section",
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Unable to submit your request right now.");
        }

        setIsSubmitted(true);
      } catch (err) {
        console.warn("Contact form submission error:", err);
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again or email sales@afatechnologiesltd.com."
        );
      } finally {
        setIsSubmitting(false);
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
    if (submitError) setSubmitError(null);
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
                >
                  <path d="M4 11.5l4.5 4.5L18 6" />
                </svg>
                A clear 14-day launch plan, with no obligation
              </li>
            </ul>

            <div className="contact-direct">
              <div className="contact-direct-title">Contact us directly</div>
              <a
                className="contact-direct-link"
                href="mailto:sales@afatechnologiesltd.com"
              >
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span>sales@afatechnologiesltd.com</span>
              </a>
              <a className="contact-direct-link" href="tel:+923243001171">
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>+92 324 3001171</span>
              </a>
            </div>

            <div className="contact-advisor">
              <div className="advisor-sketch-circle" aria-hidden="true">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Passport-style line sketch: head/face, neck, shoulders & upper chest */}
                  <path d="M20 9c-3.4 0-5.8 2.5-5.8 6.1 0 3.5 2.4 6.4 5.8 6.4s5.8-2.9 5.8-6.4C25.8 11.5 23.4 9 20 9z" />
                  <path d="M17.2 21.2v2.4M22.8 21.2v2.4" />
                  <path d="M8.5 36.5c.8-5.8 4.9-9.5 11.5-9.5s10.7 3.7 11.5 9.5" />
                  <path d="M15.8 27.3 20 31.8l4.2-4.5" />
                </svg>
              </div>
              <div>
                <b>Direct GTM Leadership Access</b>
                <span>
                  Speak directly with our senior pipeline strategists. No junior
                  qualifiers.
                </span>
              </div>
            </div>
          </div>

          <div className="form-card reveal-slide-right">
            {!isSubmitted ? (
              <form id="lead-form" noValidate onSubmit={handleSubmit}>
                <h3>Tell us about your goals</h3>

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

                <div className="row2">
                  <div className={`field ${errors.market ? "has-error" : ""}`}>
                    <label htmlFor="f-market">Target market</label>
                    <select
                      id="f-market"
                      name="market"
                      required
                      value={formData.market}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Choose a target market
                      </option>
                      <option value="North America (US & Canada)">
                        North America (US &amp; Canada)
                      </option>
                      <option value="EMEA (UK & Europe)">
                        EMEA (UK &amp; Europe)
                      </option>
                      <option value="APAC (Asia-Pacific)">
                        APAC (Asia-Pacific)
                      </option>
                      <option value="Global Multi-Region">
                        Global Multi-Region
                      </option>
                    </select>
                    <span className="err">Choose a target market.</span>
                  </div>
                  <div className="field">
                    <label htmlFor="f-team">
                      Current sales team size <small>(optional)</small>
                    </label>
                    <select
                      id="f-team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                    >
                      <option value="">Choose your team size</option>
                      <option value="No team yet (Founder-led)">
                        No team yet (Founder-led)
                      </option>
                      <option value="1 to 5 SDRs/AEs">1 to 5 SDRs / AEs</option>
                      <option value="6 to 20 sales team">
                        6 to 20 sales team
                      </option>
                      <option value="20+ Enterprise Sales Org">
                        20+ Enterprise Sales Org
                      </option>
                      <option value="Looking for fully outsourced pod">
                        Looking for fully outsourced pod
                      </option>
                    </select>
                  </div>
                </div>

                <div className={`field ${errors.goal ? "has-error" : ""}`}>
                  <label htmlFor="f-goal">Primary goal</label>
                  <select
                    id="f-goal"
                    name="goal"
                    required
                    value={formData.goal}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Choose a primary goal
                    </option>
                    <option value="Accelerate enterprise pipeline">
                      Accelerate enterprise pipeline
                    </option>
                    <option value="Enter new geographic market">
                      Enter new geographic market
                    </option>
                    <option value="Outsource outbound SDR function">
                      Outsource outbound SDR function
                    </option>
                    <option value="Close high-value enterprise deals">
                      Close high-value enterprise deals
                    </option>
                    <option value="Build RevOps and CRM">
                      Build RevOps and CRM
                    </option>
                    <option value="Other custom requirement">
                      Other custom requirement
                    </option>
                  </select>
                  <span className="err">Choose a primary goal.</span>
                </div>

                <div className={`field ${errors.pod ? "has-error" : ""}`}>
                  <label htmlFor="f-pod">
                    Products and services you want sold
                  </label>
                  <input
                    id="f-pod"
                    name="pod"
                    type="text"
                    placeholder="e.g. Enterprise cybersecurity SaaS, AI automation platform..."
                    required
                    value={formData.pod}
                    onChange={handleChange}
                  />
                  <span className="err">
                    Enter the products or services you want sold.
                  </span>
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

                {submitError && (
                  <p
                    role="alert"
                    style={{
                      color: "#b32d24",
                      fontSize: "0.9rem",
                      marginBottom: "10px",
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <button
                  className="btn btn--navy"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Book my growth strategy call"}
                </button>
                <p className="form-note">
                  We reply within one business day. 100% confidential. Your
                  details are never shared.
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
                  Your inquiry has been sent to{" "}
                  <strong>sales@afatechnologiesltd.com</strong>. Our senior GTM
                  leadership team will be in touch within 24 hours to schedule
                  your growth strategy call.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
