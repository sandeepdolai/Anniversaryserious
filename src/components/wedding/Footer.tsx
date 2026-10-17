"use client";

import { EditableText } from "./EditableText";

export function WeddingFooter() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-transparent via-pink-50/60 to-pink-100/70 border-t border-pink-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-center sm:text-left">
          <div>
            <p className="font-script text-3xl text-pink-700">James &amp; Julia</p>
            <p className="text-sm text-foreground/60 mt-1">20 February 2021 · Boston College Club</p>
          </div>
          <div className="sm:text-center">
            <EditableText
              textKey="footer-tagline"
              fallback="With love and gratitude,"
              as="p"
              className="font-serif-d italic text-foreground/70"
            />
            <EditableText
              textKey="footer-signoff"
              fallback="we thank you for being part of our story."
              as="p"
              className="text-sm text-foreground/60 mt-1"
            />
          </div>
          <div className="sm:text-right text-sm text-foreground/60">
            <p className="font-serif-d text-base">A day to remember</p>
            <p className="mt-1">Click any text or image to make this invitation your own.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-foreground/40">
          <EditableText
            textKey="footer-credit"
            fallback="Reconstructed from the original video · Built with Next.js, Three.js & Framer Motion"
            as="p"
            className="text-xs"
          />
        </div>
      </div>
    </footer>
  );
}
