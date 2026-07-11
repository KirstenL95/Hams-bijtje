/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JournalPost } from "../types";
import { Compass, Thermometer, Calendar, X, Tag, BookOpen, PenTool } from "lucide-react";
import { IMAGES } from "../data/defaultData";

interface JournalProps {
  posts: JournalPost[];
  onAddPost: (post: Omit<JournalPost, "id">) => void;
  onUpdatePost?: (postId: string, post: Omit<JournalPost, "id">) => void;
  isEmbed?: boolean; // If shown in the home grid, render only a preview or link
  onViewAll?: () => void;
}

export default function Journal({ posts, onAddPost, onUpdatePost, isEmbed = false, onViewAll }: JournalProps) {
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("MID SUMMER");
  const [newNectar, setNewNectar] = useState("CLOVER & BASSWOOD");
  const [newTemp, setNewTemp] = useState("80°F");
  const [newImages, setNewImages] = useState<string[]>([
    IMAGES.journalMain,
    IMAGES.beehivesField,
  ]);

  const isOwnerView =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  // Get unique tags
  const tags = ["ALL", ...Array.from(new Set(posts.map((p) => p.tag)))];

  // Filter posts
  const filteredPosts =
    selectedTag === "ALL" ? posts : posts.filter((p) => p.tag === selectedTag);

  // If embedded in Home, we only show the featured/first post and a link to View All
  const displayPosts = isEmbed ? [posts[0]] : filteredPosts;

  const resetForm = () => {
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
    setNewTag("MID SUMMER");
    setNewNectar("CLOVER & BASSWOOD");
    setNewTemp("80°F");
    setNewImages([IMAGES.journalMain, IMAGES.beehivesField]);
  };

  const openWriteModal = (post?: JournalPost | null) => {
    if (!isOwnerView) return;

    if (post) {
      setEditingPostId(post.id);
      setNewTitle(post.title);
      setNewExcerpt(post.excerpt);
      setNewContent(post.content);
      setNewTag(post.tag);
      setNewNectar(post.nectarSource);
      setNewTemp(post.temp);
      setNewImages([
        post.images?.[0] ?? post.image,
        post.images?.[1] ?? post.images?.[0] ?? post.image,
      ]);
    } else {
      setEditingPostId(null);
      resetForm();
    }

    setIsWriteOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    if (!newImages[0] || !newImages[1]) return;

    const selectedImages = newImages.filter(Boolean);
    const existingPost = posts.find((post) => post.id === editingPostId);

    if (editingPostId && onUpdatePost) {
      onUpdatePost(editingPostId, {
        title: newTitle,
        excerpt: newExcerpt || newContent.substring(0, 120) + "...",
        content: newContent,
        date: existingPost?.date || new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        temp: newTemp,
        tag: newTag,
        nectarSource: newNectar,
        image: selectedImages[0],
        images: selectedImages,
      });
    } else {
      onAddPost({
        title: newTitle,
        excerpt: newExcerpt || newContent.substring(0, 120) + "...",
        content: newContent,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        temp: newTemp,
        tag: newTag,
        nectarSource: newNectar,
        image: selectedImages[0],
        images: selectedImages,
      });
    }

    setEditingPostId(null);
    resetForm();
    setIsWriteOpen(false);
  };

  const imageOptions = [
    { label: "Beekeeper Holding Frame", value: IMAGES.journalMain },
    { label: "White Beehives in Meadow", value: IMAGES.beehivesField },
    { label: "Artisanal Honey Jars", value: IMAGES.productsCover },
  ];

  return (
    <section id="journal-section" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-100 pb-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-mono mb-3">
              Veldnotities
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-800 tracking-tight leading-none">
              Uit het Imkerij Logboek
            </h2>
          </div>

          {!isEmbed && isOwnerView && (
            <button
              id="btn-new-journal-entry"
              onClick={() => openWriteModal(selectedPost)}
              className="mt-6 md:mt-0 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-gold-100 font-medium text-xs tracking-wider uppercase rounded-full transition-all duration-300 flex items-center gap-2 border border-stone-800 shadow-md"
            >
              <PenTool size={14} className="text-gold-500" />
              Schrijf Bericht
            </button>
          )}

          {isEmbed && onViewAll && (
            <button
              id="btn-view-all-journal"
              onClick={onViewAll}
              className="mt-6 md:mt-0 text-stone-500 hover:text-gold-600 text-xs tracking-widest uppercase font-mono transition-colors duration-300 flex items-center gap-2"
            >
              Alle Berichten <span className="text-sm font-sans font-bold">→</span>
            </button>
          )}
        </div>

        {/* Tags Filter (Only on full tab) */}
        {!isEmbed && (
          <div className="flex flex-wrap gap-2 mb-12">
            {tags.map((tag) => (
              <button
                id={`tag-filter-${tag}`}
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-gold-100 text-gold-900 font-semibold"
                    : "text-stone-500 hover:text-stone-800 bg-stone-50 hover:bg-stone-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Featured Post (Image 2 representation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {displayPosts.map((post) => (
            <div
              id={`featured-post-card-${post.id}`}
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="col-span-12 group cursor-pointer border border-stone-100 bg-stone-50/50 hover:bg-stone-50 hover:shadow-xl hover:border-stone-200/60 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row h-full"
            >
              {/* Image side */}
              <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
                <img
                  src={post.images?.[0] ?? post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-6 left-6 px-4 py-1 bg-stone-100/90 backdrop-blur-md text-[10px] text-stone-700 tracking-widest font-semibold uppercase rounded-full font-mono shadow-sm">
                  {post.tag}
                </span>
              </div>

              {/* Text side */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-mono tracking-wider text-stone-500">
                    
                    <span className="flex items-center gap-1.5">
                      <Thermometer size={13} className="text-gold-500" />
                      {post.temp}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold-500" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-800 leading-tight group-hover:text-gold-700 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-sm text-stone-500 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-8">
                  <span className="text-[11px] tracking-widest uppercase font-mono font-semibold text-stone-800 group-hover:text-gold-600 transition-colors duration-300 flex items-center gap-2">
                    Lees Bericht <span className="text-sm font-sans">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Posts Grid (Only shown on full tab) */}
        {!isEmbed && filteredPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <div
                id={`journal-post-card-${post.id}`}
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-white border border-stone-100 hover:border-stone-200 hover:shadow-lg rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                    <img
                      src={post.images?.[0] ?? post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-[9px] text-stone-600 tracking-widest font-mono uppercase rounded-full">
                      {post.tag}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-stone-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.temp}</span>
                  </div>

                  <h4 className="font-serif text-lg text-stone-800 leading-snug mb-3 group-hover:text-gold-700 transition-colors duration-300">
                    {post.title}
                  </h4>

                  <p className="font-sans text-xs text-stone-500 leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-50 flex justify-between items-center text-[10px] font-mono tracking-wider">
                  <span className="text-gold-600">{post.nectarSource}</span>
                  <span className="text-stone-800 font-semibold group-hover:text-gold-500 transition-colors flex items-center gap-1">
                    Lezen <span className="font-sans text-xs">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Image Header with close button */}
              <div className="relative h-[250px] md:h-[350px] flex-shrink-0">
                <img
                  src={selectedPost.images?.[0] ?? selectedPost.image}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                <button
                  id="btn-close-journal-modal"
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-gold-600 text-stone-900 font-mono text-[9px] tracking-widest font-semibold uppercase rounded-full shadow-sm mb-3 inline-block">
                    {selectedPost.tag}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-10 flex-1 bg-stone-50/30">
                {/* Meta details */}
                <div className="flex flex-wrap gap-y-3 justify-between items-center border-b border-stone-100 pb-6 mb-8 text-xs font-mono text-stone-500">
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-gold-500" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer size={13} className="text-gold-500" />
                      {selectedPost.temp}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="prose prose-stone font-sans text-stone-700 leading-relaxed space-y-6 text-sm md:text-base font-light">
                  {selectedPost.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {(selectedPost.images?.length ?? 0) > 1 && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {selectedPost.images?.map((image, idx) => (
                      <img
                        key={`${selectedPost.id}-${idx}`}
                        src={image}
                        alt={`${selectedPost.title} ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover rounded-2xl border border-stone-200"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-stone-100 bg-white flex justify-end gap-3">
                {isOwnerView && (
                  <button
                    id="btn-edit-journal-footer"
                    onClick={() => {
                      setSelectedPost(null);
                      openWriteModal(selectedPost);
                    }}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-stone-900 rounded-full font-medium text-xs tracking-wider uppercase transition-colors"
                  >
                    Bewerk Bericht
                  </button>
                )}
                <button
                  id="btn-close-journal-footer"
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Sluit Bericht
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Write New Entry Modal */}
      <AnimatePresence>
        {isWriteOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <PenTool className="text-gold-600" size={18} />
                  <h3 className="font-serif text-xl text-stone-800">
                    {editingPostId ? "Logboekbericht Bewerken" : "Nieuw Logboekbericht Ontwerpen"}
                  </h3>
                </div>
                <button
                  id="btn-close-write-modal"
                  onClick={() => setIsWriteOpen(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1">
                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                    Titel *
                  </label>
                  <input
                    id="input-entry-title"
                    type="text"
                    required
                    placeholder="bijv. Honing oogsten uit Kast A of Zwermpreventie"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-gold-500 focus:bg-white rounded-xl text-sm focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                    Samenvatting
                  </label>
                  <input
                    id="input-entry-excerpt"
                    type="text"
                    placeholder="Korte beschrijving voor previews..."
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-gold-500 focus:bg-white rounded-xl text-sm focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                      Seizoen / Categorie
                    </label>
                    <select
                      id="select-entry-tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                    >
                      <option value="MID SUMMER">Midden Zomer</option>
                      <option value="EARLY SPRING">Vroeg Voorjaar</option>
                      <option value="SPRING BLOOM">Lente Bloei</option>
                      <option value="LATE AUTUMN">Late Herfst</option>
                      <option value="WINTERING">Overwintering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                      Temperatuur
                    </label>
                    <input
                      id="input-entry-temp"
                      type="text"
                      placeholder="bijv. 24°C"
                      value={newTemp}
                      onChange={(e) => setNewTemp(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                      Belangrijkste Nectarbron
                    </label>
                    <input
                      id="input-entry-nectar"
                      type="text"
                      placeholder="bijv. KLAVER & LINDE"
                      value={newNectar}
                      onChange={(e) => setNewNectar(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                      Foto 1 *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {imageOptions.map((opt, idx) => (
                        <div
                          key={`photo-1-${idx}`}
                          onClick={() => setNewImages([opt.value, newImages[1]])}
                          className={`cursor-pointer relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            newImages[0] === opt.value
                              ? "border-gold-600 ring-2 ring-gold-200"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={opt.value}
                            alt={opt.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-center">
                            <span className="text-[8px] text-white font-sans truncate block leading-tight">
                              {opt.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                      Foto 2 *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {imageOptions.map((opt, idx) => (
                        <div
                          key={`photo-2-${idx}`}
                          onClick={() => setNewImages([newImages[0], opt.value])}
                          className={`cursor-pointer relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            newImages[1] === opt.value
                              ? "border-gold-600 ring-2 ring-gold-200"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={opt.value}
                            alt={opt.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-center">
                            <span className="text-[8px] text-white font-sans truncate block leading-tight">
                              {opt.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-stone-400 uppercase mb-2">
                    Logboek Inhoud *
                  </label>
                  <textarea
                    id="input-entry-content"
                    required
                    rows={6}
                    placeholder="Schrijf hier je verhaal van de bijenkasten. Gebruik een dubbele regelafstand om alinea's te maken..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-gold-500 focus:bg-white rounded-xl text-sm focus:outline-none transition-all font-sans leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                  <button
                    id="btn-cancel-write"
                    type="button"
                    onClick={() => {
                      setEditingPostId(null);
                      resetForm();
                      setIsWriteOpen(false);
                    }}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    id="btn-publish-entry"
                    type="submit"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-stone-900 font-semibold rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    {editingPostId ? "Bericht Bijwerken" : "Bericht Publiceren"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
