import Image from "next/image";

const navGroups = [
  {
    title: "Platform",
    links: [
      { label: "Products", href: "#products" },
      { label: "Use cases", href: "#use-cases" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Developers", href: "#developers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
      { label: "API Docs", href: "#developers" },
      { label: "Sandbox", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <Image
                src="/upi-logo.svg"
                alt="UPI"
                width={56}
                height={22}
                className="brightness-0 invert"
              />
              <span className="text-xs font-medium text-gray-500 border-l border-gray-700 pl-3">
                BaaS
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed">
              Banking as a Service — card issuing, payments, transfers, lending, and BNPL, all through a single API.
            </p>
            <div className="mt-6">
              <p className="text-xs text-gray-600">Contact us</p>
              <a
                href="mailto:baas@unibank.az"
                className="mt-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                baas@unibank.az
              </a>
            </div>
            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["ISO 27001", "PCI DSS", "GDPR"].map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-gray-700 px-2.5 py-1 text-[11px] font-medium text-gray-600"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Unibank OJSC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-700">·</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <span className="text-gray-700">·</span>
            <span className="text-gray-700">Azerbaijan, Baku</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
