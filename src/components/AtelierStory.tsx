/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data/defaultData";
import { X, Heart, Wind, Compass } from "lucide-react";

export default function AtelierStory() {
  const [isOpen, setIsOpen] = useState(false);

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
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
            style={{ borderBottomRightRadius: "80px" }} // Elegant asymmetrical cut
          >
            <img
              src={IMAGES.beehivesField}
              alt="Hams bijtje Bijenkasten"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right text details */}
        <div className="col-span-12 lg:col-span-6 space-y-6 lg:pl-6">
          <p className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-mono">
            Onze Imkerij
          </p>

          <h2 className="font-serif text-3xl md:text-5xl text-stone-800 tracking-tight leading-tight">
            Het Erfgoed van de Kolonie, <br />
            <span className="italic font-normal">Gebotteld</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-stone-500 leading-relaxed font-light">
            Gelegen tussen wilde bloemenvelden en oude bossen in Ham, verzorgt onze imkerij
            twaalf bijenkolonies. We oogsten met de hand, slingeren in kleine
            batches en verhitten onze honing nooit boven de kasttemperatuur.
          </p>

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

              {/* Story Grid info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col items-center space-y-2">
                  <Heart className="text-gold-500" size={18} />
                  <span className="font-semibold text-stone-800">Ethisch Beheer</span>
                  <span className="text-stone-500 font-light leading-relaxed">
                    We voeren nooit suikersiroop en oogsten nooit meer dan het overschot van de kolonie.
                  </span>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col items-center space-y-2">
                  <Wind className="text-gold-500" size={18} />
                  <span className="font-semibold text-stone-800">Pure Koude Extractie</span>
                  <span className="text-stone-500 font-light leading-relaxed">
                    Koud geslingerd en grof gezeefd om de wilde stuifmeelkorrels te behouden.
                  </span>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col items-center space-y-2">
                  <Compass className="text-gold-500" size={18} />
                  <span className="font-semibold text-stone-800">Eén Enkele Imkerij</span>
                  <span className="text-stone-500 font-light leading-relaxed">
                    Elke druppel is uitsluitend afkomstig van onze eigen biologische imkerij in Ham.
                  </span>
                </div>
              </div>

              {/* Story prose */}
              <div className="space-y-4 text-stone-600 text-sm font-light leading-relaxed font-sans">
                <p>
                  Opgericht in 2019, begon Hams bijtje als een passievol herstelproject van natuurgebieden in Ham. Wat begon met twee bijenkasten is inmiddels uitgegroeid tot een bloeiende biologisch-dynamische imkerij van twaalf kolonies, harmonieus samenlevend met boomgaarden, wilde bloemenweiden en oude bossen.
                </p>
                <p>
                  In tegenstelling tot industriële imkerijen die bijen louter als mobiele productie-eenheden behandelen, werken wij vanuit een diep gewortelde filosofie van wederzijds respect. We verplaatsen onze bijenkasten niet onnodig, knippen de vleugels van onze koninginnen niet en vermijden synthetische chemische behandelingen in de broedkamers.
                </p>
                <p>
                  Onze honing is het vloeibare, gouden archief van dit unieke stuk land. We oogsten uitsluitend wat de bijen werkelijk kunnen missen, zodat ze in de winter volledig zelfvoorzienend blijven met hun eigen natuurlijke honing. Hartelijk dank voor uw steun aan duurzaam imkeren en ambachtelijke apicultuur.
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
