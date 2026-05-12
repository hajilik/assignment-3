"use client";

import { useState } from "react";

interface ComingSoonButtonProps {
  label: string;
  className?: string;
}

export default function ComingSoonButton({
  label,
  className = "",
}: ComingSoonButtonProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        disabled
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onFocus={() => setShowTip(true)}
        onBlur={() => setShowTip(false)}
        className={`relative cursor-not-allowed rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 opacity-60 transition-all ${className}`}
        aria-label={`${label} — Coming soon`}
      >
        {label}
      </button>
      {showTip && (
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          Coming soon
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}
