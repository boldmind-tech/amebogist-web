"use client";

import { useState } from 'react';
import { Button, Input } from '@boldmind-tech/ui';
import { Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterForm({
  compact = false,
  product = 'amebogist',
  tags = []
}: {
  compact?: boolean;
  product?: string;
  tags?: string[];
}) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubscribed(true);
    toast.success('Welcome to the inner circle! 🚀');
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">You're in! Check your inbox soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${compact ? '' : 'max-w-md mx-auto'}`}>
      <div className="relative group">
        <Input
          type="email"
          placeholder="Enter your email"
          required
          className="pl-12 h-14 rounded-2xl border-white/10 bg-white/5 focus:bg-white/10 text-white placeholder:text-white/30 focus:border-amebogreen-500 transition-all duration-300"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-amebogreen-400 transition-colors" />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 bg-ecosystem-gold hover:bg-[#E5B500] text-slate-900 rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-lg shadow-ecosystem-gold/20 active:scale-[0.98] transition-all duration-300"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full" />
            Joining...
          </span>
        ) : (
          'Subscribe Now'
        )}
      </Button>
    </form>
  );
}
