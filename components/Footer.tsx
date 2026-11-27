"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      {/* ── Main Grid ── */}
      <div className="sf-wrap">
        <div className="sf-grid">

          {/* Col 1 – Brand */}
          <div className="sf-col sf-col--brand">
            <a href="#home" aria-label="AFA Technologies Home" className="sf-logo-link">
              <Image
                src="/images/logo.png"
                alt="AFA Technologies"
                width={140}
                height={140}
                className="sf-logo"
                priority={false}
              />
            </a>
            <p className="sf-desc">
              AFA Technologies is a B2B sales partner for tech companies. We sell
              your products and services to enterprise buyers on your behalf.
            </p>
          </div>

          {/* Divider 1 */}
          <div className="sf-divider" aria-hidden="true" />

          {/* Col 2 – Quick Links */}
          <div className="sf-col">
            <h4 className="sf-heading">Quick Links</h4>
            <ul className="sf-nav">
              <li><a href="#client-impact">Client Impact</a></li>
              <li><a href="#solutions">Solutions &amp; Pods</a></li>
              <li><a href="#process">How It Works</a></li>
              <li><a href="#why-afa">Why AFA Technologies</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Divider 2 */}
          <div className="sf-divider" aria-hidden="true" />

          {/* Col 3 – Direct Connect + Follow Us */}
          <div className="sf-col">
            <h4 className="sf-heading">Direct Connect</h4>

            {/* Phone */}
            <div className="sf-contact-item">
              <span className="sf-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Phone</span>
                <a href="tel:+923243001171" className="sf-value">+92 324 3001171</a>
              </div>
            </div>

            {/* Info email */}
            <div className="sf-contact-item">
              <span className="sf-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Info</span>
                <a href="mailto:info@afatechnologiesltd.com" className="sf-value">
                  info@afatechnologiesltd.com
                </a>
              </div>
            </div>

            {/* Sales email */}
            <div className="sf-contact-item">
              <span className="sf-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Sales</span>
                <a href="mailto:sales@afatechnologiesltd.com" className="sf-value">
                  sales@afatechnologiesltd.com
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="sf-social-block">
              <span className="sf-label sf-social-label">Follow Us:</span>
              <div className="sf-social-row">
                {/* Facebook */}
                <a href="https://facebook.com" aria-label="Facebook"
                  target="_blank" rel="noopener noreferrer" className="sf-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" aria-label="Instagram"
                  target="_blank" rel="noopener noreferrer" className="sf-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" aria-label="LinkedIn"
                  target="_blank" rel="noopener noreferrer" className="sf-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Policy Bar ── */}
      <div className="sf-policy-bar">
        <div className="sf-wrap sf-policy-inner">
          <nav className="sf-policy-links" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="#">Cookie Policy</a>
            <span aria-hidden="true">|</span>
            <a href="#">Terms &amp; Conditions</a>
            <span aria-hidden="true">|</span>
            <a href="#">Consent Preferences</a>
          </nav>
          <p className="sf-copyright">
            &copy; <span>{year}</span> AFA Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
