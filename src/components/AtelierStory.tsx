/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data/defaultData";
import { Plus, X } from "lucide-react";

export default function AtelierStory() {
  const [isOpen, setIsOpen] = useState(false);
  const [extraImage, setExtraImage] = useState<string | null>(null);
  const extraImageOptions = [IMAGES.journalMain, IMAGES.productsCover, IMAGES.hero];
  const isOwnerView =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const handleAddExtraImage = () => {
    setExtraImage((current) => {
      const currentIndex = current ? extraImageOptions.indexOf(current) : -1;
      return extraImageOptions[(currentIndex + 1) % extraImageOptions.length];
    });
  };

  return (
    <section id="atelier-section" className="py-24 bg-white px-6 border-t border-b border-stone-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left image with styled border corners exactly like Image 4 */}
        <div className="col-span-12 lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone-200/50"
          >
            <img
              src={IMAGES.beehivesField}
              alt="Hams bijtje Bijenkasten"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {isOwnerView && (
            <div className="mt-4 flex items-center gap-3">
              <button
                id="btn-add-extra-imkerij-image"
                onClick={handleAddExtraImage}
                className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-700 transition-colors hover:bg-stone-100"
              >
                <Plus size={14} />
                {extraImage ? "Wijzig extra foto" : "Voeg extra foto toe"}
              </button>
            </div>
          )}

          {extraImage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone-200/50"
            >
              <img
                src={extraImage}
                alt="Extra foto van Onze Imkerij"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>

        {/* Right text details */}
        <div className="col-span-12 lg:col-span-6 space-y-6 lg:pl-6">
          <p className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-mono">
            Onze Imkerij
          </p>

          <h2 className="font-serif text-2xl md:text-3.5xl text-stone-800 tracking-tight leading-relaxed font-light">
            Onze imkerij gelegen in Oostham. <br />
            <span className="italic font-normal text-amber-600">Voorlopig 2 kasten</span> gelegen in het groen tussen bloemenvelden en weide.
          </h2>

          <div className="pt-4">
            <button
              id="btn-discover-story"
              onClick={() => setIsOpen(true)}
              className="text-stone-800 hover:text-gold-600 font-mono text-xs tracking-widest uppercase font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              Ontdek Ons Verhaal <span className="text-sm font-sans font-bold">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Story Detailed Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-10 space-y-8"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-stone-100 pb-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-gold-600 uppercase font-mono font-semibold">
                    Onze Wortels & Filosofie
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mt-2">
                    Het Verhaal van Hams bijtje
                  </h3>
                </div>
                <button
                  id="btn-close-story-modal"
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Story prose */}
              <div className="space-y-4 text-stone-600 text-sm font-light leading-relaxed font-sans">
                <p>
                  Hams bijtje is een kleinschalige en uiterst gepassioneerde hobby-imkerij gevestigd in Oostham. Met onze twee zorgvuldig beheerde bijenkasten, gelegen in een idyllische omgeving in het groen tussen de wilde bloemenvelden en weides, richten we ons op een pure en respectvolle omgang met de bijen.
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  id="btn-close-story-footer"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-gold-100 rounded-full font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Terug naar de Imkerij
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
