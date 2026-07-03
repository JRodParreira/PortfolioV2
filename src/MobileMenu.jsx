import React from "react";
import { useTranslation } from "./lan/useTranslation";

const asset = (name) => `/assets/${name}`;

export default function MobileMenu({
  menuOpen,
  closeMenu,
  language,
  toggleLanguage,
  menuClosing,
  onAnimationEnd,
}) {
  const t = useTranslation();

  if (!menuOpen && !menuClosing) return null;

  return (
    <div
      className="mobile-menu-backdrop"
      onClick={closeMenu}
    >
      <div
        id="mobile-menu"
        className={`mobile-menu ${
          menuClosing ? "closing" : "open"
        }`}
        onAnimationEnd={onAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="mobile-menu-close"
          type="button"
          onClick={closeMenu}
        >
          {t.nav.closeMenu}
        </button>

        <img
          className="mobile-menu-logo"
          src={asset("Logo.svg")}
          alt=""
        />

        <nav className="mobile-menu-nav">
          <a href="#about" onClick={closeMenu}>
            {t.nav.about}
          </a>

          <a href="#projects" onClick={closeMenu}>
            {t.nav.projects}
          </a>

          <a href="#services" onClick={closeMenu}>
            {t.nav.services}
          </a>

          <a href="#process" onClick={closeMenu}>
            {t.nav.process}
          </a>
        </nav>

        <button
          className="mobile-language"
          type="button"
          onClick={toggleLanguage}
        >
          {language.toUpperCase()}
        </button>

        <a
          className="mobile-talk-button"
          href="mailto:hello@joseparreira.com"
        >
          <span>{t.nav.letsTalk}</span>
          <span className="mobile-talk-icon">↗</span>
        </a>
      </div>
    </div>
  );
}