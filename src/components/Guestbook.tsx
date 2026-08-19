import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Send, Sparkles, Filter, Smile } from "lucide-react";
import { GuestbookEntry } from "../types";
import { useLanguage } from "../LanguageContext";

export default function Guestbook() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Well-wisher");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const relations = ["Well-wisher", "Family", "Friend of Bride", "Friend of Groom", "Colleague"];

  const getRelationLabel = (relValue: string) => {
    switch (relValue) {
      case "Well-wisher": return t("relWellWisher");
      case "Family": return t("relFamily");
      case "Friend of Bride": return t("relFriendBride");
      case "Friend of Groom": return t("relFriendGroom");
      case "Colleague": return t("relColleague");
      default: return relValue;
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error("Error fetching guestbook:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(t("formError"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message, relation }),
      });

      if (!res.ok) {
        throw new Error(t("formError"));
      }

      const newEntry = await res.json();
      setEntries((prev) => [newEntry, ...prev]);
      setName("");
      setMessage("");
      setRelation("Well-wisher");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = filter === "All"
    ? entries
    : entries.filter(e => e.relation === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#521659] mb-4">
          {t("guestbookTitle")}
        </h3>
        <div className="w-16 h-[1.5px] bg-amber-500 mx-auto mb-4" />
        <p className="font-sans text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          {t("guestbookSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Submit Guestbook Wishes Form */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-[0_15px_35px_rgba(82,22,89,0.03)] lg:sticky lg:top-24">
            <div className="flex items-center space-x-2 text-purple-700 mb-6 pb-4 border-b border-purple-50">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="font-sans font-bold tracking-widest text-xs uppercase text-[#521659]">{t("leaveWishes")}</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="guestbook-name" className="block text-[10px] font-bold tracking-widest text-purple-800 uppercase">
                  {t("yourName")}
                </label>
                <input
                  id="guestbook-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("yourNamePlaceholder")}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-purple-300 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-800 shadow-inner"
                />
              </div>

              {/* Relation Selector */}
              <div className="space-y-1.5">
                <label htmlFor="guestbook-relation" className="block text-[10px] font-bold tracking-widest text-purple-800 uppercase">
                  {t("relationToCouple")}
                </label>
                <div className="relative">
                  <select
                    id="guestbook-relation"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-purple-300 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-800 appearance-none shadow-inner cursor-pointer"
                  >
                    {relations.map((rel) => (
                      <option key={rel} value={rel}>
                        {getRelationLabel(rel)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label htmlFor="guestbook-message" className="block text-[10px] font-bold tracking-widest text-purple-800 uppercase">
                  {t("yourWellWishes")}
                </label>
                <textarea
                  id="guestbook-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-purple-300 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-800 resize-none shadow-inner leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                id="submit-guestbook-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-purple-800 hover:bg-purple-900 text-white rounded-xl text-xs font-bold tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span>{t("postingWish")}</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{t("postWishes")}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Right Side: Wishes Stream */}
        <div className="lg:col-span-7 flex flex-col space-y-5 h-full overflow-hidden w-full">
          {/* Filters Bar */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-100/60 shadow-[0_10px_25px_rgba(82,22,89,0.02)] overflow-x-auto custom-scrollbar whitespace-nowrap w-full">
            <span className="text-stone-400 py-1.5 px-2 flex items-center flex-shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1 text-purple-500" />
              <span className="font-sans text-[10px] font-bold tracking-wider uppercase">{t("filterLabel")}</span>
            </span>

            <button
              id="filter-all-btn"
              onClick={() => setFilter("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors cursor-pointer flex-shrink-0 ${
                filter === "All"
                  ? "bg-purple-800 text-white font-semibold shadow-sm"
                  : "text-stone-600 hover:bg-purple-50 hover:text-purple-800"
              }`}
            >
              {t("filterAll")} ({entries.length})
            </button>

            {relations.map((rel) => {
              const count = entries.filter((e) => e.relation === rel).length;
              return (
                <button
                  id={`filter-${rel.replace(/\s+/g, "-").toLowerCase()}-btn`}
                  key={rel}
                  onClick={() => setFilter(rel)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors cursor-pointer flex-shrink-0 ${
                    filter === rel
                      ? "bg-purple-800 text-white font-semibold shadow-sm"
                      : "text-stone-600 hover:bg-purple-50 hover:text-purple-800"
                  }`}
                >
                  {getRelationLabel(rel)} ({count})
                </button>
              );
            })}
          </div>

          {/* Wishes List Container */}
          <div className="max-h-[640px] overflow-y-auto custom-scrollbar pr-1 space-y-5">
            <AnimatePresence initial={false}>
              {filteredEntries.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/60 rounded-3xl border border-stone-200/50 p-12 text-center text-stone-500 flex flex-col items-center justify-center space-y-3"
                >
                  <Smile className="w-8 h-8 text-stone-300 animate-pulse" />
                  <p className="font-sans text-sm font-medium">{t("noWishes")}</p>
                  <p className="font-sans text-xs text-stone-400">{t("beFirstWish")}</p>
                </motion.div>
              ) : (
                filteredEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    layout
                    className="p-6 bg-white rounded-3xl border border-purple-100/50 shadow-[0_10px_25px_rgba(82,22,89,0.02)] hover:shadow-[0_15px_35px_rgba(82,22,89,0.06)] hover:border-purple-200/80 transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="font-serif text-base font-semibold text-stone-800 flex items-center gap-1.5">
                          {entry.name}
                          <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 flex-shrink-0 animate-pulse" style={{ animationDuration: "3s" }} />
                        </h5>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-100/40 rounded-full text-[9px] font-bold tracking-wider uppercase">
                          {getRelationLabel(entry.relation)}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-stone-400 font-medium">
                        {new Date(entry.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-stone-600 leading-relaxed italic relative pl-4 border-l-2 border-purple-100">
                      "{entry.message}"
                    </p>

                    {/* Subtle aesthetic accent badge */}
                    <div className="absolute right-4 bottom-4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
