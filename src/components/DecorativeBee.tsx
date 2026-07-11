import React from "react";

interface DecorativeBeeProps {
  className?: string;
  flip?: boolean;
}

export default function DecorativeBee({ className = "", flip = false }: DecorativeBeeProps) {
  return (
    <div
      className={"pointer-events-none select-none " + className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bee body */}
        <ellipse cx="44" cy="48" rx="26" ry="18" fill="#FFC130" stroke="#333" strokeWidth="2" />
        <path d="M22 42h44" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <path d="M22 54h44" stroke="#333" strokeWidth="6" strokeLinecap="round" />

        {/* Head */}
        <circle cx="16" cy="42" r="10" fill="#FFC130" stroke="#333" strokeWidth="2" />
        <circle cx="13" cy="40" r="2" fill="#111" />

        {/* Wing */}
        <ellipse cx="60" cy="25" rx="18" ry="12" fill="#FFF" fillOpacity="0.9" stroke="#CFCFCF" />

        {/* Trail (dashed) */}
        <path d="M70 30 C 110 20, 140 50, 180 45" stroke="#333" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" fill="none" />
        <path d="M150 55 C 170 80, 120 100, 80 85" stroke="#333" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
