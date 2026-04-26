"use client";

import { Share2, Facebook, Twitter, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { Button } from '@boldmind-tech/ui';
import { toast } from 'sonner';

export default function ShareButtons({ url, vertical = false }: { url: string; title: string, vertical?: boolean }) {
  const shareLinks = [
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', hover: 'hover:bg-blue-50' },
    { name: 'Twitter', icon: Twitter, iconAlt: 'X', color: 'text-sky-500', hover: 'hover:bg-sky-50' },
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', hover: 'hover:bg-green-50' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className={`flex items-center gap-2 ${vertical ? 'flex-col' : 'flex-wrap'}`}>
      {!vertical && (
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <Share2 className="h-4 w-4" /> Share:
        </span>
      )}
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="sm"
          className={`h-9 w-9 p-0 rounded-full border-gray-200 ${link.hover}`}
          title={`Share on ${link.name}`}
          onClick={() => toast.info(`Sharing to ${link.name}...`)}
        >
          <link.icon className={`h-4 w-4 ${link.color}`} />
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 p-0 rounded-full border-gray-200 hover:bg-gray-50"
        title="Copy Link"
        onClick={copyLink}
      >
        <LinkIcon className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
}
