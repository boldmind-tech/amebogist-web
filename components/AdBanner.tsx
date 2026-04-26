"use client";

import { ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AdBannerProps {
  slot?: string;
}

export default function AdBanner({ slot }: AdBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full my-16 rounded-[2.5rem] bg-slate-900 border border-white/10 overflow-hidden relative group shadow-2xl p-1"
    >
      <div className="relative overflow-hidden rounded-[2.3rem] p-8 md:p-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-amebogreen-600/20 via-ecosystem-gold/10 to-transparent opacity-50" />
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-amebogreen-500/10 rounded-full blur-[100px] group-hover:bg-amebogreen-500/20 transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amebogreen-500/10 border border-amebogreen-500/20 text-amebogreen-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles className="h-3 w-3" /> BoldMind Ecosystem Spotlight
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-4 leading-none">
              BOOST YOUR <span className="text-amebogreen-400">APP IN NIGERIA</span>!
            </h3>
            <p className="text-white/60 text-lg font-serif">
              Join 12,000+ creators and businesses scaling with <span className="text-white font-bold italic">BoldMind OS</span>.
            </p>
          </div>

          <Link
            href="https://os.boldmind.ng"
            className="group/btn relative px-8 py-4 bg-amebogreen-600 hover:bg-amebogreen-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-amebogreen-900/40 hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now <ExternalLink className="h-4 w-4" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
