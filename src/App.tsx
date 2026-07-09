/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Hive,
  HiveInspection,
  HarvestRecord,
  JournalPost,
  HoneyProduct,
  CartItem,
} from "./types";
import {
  DEFAULT_HIVES,
  DEFAULT_INSPECTIONS,
  DEFAULT_HARVESTS,
  DEFAULT_JOURNAL,
  DEFAULT_PRODUCTS,
} from "./data/defaultData";

// Components
import Hero from "./components/Hero";
import Journal from "./components/Journal";
import HarvestVault from "./components/HarvestVault";
import AtelierStory from "./components/AtelierStory";
import Footer from "./components/Footer";

export default function App() {
  const [tab, setTab] = useState<string>("home");

  // Load state from localStorage or fallback to defaults
  const [hives, setHives] = useState<Hive[]>(() => {
    const saved = localStorage.getItem("apis_hives");
    return saved ? JSON.parse(saved) : DEFAULT_HIVES;
  });

  const [inspections, setInspections] = useState<HiveInspection[]>(() => {
    const saved = localStorage.getItem("apis_inspections");
    return saved ? JSON.parse(saved) : DEFAULT_INSPECTIONS;
  });

  const [harvests, setHarvests] = useState<HarvestRecord[]>(() => {
    const saved = localStorage.getItem("apis_harvests");
    return saved ? JSON.parse(saved) : DEFAULT_HARVESTS;
  });

  const [journalPosts, setJournalPosts] = useState<JournalPost[]>(() => {
    const saved = localStorage.getItem("apis_journal");
    return saved ? JSON.parse(saved) : DEFAULT_JOURNAL;
  });

  const [products] = useState<HoneyProduct[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("apis_hives", JSON.stringify(hives));
  }, [hives]);

  useEffect(() => {
    localStorage.setItem("apis_inspections", JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem("apis_harvests", JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    localStorage.setItem("apis_journal", JSON.stringify(journalPosts));
  }, [journalPosts]);

  // Cart operations
  const handleAddToCart = (product: HoneyProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // State addition operations
  const handleAddPost = (newPost: Omit<JournalPost, "id">) => {
    const created: JournalPost = {
      ...newPost,
      id: `post-${Date.now()}`,
    };
    setJournalPosts((prev) => [created, ...prev]);
  };

  const handleAddHive = (newHive: Omit<Hive, "id">) => {
    const created: Hive = {
      ...newHive,
      id: `hive-${Date.now()}`,
    };
    setHives((prev) => [...prev, created]);
  };

  const handleAddInspection = (newInsp: Omit<HiveInspection, "id">) => {
    const created: HiveInspection = {
      ...newInsp,
      id: `insp-${Date.now()}`,
    };
    setInspections((prev) => [created, ...prev]);
  };

  const handleAddHarvest = (newHarvest: Omit<HarvestRecord, "id">) => {
    const created: HarvestRecord = {
      ...newHarvest,
      id: `harv-${Date.now()}`,
    };
    setHarvests((prev) => [created, ...prev]);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div id="apis-atelier-root" className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-gold-200 selection:text-gold-900">
      
      {/* Absolute Minimal Top bar for Navigation to home when deep on tabs */}
      {tab !== "home" && (
        <header id="header-bar" className="fixed top-0 left-0 right-0 z-40 bg-[#FCF9F1]/80 backdrop-blur-md border-b border-black/5 py-3 px-6 flex justify-between items-center transition-all duration-300">
          <button
            id="logo-brand-btn"
            onClick={() => setTab("home")}
            className="flex items-center gap-2.5 text-stone-900"
          >
            <img 
              src="input_file_0.png" 
              alt="Hams bijtje Logo" 
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-amber-500/30 shadow-sm"
            />
            <span className="font-serif italic font-semibold text-base lowercase first-letter:uppercase tracking-tight text-stone-900">
              Hams bijtje
            </span>
          </button>
          <button
            id="header-nav-btn"
            onClick={() => setTab("home")}
            className="text-stone-500 hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-mono transition-colors"
          >
            ← Terug naar Home
          </button>
        </header>
      )}

      {/* Main Orchestrator */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Home is the master editorial catalog */}
              <Hero
                currentTab={tab}
                setTab={setTab}
                posts={journalPosts}
                hives={hives}
                harvests={harvests}
                products={products}
                onAddToCart={handleAddToCart}
              />
              <AtelierStory />
              <Journal
                posts={journalPosts}
                onAddPost={handleAddPost}
                isEmbed={true}
                onViewAll={() => setTab("journal")}
              />
              <HarvestVault
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateCartQty={handleUpdateCartQty}
                onClearCart={handleClearCart}
                isEmbed={true}
                onViewAll={() => setTab("vault")}
              />
            </motion.div>
          )}

          {tab === "journal" && (
            <motion.div
              key="journal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <Journal posts={journalPosts} onAddPost={handleAddPost} />
            </motion.div>
          )}

          {tab === "vault" && (
            <motion.div
              key="vault"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <HarvestVault
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateCartQty={handleUpdateCartQty}
                onClearCart={handleClearCart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setTab={setTab} />

      {/* Floating Capsule Nav Pinned at Bottom of deep pages */}
      {tab !== "home" && (
        <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-stone-900/90 hover:bg-stone-900/95 backdrop-blur-lg border border-stone-800 px-2 py-2 rounded-full shadow-2xl flex items-center gap-1 pointer-events-auto"
          >
            {[
              { id: "home", label: "Home" },
              { id: "atelier", label: "Onze imkerij" },
              { id: "journal", label: "Logboek" },
              { id: "vault", label: "Honingaanbod" },
            ].map((item) => (
              <button
                id={`floating-nav-pill-${item.id}`}
                key={item.id}
                onClick={() => {
                  if (item.id === "atelier") {
                    setTab("home");
                    setTimeout(() => {
                      const el = document.getElementById("atelier-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    setTab(item.id);
                  }
                }}
                className={`px-4 py-2 rounded-full text-[11px] font-medium tracking-wide transition-all ${
                  tab === item.id
                    ? "bg-gold-500 text-stone-950 font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
