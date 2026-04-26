"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SearchBarProps {
  showTrending?: boolean;
  initialValue?: string;
}

export default function SearchBar({
  showTrending = false,
  initialValue = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSearch} className="relative group">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused ? "0 20px 40px -20px rgba(22, 163, 74, 0.3)" : "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
          }}
          className={`relative flex items-center bg-white rounded-full p-1.5 border-2 transition-all duration-300 ${isFocused ? 'border-amebogreen-500 shadow-xl' : 'border-amebogreen-100 group-hover:border-amebogreen-200'}`}
        >
          <div className="pl-6 pr-4">
            <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-amebogreen-600' : 'text-gray-400'}`} />
          </div>

          <input
            type="text"
            placeholder="Search for breaking gist, tech, or politics..."
            className="w-full bg-transparent border-none focus:ring-0 text-lg font-serif placeholder:text-gray-400 text-gray-900 py-3 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Button
            type="submit"
            className="h-12 px-8 rounded-full bg-amebogreen-600 hover:bg-amebogreen-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amebogreen-600/20 active:scale-95 transition-all"
          >
            Find Gist
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-12 right-0 flex items-center gap-2 text-amebogreen-600 font-black text-[10px] uppercase tracking-widest bg-amebogreen-50 px-4 py-2 rounded-full border border-amebogreen-100"
            >
              <Sparkles className="h-3 w-3 animate-pulse" /> Press Enter to Search
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {showTrending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {["Tinubu", "Afrobeats", "AI Tools", "Nollywood", "Elections"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${term}`}
              className="text-[10px] font-black bg-white hover:bg-amebogreen-600 hover:text-white px-4 py-2 rounded-full transition-all border border-gray-100 shadow-sm uppercase tracking-widest text-gray-500 hover:scale-105"
            >
              #{term}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}