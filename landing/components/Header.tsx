"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ComingSoonButton from "./ui/ComingSoonButton";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Developers", href: "#developers" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
              <path d="M2 8h14" stroke="white" strokeWidth="1.5" />
              <rect x="4" y="11" width="3" height="1.5" rx="0.5" fill="white" />
            </svg>
          </div>
          <span className={`text-sm font-semibold tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>
            Unibank <span className="font-light opacity-70">BaaS</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <ComingSoonButton
            label="Sandbox"
            className={scrolled ? "" : "border-white/20 text-white/50"}
          />
          <ComingSoonButton
            label="Daxil ol"
            className={scrolled ? "" : "border-white/20 text-white/50"}
          />
          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            Start integration
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden rounded-md p-2 transition-colors ${
            scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-gray-100">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              Start integration
            </a>
            <div className="flex gap-2">
              <ComingSoonButton label="Sandbox" className="flex-1 text-center justify-center" />
              <ComingSoonButton label="Daxil ol" className="flex-1 text-center justify-center" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
