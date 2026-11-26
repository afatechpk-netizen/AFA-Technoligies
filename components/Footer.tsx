"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer footer--afa-theme">
      <div className="wrap">
        <div className="footer-main-grid">
          {/* Column 1: Brand & Strategic Positioning */}
          <div className="footer-col-brand">
            <a className="footer-brand-logo" href="#home" aria-label="AFA Technologies">
              <Image
                src="/images/logo.png"
                alt="AFA Technologies"
                width={110}
                height={110}
                className="footer-logo-img"
              />
            </a>
            <p className="footer-brand-desc">
              AFA Technologies accelerates enterprise software &amp; B2B pipeline. We connect high-growth products with qualified enterprise buyers without the overhead of in-house sales hiring.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">Useful Links</h4>
            <ul className="footer-nav-list">
              <li><a href="#client-impact">Client Impact</a></li>
              <li><a href="#solutions">Solutions &amp; Pods</a></li>
              <li><a href="#process">How It Works</a></li>
              <li><a href="#why-afa">Why AFA Technologies</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Direct Connect */}
          <div className="footer-col-connect">
            <h4 className="footer-col-title">Direct Connect</h4>
            <div className="footer-contact-details">
              <p className="footer-contact-line">
                <svg
                  className="footer-contact-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00bdf2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="footer-contact-label">Phone:</span>{" "}
                <a href="tel:+923436622666" className="footer-contact-val">
                  +92 343 6622666
                </a>
              </p>
              <p className="footer-contact-line">
                <svg
                  className="footer-contact-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00bdf2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="footer-contact-label">Email:</span>{" "}
                <a
                  href="mailto:hello@afatechnologiesltd.com"
                  className="footer-contact-val"
                >
                  hello@afatechnologiesltd.com
                </a>
              </p>
              <p className="footer-contact-line">
                <svg
                  className="footer-contact-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00bdf2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="footer-contact-label">Info:</span>{" "}
                <a
                  href="mailto:info@afatechnologiesltd.com"
                  className="footer-contact-val"
                >
                  info@afatechnologiesltd.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Links Bar */}
        <div className="footer-accelero-bottom">
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Cookie Policy</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Terms and Conditions</a>
            <span className="footer-legal-divider">|</span>
            <a href="#">Consent Preferences</a>
          </div>
          <div className="footer-copy-text">
            &copy; <span>{year}</span> AFA Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
