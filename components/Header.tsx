"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = ["client-impact", "solutions", "process", "why-afa", "about", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="#home" aria-label="AFA Technologies Home">
          <Image
            src="/images/logo.webp"
            alt="AFA Technologies Logo"
            width={68}
            height={68}
            className="logo-img"
            priority
          />
        </a>

        <button
          className="nav-toggle"
          aria-controls="nav"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isOpen ? "is-open" : ""}`} id="nav" aria-label="Primary">
          <a
            href="#client-impact"
            className={activeSection === "client-impact" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            Client impact
          </a>
          <a
            href="#solutions"
            className={activeSection === "solutions" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            Solutions
          </a>
          <a
            href="#process"
            className={activeSection === "process" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            How it works
          </a>
          <a
            href="#why-afa"
            className={activeSection === "why-afa" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            Why AFA Technologies
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#faq"
            className={activeSection === "faq" ? "is-active" : ""}
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
          <a
            className="btn btn--sm"
            href="#contact"
            onClick={() => setIsOpen(false)}
          >
            Book a Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
