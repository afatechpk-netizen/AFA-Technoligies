import React from "react";

export default function HeroPillars() {
  return (
    <section className="hero-pillars-section" aria-label="Core value pillars">
      <div className="wrap">
        <div className="hero-bottom-strip">
          <div className="hero-strip-item">
            <span className="hero-strip-icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 12 12 17 22 12" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
            </span>
            <div>
              <b>Dedicated Sales Pods</b>
              <span>Represent your brand in target markets</span>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="hero-strip-icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <div>
              <b>Direct Buyer Access</b>
              <span>Qualified enterprise meetings</span>
            </div>
          </div>

          <div className="hero-strip-item">
            <span className="hero-strip-icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <div>
              <b>Live in 14 Days</b>
              <span>Zero in-house hiring overhead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
