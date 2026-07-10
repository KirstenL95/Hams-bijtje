/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HoneyProduct, CartItem } from "../types";
import { ShoppingCart, ShoppingBag, X, Plus, Minus, Send, CheckCircle2, Star, Sparkles } from "lucide-react";

interface HarvestVaultProps {
  products: HoneyProduct[];
  cart: CartItem[];
  onAddToCart: (product: HoneyProduct) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  isEmbed?: boolean;
  onViewAll?: () => void;
}

export default function HarvestVault({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onClearCart,
  isEmbed = false,
  onViewAll,
}: HarvestVaultProps) {
  const [selectedProduct, setSelectedProduct] = useState<HoneyProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form states for Pre-Order / Inquiry
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;

    // Simulate submission
    setOrderSubmitted(true);
    setTimeout(() => {
      // Clear cart and close modal after 4 seconds
      onClearCart();
      setIsCheckoutOpen(false);
      setOrderSubmitted(false);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerNote("");
    }, 4500);
  };

  const displayProducts = isEmbed ? products.slice(0, 3) : products;

  return (
    <section id="harvest-vault-section" className="py-24 bg-stone-50 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-200/60 pb-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-mono mb-3">
              De Collectie
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-800 tracking-tight leading-none">
              Ons Honingaanbod
            </h2>
            <p className="mt-4 text-stone-500 font-sans text-sm font-light max-w-xl leading-relaxed">
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
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-stone-800 leading-tight mb-2">
                  {prod.name}
                </h3>
              </div>

              {/* Action Button replaced with Coming Soon */}
              <div className="flex items-center justify-center mt-3 pt-4 border-t border-stone-200/40">
                <span className="text-[10px] tracking-[0.25em] font-mono text-amber-600 font-bold uppercase">
                  Coming Soon 2027
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

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            {/* Cart sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative bg-white w-full md:max-w-md h-screen shadow-2xl z-10 flex flex-col justify-between"
            >
              <div className="p-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-gold-600" size={18} />
                  <h3 className="font-serif text-lg text-stone-800 font-semibold">
                    Reserveermand ({cartItemCount})
                  </h3>
                </div>
                <button
                  id="btn-close-cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="p-5 bg-stone-50 rounded-full text-stone-300">
                      <ShoppingBag size={48} />
                    </div>
                    <p className="font-serif text-lg text-stone-700">
                      Je reserveermand is momenteel leeg.
                    </p>
                    <p className="text-stone-400 text-xs max-w-xs leading-relaxed">
                      Selecteer een pot van onze rauwe, pure honing uit de kluis om een reservering te starten.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      id={`cart-item-${item.product.id}`}
                      key={item.product.id}
                      className="flex items-center gap-4 pb-6 border-b border-stone-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover rounded-xl bg-stone-50 border border-stone-200/40"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-serif text-sm text-stone-800 font-semibold leading-tight">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] font-mono text-stone-400">
                          {item.product.size} • €{item.product.price} per stuk
                        </p>

                        {/* Qty changer */}
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            id={`btn-dec-qty-${item.product.id}`}
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                            className="p-1 bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-mono text-xs text-stone-800 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            id={`btn-inc-qty-${item.product.id}`}
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                            className="p-1 bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-mono text-xs font-bold text-stone-800">
                          €{item.product.price * item.quantity},00
                        </p>
                        <button
                          id={`btn-remove-item-${item.product.id}`}
                          onClick={() => onUpdateCartQty(item.product.id, 0)}
                          className="text-stone-300 hover:text-red-500 text-[10px] font-mono mt-2 transition-colors"
                        >
                          Verwijderen
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-stone-50 flex-shrink-0">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] tracking-widest font-mono text-stone-400 uppercase">
                        Subtotaal
                      </p>
                      <p className="text-xl font-mono text-stone-800 font-bold mt-1">
                        €{cartTotal},00
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 bg-stone-200/50 px-2.5 py-1 rounded-full uppercase">
                      Reservering
                    </span>
                  </div>

                  <button
                    id="btn-checkout-cart"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-gold-100 font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Reservering Starten
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Pre-Order Inquiry Form Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!orderSubmitted) setIsCheckoutOpen(false);
              }}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white max-w-md w-full rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
            >
              {!orderSubmitted ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="text-center pb-2 border-b border-stone-100">
                    <h3 className="font-serif text-xl text-stone-800 font-semibold">
                      Reserveringsaanvraag Imkerij
                    </h3>
                    <p className="text-stone-400 text-xs mt-1">
                      Vul hieronder je gegevens in om een reserveringsaanvraag in te dienen.
                    </p>
                  </div>

                  {/* Summary of what they are reserving */}
                  <div className="bg-stone-50 p-4 rounded-xl space-y-2 text-xs">
                    <p className="text-[10px] tracking-widest font-mono text-stone-400 uppercase">
                      Reserveringsoverzicht
                    </p>
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-stone-600 font-light">
                        <span>
                          {item.product.name} ({item.quantity}x)
                        </span>
                        <span className="font-mono text-stone-800 font-medium">
                          €{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-stone-200/50 pt-2 flex justify-between items-center font-bold text-stone-800 mt-2">
                      <span>Totale Bijdrage</span>
                      <span className="font-mono">€{cartTotal},00</span>
                    </div>
                  </div>

                  {/* Contact Info Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                        Je Naam *
                      </label>
                      <input
                        id="input-customer-name"
                        type="text"
                        required
                        placeholder="Jan Jansen"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-gold-500 focus:bg-white rounded-xl text-sm focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                        E-mailadres *
                      </label>
                      <input
                        id="input-customer-email"
                        type="email"
                        required
                        placeholder="jan@voorbeeld.nl"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-gold-500 focus:bg-white rounded-xl text-sm focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                        Bezorgings-/Verpakkingsvoorkeuren of Vragen
                      </label>
                      <textarea
                        id="input-customer-note"
                        rows={3}
                        placeholder="Eventuele opmerkingen over cadeauverpakking of bezorging..."
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      id="btn-cancel-checkout"
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-1/2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Annuleren
                    </button>
                    <button
                      id="btn-submit-order-inquiry"
                      type="submit"
                      className="w-1/2 py-3 bg-gold-600 hover:bg-gold-500 text-stone-900 font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <Send size={12} />
                      Verzenden
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6 flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: 2, duration: 1 }}
                    className="p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100"
                  >
                    <CheckCircle2 size={56} />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-stone-800">
                      Reserveringsaanvraag Ontvangen
                    </h3>
                    <p className="text-stone-500 text-xs max-w-sm leading-relaxed">
                      Dank je wel, <span className="font-semibold">{customerName}</span>! Je reserveringsaanvraag is geregistreerd bij Hams bijtje. We hebben een conceptbevestiging gestuurd naar <span className="font-semibold text-stone-700">{customerEmail}</span>.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 w-full text-left text-xs text-stone-500">
                    <p className="font-mono text-[9px] tracking-widest text-stone-400 uppercase mb-2">
                      REFERENTIE RESERVERING
                    </p>
                    <p className="leading-relaxed">
                      Referentie: <span className="font-mono font-bold text-stone-800">HB-RES-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </p>
                    <p className="leading-relaxed mt-1">
                      Onze imker neemt spoedig contact met je op om de verpakking en levering af te stemmen.
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400 animate-pulse">
                    Binnenkort terug naar de winkel...
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
