"use client";

import React, { useState, useEffect } from "react";

const typewriterWords = [
  "To Enterprise Buyers",
  "Across Global Markets",
  "To C-Suite Decision-Makers",
  "Without In-House Hiring",
];

interface PipelinePreviewItem {
  id: string;
  title: string;
  meta: string;
  status: string;
  statusTone: "blue" | "green";
  floatTitle: string;
  floatSub: string;
  summaryBefore: string;
  highlight1: string;
  summaryMid: string;
  highlight2: string;
  summaryAfter: string;
  signalTitle: string;
  signalMeta: string;
  signalStatus: string;
}

const pipelineItems: PipelinePreviewItem[] = [
  {
    id: "icp",
    title: "1. Find Your Buyers",
    meta: "Week 1 • Target ICP",
    status: "50+ accounts",
    statusTone: "blue",
    floatTitle: "How AFA Sells Your Product",
    floatSub: "Step 1 of 4 • Verified buyer list ready",
    summaryBefore: "We research your market and identify the exact ",
    highlight1: "C-Suite decision-makers",
    summaryMid: " who need your product, building a verified list of ",
    highlight2: "high-intent companies",
    summaryAfter: " ready for outreach.",
    signalTitle: "Target Buyer & Account List",
    signalMeta: "CTOs, CISOs, VPs & Founders in your target market",
    signalStatus: "Included",
  },
  {
    id: "outreach",
    title: "2. Run Outbound",
    meta: "Email + LinkedIn + Calls",
    status: "Active",
    statusTone: "blue",
    floatTitle: "How AFA Sells Your Product",
    floatSub: "Step 2 of 4 • Multi-channel outreach live",
    summaryBefore: "Our dedicated sales pod reaches out under ",
    highlight1: "your brand name",
    summaryMid: " using tailored emails, LinkedIn, and executive calls to spark ",
    highlight2: "real buyer conversations",
    summaryAfter: ".",
    signalTitle: "Dedicated Outbound Sales Pod",
    signalMeta: "Trained SDRs & closers representing your company",
    signalStatus: "Included",
  },
  {
    id: "demos",
    title: "3. Book Sales Calls",
    meta: "Qualified Decision-Makers",
    status: "Booked",
    statusTone: "green",
    floatTitle: "How AFA Sells Your Product",
    floatSub: "Step 3 of 4 • Meetings on your calendar",
    summaryBefore: "Every prospect is pre-qualified for budget and need before we ",
    highlight1: "book the demo",
    summaryMid: " directly onto your calendar — so you only speak with ",
    highlight2: "serious buyers",
    summaryAfter: ".",
    signalTitle: "Qualified Enterprise Meetings",
    signalMeta: "Pre-screened buyers with active need & budget",
    signalStatus: "Booked",
  },
  {
    id: "pipeline",
    title: "4. Close Revenue",
    meta: "Full Pipeline Support",
    status: "Live",
    statusTone: "green",
    floatTitle: "How AFA Sells Your Product",
    floatSub: "Step 4 of 4 • Predictable B2B revenue",
    summaryBefore: "We manage follow-ups, CRM tracking, and deal progression to turn ",
    highlight1: "qualified demos",
    summaryMid: " into signed contracts and ",
    highlight2: "predictable monthly revenue",
    summaryAfter: ".",
    signalTitle: "Full CRM & Deal Reporting",
    signalMeta: "Weekly pipeline visibility without hiring overhead",
    signalStatus: "Live",
  },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(typewriterWords[0].length);
  const [isDeleting, setIsDeleting] = useState(true);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

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

  const activeItem = pipelineItems[activeItemIdx];

  return (
    <section className="hero" id="home">
      <div className="hero-bg-accent"></div>

      <div className="wrap">
        <div className="hero-copy hero-slide-in-left">
          <div className="hero-pill">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>
              B2B Commercial Sales Partner &bull; The Bridge Between Tech &amp; Enterprise Buyers
            </span>
          </div>

          <h1>
            We Sell Your Tech Products &amp; Services
            <br />
            <span className="hero-highlight">
              <span>{typewriterWords[wordIdx].substring(0, charIdx)}</span>
              <span className="cursor-blink"></span>
            </span>
          </h1>

          <p className="lead">
            <strong>You build the technology. We help you sell it.</strong>
            AFA Technologies is a B2B sales partner for companies with market-ready technology products and services. We sell your products and services to enterprise buyers on your behalf.
          </p>

          <div className="hero-cta">
            <a className="btn-talk" href="#contact">
              Get Sales Team Blueprint <span>&rarr;</span>
            </a>
            <a className="btn-explore" href="#solutions">
              How We Sell For You
            </a>
          </div>

          <ul className="proof-list">
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
              We sell your products for you (Dedicated Sales Pods)
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
              Direct C-suite buyer access &amp; qualified enterprise meetings
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

        {/* Right Side: Clear 4-Step Sales Engine Interactive Card */}
        <div
          className="hero-engine-stage hero-slide-in-right"
          aria-label="How AFA Technologies Sells Your Product"
        >
          {/* Floating Dark Header Pill */}
          <div className="hero-engine-toast" role="status" aria-live="polite">
            <span className="hero-engine-toast-icon" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <b>{activeItem.floatTitle}</b>
              <span>{activeItem.floatSub}</span>
            </div>
          </div>

          <div className="hero-engine-card">
            {/* Left Sidebar: 4 Simple Steps */}
            <div className="hero-engine-sidebar">
              <div className="hero-engine-sidebar-head">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 12 12 17 22 12" />
                  <polyline points="2 17 12 22 22 17" />
                </svg>
                <span>Your Sales Pod</span>
              </div>

              <div className="hero-engine-list" role="tablist" aria-label="4-step sales process">
                {pipelineItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={activeItemIdx === idx}
                    onClick={() => setActiveItemIdx(idx)}
                    className={`hero-engine-item ${
                      activeItemIdx === idx ? "is-active" : ""
                    }`}
                  >
                    <strong className="hero-engine-item-title">{item.title}</strong>
                    <span className="hero-engine-item-meta">{item.meta}</span>
                    <span
                      className={`hero-engine-item-status hero-engine-item-status--${item.statusTone}`}
                    >
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Detail Pane */}
            <div className="hero-engine-detail" role="tabpanel">
              <div className="hero-engine-detail-head">
                <h4>{activeItem.title}</h4>
                <span className="hero-engine-badge">14-Day Launch</span>
              </div>

              <div className="hero-engine-summary">
                <p>
                  {activeItem.summaryBefore}
                  <mark className="hero-engine-mark">{activeItem.highlight1}</mark>
                  {activeItem.summaryMid}
                  <mark className="hero-engine-mark">{activeItem.highlight2}</mark>
                  {activeItem.summaryAfter}
                </p>
              </div>

              <div className="hero-engine-section-label">WHAT YOU GET</div>

              <div className="hero-engine-signal-card">
                <div className="hero-engine-signal-info">
                  <b>{activeItem.signalTitle}</b>
                  <span>{activeItem.signalMeta}</span>
                </div>
                <div className="hero-engine-signal-right">
                  <span className="hero-engine-signal-bar" aria-hidden="true" />
                  <span className="hero-engine-signal-pill">
                    {activeItem.signalStatus}
                  </span>
                </div>
              </div>

              <div className="hero-engine-footer">
                <span className="hero-engine-footer-note">
                  Zero hiring &bull; Full CRM visibility
                </span>
                <a href="#contact" className="hero-engine-cta">
                  Book Strategy Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
