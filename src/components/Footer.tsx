/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Instagram, Mail, MapPin } from "lucide-react";
import { IMAGES } from "../data/defaultData";

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToAtelier = () => {
    setTab("home");
    setTimeout(() => {
      const el = document.getElementById("atelier-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer id="footer-section" className="bg-stone-950 text-stone-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left branding */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <img 
              src={IMAGES.logo_rechthoek} 
              alt="Hams bijtje Logo" 
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
            />
            <h3 className="font-serif text-gold-500 text-xl tracking-wider lowercase first-letter:uppercase font-semibold">
              Hams bijtje
            </h3>
          </div>
          {/* Description removed as requested */}
        </div>

        {/* Center links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-mono font-bold">
            Navigatie
          </h4>
          <ul className="space-y-2 text-xs font-mono font-medium">
            <li>
              <button
                id="footer-nav-home"
                onClick={() => setTab("home")}
                className="hover:text-gold-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                id="footer-nav-atelier"
                onClick={handleScrollToAtelier}
                className="hover:text-gold-500 transition-colors text-left"
              >
                Onze imkerij
              </button>
            </li>
            <li>
              <button
                id="footer-nav-journal"
                onClick={() => setTab("journal")}
                className="hover:text-gold-500 transition-colors"
              >
                Imkerij Logboek
              </button>
            </li>
            <li>
              <button
                id="footer-nav-vault"
                onClick={() => setTab("vault")}
                className="hover:text-gold-500 transition-colors"
              >
                Honingaanbod
              </button>
            </li>
          </ul>
        </div>

        {/* Right socials & address */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-mono font-bold">
            Contact
          </h4>
          <div className="flex flex-wrap gap-3">
            <a
              id="social-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-gold-100 transition-colors hover:bg-stone-800"
            >
              <Instagram size={14} />
              Instagram
            </a>
            <a
              id="social-mail"
              href="mailto:hamsbijtje@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-gold-100 transition-colors hover:bg-stone-800"
            >
              <Mail size={14} />
              E-mail
            </a>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-stone-400">
            <MapPin size={14} className="text-gold-500" />
            <span>📍 Tessenderlo-Ham, 3945, Limburg</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-stone-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-stone-600 gap-4">
        <p>© {currentYear} Hams bijtje.</p>
      </div>
    </footer>
  );
}
