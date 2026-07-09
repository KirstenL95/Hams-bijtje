/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JournalPost, Hive, HarvestRecord, HoneyProduct } from "../types";
import { Compass, Thermometer, Calendar, X, Star, ArrowRight } from "lucide-react";

interface HeroProps {
  currentTab: string;
  setTab: (tab: string) => void;
  posts: JournalPost[];
  hives: Hive[];
  harvests: HarvestRecord[];
  products: HoneyProduct[];
  onAddToCart: (product: HoneyProduct) => void;
}

export default function Hero({
  currentTab,
  setTab,
  posts,
  hives,
  harvests,
  products,
  onAddToCart,
}: HeroProps) {
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);

  // Derive dynamic stats from our states to feed the dashboard
  const latestPost = posts[0] || null;
  const activeHive = hives.find((h) => h.status === "Active") || hives[0] || null;
  const latestHarvest = harvests[0] || null;

  // Calculate total harvested weight dynamically
  const totalLbs = harvests.reduce((sum, item) => sum + item.amountLbs, 0);

  // Dynamic growth percentage mock or custom calculation based on seasons
  const growthRate = harvests.length > 2 ? "14.2" : "8.5";

  const handleScrollToAtelier = () => {
    const el = document.getElementById("atelier-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div id="hero-section" className="bg-[#FCF9F1] text-[#1A1A1A] p-4 md:p-8 font-sans overflow-hidden space-y-12">
      {/* FULL VIEWPORT EDITORIAL HERO BANNER MATCHING USER SCREENSHOT */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[85vh] min-h-[550px] md:min-h-[700px] rounded-[40px] overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-16 lg:p-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/images/macro_honeybee_1783634117381.jpg')",
        }}
      >
        {/* Warm golden-dark overlay for beautiful contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        {/* Top Left Branding */}
        <div className="relative z-10" />

        {/* Bottom Left: Title, Description and CTAs */}
        <div className="relative z-10 max-w-2xl mt-auto space-y-6 text-left">
          <div className="space-y-4">
            <h1 className="font-serif italic font-light text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05]">
              Hams bijtje
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="hero-explore-btn"
              onClick={() => setTab("journal")}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-900 font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]"
            >
              Lees het logboek <ArrowRight size={14} />
            </button>
            <button
              id="hero-journal-btn"
              onClick={() => setTab("vault")}
              className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs uppercase tracking-widest rounded-full backdrop-blur-md transition-all flex items-center justify-center border border-white/10"
            >
              Ontdek het Honingaanbod
            </button>
          </div>
        </div>

        {/* Bottom Right: Navigation Pill Container */}
        <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-20">
          <div className="bg-stone-950/40 backdrop-blur-xl border border-white/10 p-1 px-1.5 rounded-full flex items-center gap-0.5 shadow-2xl">
            <button
              id="pill-nav-home"
              onClick={() => setTab("home")}
              className={`px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all ${
                currentTab === "home"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              id="pill-nav-atelier"
              onClick={handleScrollToAtelier}
              className="px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all text-stone-300 hover:text-white"
            >
              Onze imkerij
            </button>
            <button
              id="pill-nav-journal"
              onClick={() => setTab("journal")}
              className={`px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all ${
                currentTab === "journal"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Logboek
            </button>
            <button
              id="pill-nav-harvest"
              onClick={() => setTab("vault")}
              className={`px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all ${
                currentTab === "vault"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Honingaanbod
            </button>
          </div>
        </div>
      </motion.div>

      {/* BRAND & INTRO SECTION (Spacious and elegant centered layout with the large rectangular logo as the clear centerpiece) */}
      <section className="max-w-4xl mx-auto pt-8 pb-12 px-4 border-b border-stone-200/40 flex flex-col items-center justify-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 flex items-center justify-center w-full max-w-4xl"
        >
          <div className="w-full max-w-lg md:max-w-3xl bg-white rounded-[24px] border border-stone-200/60 shadow-xl overflow-hidden p-4 md:p-6 flex items-center justify-center hover:scale-[1.01] transition-transform duration-300">
            <img 
              src="input_file_0.png" 
              alt="Hams bijtje Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[420px] object-contain rounded-lg"
            />
          </div>
        </motion.div>

        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] md:text-xs tracking-[0.4em] font-mono font-bold text-amber-600 uppercase">
            Onze trots & Identiteit
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight font-light">
            Imkerij <span className="italic font-normal text-amber-600">Hams bijtje</span>
          </h2>
          <p className="font-serif italic text-lg md:text-2xl lg:text-3xl text-stone-800 leading-[1.5] font-light tracking-tight max-w-2xl mx-auto">
            “Gedreven door liefde voor de natuur en respect voor het leven van de bij, werken wij elke dag aan het behoud van gezonde bijenvolken en biodiversiteit.”
          </p>
        </div>
      </section>

      {/* Embedded Reading Modal for Latest Dispatch so everything works standalone */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-[#1A1A1A]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white max-w-3xl w-full rounded-[40px] overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <div className="relative h-[250px] md:h-[350px] flex-shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                  id="btn-close-hero-modal"
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-amber-500 text-black font-mono text-[9px] tracking-widest font-semibold uppercase rounded-full shadow-sm mb-3 inline-block">
                    {selectedPost.tag}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              <div className="overflow-y-auto p-6 md:p-10 flex-1 bg-[#FCF9F1]/30">
                <div className="flex flex-wrap gap-y-3 justify-between items-center border-b border-stone-200/50 pb-6 mb-8 text-xs font-mono text-stone-500">
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-amber-600" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer size={13} className="text-amber-600" />
                      {selectedPost.temp}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-[#F4EEDF] text-[#1A1A1A] rounded-full text-[10px]">
                    🌾 {selectedPost.nectarSource}
                  </span>
                </div>

                <div className="prose prose-stone font-sans text-stone-800 leading-relaxed space-y-6 text-sm md:text-base font-light">
                  {selectedPost.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-stone-100 bg-white flex justify-end">
                <button
                  id="btn-close-hero-footer"
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] rounded-full font-medium text-xs tracking-wider uppercase transition-colors font-mono"
                >
                  Sluit Bericht
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
