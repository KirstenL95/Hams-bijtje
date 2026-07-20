/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HoneyProduct, CartItem } from "../types";
import { ShoppingCart, ShoppingBag, X, Plus, Minus, Send, CheckCircle2, Star, Sparkles, PenTool } from "lucide-react";
import DecorativeBee from "./DecorativeBee";
import { isOwnerHost } from "../utils/owner";
import { IMAGES } from "../data/defaultData";

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

interface HarvestVaultProps {
  products: HoneyProduct[];
  cart: CartItem[];
  onAddToCart: (product: HoneyProduct) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  isEmbed?: boolean;
  onViewAll?: () => void;
  collectionTitle?: string;
  collectionDescription?: string;
  collectionBadge?: string;
  onUpdateCollectionSettings?: (updates: { title?: string; description?: string; badge?: string }) => void;
  onUpdateProduct?: (productId: string, updates: Partial<HoneyProduct>) => void;
  onAddProduct?: (newProduct: Omit<HoneyProduct, "id">) => void;
}

export default function HarvestVault({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onClearCart,
  isEmbed = false,
  onViewAll,
  collectionTitle = "Producten",
  collectionDescription = "Eerste honingoogst zal plaatsvinden in 2027. Voor een potje honing kan je altijd even passeren langs de imkerij of een mailtje sturen voor meer info.",
  collectionBadge = "Coming Soon 2027",
  onUpdateCollectionSettings,
  onUpdateProduct,
}: HarvestVaultProps) {
  const [selectedProduct, setSelectedProduct] = useState<HoneyProduct | null>(null);

  const displayProducts = isEmbed ? products.slice(0, 4) : products;

  return (
    <section id="harvest-vault-section" className="py-24 bg-white px-6 relative">
      {/* Decorative bees for Honingaanbod */}
      <div className="absolute left-4 top-6 hidden md:block">
        <DecorativeBee className="w-[120px] opacity-90 bee-float bee-delay-1" />
      </div>
      <div className="absolute right-4 bottom-6 hidden md:block">
        <DecorativeBee flip className="w-[180px] opacity-85 bee-float bee-delay-2" />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-200/60 pb-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-mono mb-3">
              De Collectie
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-800 tracking-tight leading-none">
              Producten
            </h2>
            <p className="mt-4 text-stone-500 font-sans text-[14px] font-light max-w-xl leading-relaxed">
              Eerste honingoogst zal plaatsvinden in 2027. Voor een potje honing kan je altijd even passeren langs de imkerij of een mailtje sturen voor meer info.
            </p>
          </div>
        </div>

        {/* Products Grid (matches Image 3 style!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-12 justify-center">
          {displayProducts.map((prod) => (
            <div
              id={`product-card-${prod.id}`}
              key={prod.id}
              className="group flex flex-col justify-between h-full bg-transparent text-center"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-full overflow-hidden mb-6 bg-stone-100 shadow-sm border border-stone-200/40">
                  <img
                    src={IMAGES[prod.image]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-stone-800 leading-tight mb-2">
                  {prod.name || (prod.id === "prod-1" ? "Lentehoning" : "")}
                </h3>
              </div>

              {/* Action Button replaced with Coming Soon */}
              <div className="flex items-center justify-center mt-3 pt-4 border-t border-stone-200/40">
                <span className="text-sm md:text-base tracking-[0.3em] font-mono text-amber-600 font-bold uppercase">
                  {prod.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-end md:items-stretch md:justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative bg-white w-full md:max-w-md h-[85vh] md:h-screen shadow-2xl z-10 flex flex-col justify-between"
            >
              {/* Product Close & Image */}
              <div className="relative h-[250px] md:h-[320px] bg-stone-100 flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/25" />

                <button
                  id="btn-close-product-drawer"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-2 bg-stone-900/50 hover:bg-stone-900/80 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] tracking-widest font-mono text-gold-300 uppercase mb-1">
                    {selectedProduct.size} • Handmatig Geoogst
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable description & details */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
                <div>
                  <p className="italic text-stone-500 font-serif text-sm mb-4">
                    "{selectedProduct.subtitle}"
                  </p>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Tasting Notes */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/40">
                  <h4 className="text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2 flex items-center gap-1.5">
                    <Star size={11} className="text-gold-500" />
                    Smaaknotities
                  </h4>
                  <p className="text-stone-700 text-xs font-medium leading-relaxed italic">
                    {selectedProduct.notes}
                  </p>
                </div>

                {/* Composition */}
                <div className="space-y-3">
                  <h4 className="text-[10px] tracking-widest font-mono text-stone-400 uppercase">
                    Florale Samenstelling
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.nectarSources.map((source, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-stone-100 text-stone-600 text-[10px] font-mono rounded-full border border-stone-200/40"
                      >
                        🌾 {source}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex justify-between items-center py-4 border-t border-b border-stone-100">
                  <div>
                    <p className="text-[9px] tracking-widest font-mono text-stone-400 uppercase">
                      Status
                    </p>
                    <p className="text-xs text-stone-600 font-medium mt-1">
                      Koud-geslingerd & Onbewerkt
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] tracking-widest font-mono text-stone-400 uppercase">
                      Samenstelling
                    </p>
                    <p className="text-xs text-stone-600 font-medium mt-1">
                      100% Natuurlijke Honing
                    </p>
                  </div>
                </div>
              </div>

              {/* Close button in footer */}
              <div className="p-6 border-t border-stone-100 bg-white">
                <button
                  id="btn-close-product-drawer-bottom"
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded-full shadow-md transition-colors"
                >
                  Sluit Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
