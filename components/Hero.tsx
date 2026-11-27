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
    id: "fintech",
    title: "Global FinTech Bank",
    meta: "CISO • today 09:12",
    status: "3 buyers mapped",
    statusTone: "blue",
    floatTitle: "Enterprise Account Matched",
    floatSub: "CISO brief • ready for executive call",
    summaryBefore: "Dedicated AFA outbound pod engaged ",
    highlight1: "CISO & VP SecOps",
    summaryMid: " with technical security briefs. Decision-makers verified for ",
    highlight2: "$180K ACV",
    summaryAfter: " enterprise deployment.",
    signalTitle: "Executive Discovery Call",
    signalMeta: "NA Enterprise Pod • 14-Day Launch",
    signalStatus: "Verified",
  },
  {
    id: "cloudscale",
    title: "CloudScale Infra",
    meta: "VP Cyber • today 08:47",
    status: "Demo booked",
    statusTone: "blue",
    floatTitle: "High-Intent Demo Scheduled",
    floatSub: "VP Infrastructure • calendar confirmed",
    summaryBefore: "Multi-touch LinkedIn and executive email sequence converted ",
    highlight1: "VP Global Defense",
    summaryMid: " into a technical POV evaluation worth ",
    highlight2: "$120K ACV",
    summaryAfter: " in Q2 pipeline.",
    signalTitle: "Technical POV Session",
    signalMeta: "EMEA Security Pod • Direct Access",
    signalStatus: "Confirmed",
  },
  {
    id: "apex-ai",
    title: "Apex AI Enterprise",
    meta: "CTO • yesterday",
    status: "Qualified",
    statusTone: "green",
    floatTitle: "Pilot Scope Approved",
    floatSub: "CTO & Ops • proposal delivered",
    summaryBefore: "ICP segmentation across UK & Middle East connected ",
    highlight1: "Chief Technology Officer",
    summaryMid: " with your solution architects for a ",
    highlight2: "$210K ACV",
    summaryAfter: " enterprise rollout.",
    signalTitle: "Commercial Proposal Sent",
    signalMeta: "Multi-Region Pod • CRM Synced",
    signalStatus: "Accepted",
  },
  {
    id: "keystone",
    title: "Keystone Advisory",
    meta: "Managing Partner • yesterday",
    status: "Qualified",
    statusTone: "green",
    floatTitle: "New Vertical Penetrated",
    floatSub: "Managing Partner • mandate active",
    summaryBefore: "Executive outreach opened 4 new enterprise verticals, booking ",
    highlight1: "C-Suite Advisory Briefs",
    summaryMid: " while freeing partners to close ",
    highlight2: "$160K+ ACV",
    summaryAfter: " retainers.",
    signalTitle: "Partner Mandate Review",
    signalMeta: "Advisory Growth Pod • Live",
    signalStatus: "Accepted",
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

        {/* Right Side: Interactive Split-Panel GTM Workspace Showcase */}
        <div
          className="hero-engine-stage hero-slide-in-right"
          aria-label="AFA Commercial Engine Interactive Preview"
        >
          {/* Floating Dark Notification Badge */}
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
            {/* Left Sidebar: Pipeline List */}
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
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span>Pipeline</span>
              </div>

              <div className="hero-engine-list" role="tablist" aria-label="Sample enterprise accounts">
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
                <span className="hero-engine-badge">Live Pod View</span>
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

              <div className="hero-engine-section-label">QUALIFIED BUYER SIGNALS</div>

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
                  Full CRM sync &amp; executive visibility
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
