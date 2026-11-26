"use client";

import React, { useState, useEffect } from "react";

const typewriterWords = [
  "To Enterprise Buyers",
  "Across Global Markets",
  "To C-Suite Decision-Makers",
  "Without In-House Hiring",
];

export default function Hero() {
  // Typewriter effect state
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(typewriterWords[0].length);
  const [isDeleting, setIsDeleting] = useState(true);

  useEffect(() => {
    const currentWord = typewriterWords[wordIdx];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((prev) => prev - 1), 35);
      } else {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % typewriterWords.length);
        timeout = setTimeout(() => {}, 400);
      }
    } else {
      if (charIdx < currentWord.length) {
        timeout = setTimeout(() => setCharIdx((prev) => prev + 1), 75);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  // Lead Form state (Unified with Contact Form)
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
            source: "Hero Lead Form",
          }),
        });
      } catch (err) {
        console.warn("Hero lead submission error:", err);
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
    <section className="hero" id="home">
      <div className="hero-bg-accent"></div>

      <div className="wrap">
        <div className="hero-copy hero-slide-in-left">
          <div className="hero-pill">
            <span className="pill-pulse-dot"></span>
            Dedicated B2B Sales Partner for Global Tech Companies
          </div>

          <h1>
            We Sell Your B2B Tech Products
            <br />
            <span className="typewriter-text gradient-heading">
              {typewriterWords[wordIdx].substring(0, charIdx)}
              <span className="typewriter-cursor">|</span>
            </span>
          </h1>

          <p className="hero-lead">
            AFA Technologies acts as the dedicated commercial bridge between your technology and global enterprise decision-makers. You focus on building great products &mdash; we secure qualified buyers and accelerate revenue.
          </p>

          <div className="cta-cluster">
            <a className="btn btn--primary" href="#contact">
              Deploy a Dedicated Sales Pod &rarr;
            </a>
            <a className="btn btn--glass" href="#client-impact">
              View Verified Client Results
            </a>
          </div>

          <div className="hero-highlights">
            <div className="hero-stat-card">
              <span className="hero-stat-val">14 Days</span>
              <span className="hero-stat-lbl">To Launch Dedicated Pod</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val">4.8&times;</span>
              <span className="hero-stat-lbl">Avg. Pipeline Velocity</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-lbl">Outcome Alignment</span>
            </div>
          </div>

          <ul className="hero-trust-bullets">
            <li>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              Enterprise-grade sales infrastructure
            </li>
            <li>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              Global multi-region outbound reach
            </li>
            <li>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              Live in 14 days &bull; Zero in-house hiring overhead
            </li>
          </ul>
        </div>

        {/* Right Side: Consultation Booking Form */}
        <div className="hero-form-card hero-slide-in-right" aria-label="Get a Dedicated Sales Team for Your Product">
          {!isSubmitted ? (
            <form id="hero-lead-form" noValidate onSubmit={handleSubmit}>
              <div className="hero-form-badge">
                <span className="hfb-dot"></span> 14-Day Sales Pod Deployment
              </div>
              <h3>Get a Dedicated Sales Team for Your Product</h3>
              <p className="hero-form-desc">
                Tell us what tech product or service you want sold &mdash; our commercial leadership will deliver a buyer acquisition roadmap within 24 hours.
              </p>

              <div className="row2">
                <div className={`field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="hf-name">Full name</label>
                  <input
                    id="hf-name"
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
                  <label htmlFor="hf-email">Work email</label>
                  <input
                    id="hf-email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="err">Enter your work email.</span>
                </div>
              </div>

              <div className="row2">
                <div className={`field ${errors.company ? "has-error" : ""}`}>
                  <label htmlFor="hf-company">Company name</label>
                  <input
                    id="hf-company"
                    name="company"
                    type="text"
                    placeholder="Acme Technologies"
                    autoComplete="organization"
                    required
                    value={formData.company}
                    onChange={handleChange}
                  />
                  <span className="err">Enter your company.</span>
                </div>
                <div className={`field ${errors.market ? "has-error" : ""}`}>
                  <label htmlFor="hf-market">Target market</label>
                  <select
                    id="hf-market"
                    name="market"
                    required
                    value={formData.market}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select buyer market
                    </option>
                    <option value="North America (US & Canada)">North America (US &amp; Canada)</option>
                    <option value="EMEA (UK & Europe)">EMEA (UK &amp; Europe)</option>
                    <option value="APAC (Asia-Pacific)">APAC (Asia-Pacific)</option>
                    <option value="Global Multi-Region">Global Multi-Region</option>
                  </select>
                  <span className="err">Select a target market.</span>
                </div>
              </div>

              <div className="row2">
                <div className={`field ${errors.pod ? "has-error" : ""}`}>
                  <label htmlFor="hf-pod">Product / service category</label>
                  <select
                    id="hf-pod"
                    name="pod"
                    required
                    value={formData.pod}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select product or service category
                    </option>
                    <option value="B2B SaaS & Software Platform">
                      B2B SaaS &amp; Software Platform
                    </option>
                    <option value="Cybersecurity & Infrastructure Auth">
                      Cybersecurity &amp; Infrastructure Auth
                    </option>
                    <option value="AI & Digital Platform Technology">
                      AI &amp; Digital Platform Technology
                    </option>
                    <option value="Enterprise Advisory & Professional Services">
                      Enterprise Advisory &amp; Services
                    </option>
                    <option value="Custom Tech Solution / Other">
                      Custom Tech Solution / Other
                    </option>
                  </select>
                  <span className="err">Select product or service.</span>
                </div>

                <div className={`field ${errors.team ? "has-error" : ""}`}>
                  <label htmlFor="hf-team">Current sales team size</label>
                  <select
                    id="hf-team"
                    name="team"
                    required
                    value={formData.team}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select team size
                    </option>
                    <option value="No team yet (Founder-led)">
                      No team yet (Founder-led)
                    </option>
                    <option value="1 to 5 SDRs/AEs">
                      1 to 5 SDRs / AEs
                    </option>
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
                  <span className="err">Select team size.</span>
                </div>
              </div>

              <div className={`field ${errors.goal ? "has-error" : ""}`}>
                <label htmlFor="hf-goal">Primary commercial goal</label>
                <select
                  id="hf-goal"
                  name="goal"
                  required
                  value={formData.goal}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select primary goal
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
                <span className="err">Select a primary goal.</span>
              </div>

              <div className="field">
                <label htmlFor="hf-msg">
                  Anything else we should know? <small>(optional)</small>
                </label>
                <textarea
                  id="hf-msg"
                  name="message"
                  rows={2}
                  placeholder="Tell us about your product, deal size, or target timeline..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button className="btn-hero-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Sales Team Blueprint \u2192"}
              </button>

              <div className="hero-form-trust">
                <span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  14-Day Deployment
                </span>
                <span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  100% Confidential
                </span>
                <span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  24h Response SLA
                </span>
              </div>
            </form>
          ) : (
            <div className="hero-form-done is-shown" role="status" aria-live="polite">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="24" cy="24" r="20" />
                <path d="M15 25l6 6 12-14" />
              </svg>
              <h3>Blueprint Request Received!</h3>
              <p>
                Our commercial leadership team will review your product and reach out within 24 hours with a custom enterprise buyer acquisition roadmap.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
