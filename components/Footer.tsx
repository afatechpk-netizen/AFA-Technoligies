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
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Phone:</span>
                <a href="tel:+923243001171" className="sf-value">+92 324 3001171</a>
              </div>
            </div>

            {/* Info email */}
            <div className="sf-contact-item">
              <span className="sf-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.25-8 5-8-5V6l8 5 8-5v2.25z" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Info:</span>
                <a href="mailto:info@afatechnologiesltd.com" className="sf-value">
                  info@afatechnologiesltd.com
                </a>
              </div>
            </div>

            {/* Sales email */}
            <div className="sf-contact-item">
              <span className="sf-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.25-8 5-8-5V6l8 5 8-5v2.25z" />
                </svg>
              </span>
              <div>
                <span className="sf-label">Sales:</span>
                <a href="mailto:sales@afatechnologiesltd.com" className="sf-value">
                  sales@afatechnologiesltd.com
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
