"use client";

import { useEditStore } from "@/lib/edit-store";
import { Sparkles, HelpCircle, MousePointerClick, RotateCcw, ChevronUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function EditModeToggle() {
  const editingEnabled = useEditStore((s) => s.editingEnabled);
  const toggleEditing = useEditStore((s) => s.toggleEditing);
  const [showReset, setShowReset] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Track scroll progress for the side indicator
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resetAll = () => {
    useEditStore.setState({ text: {}, images: {}, objects: {} });
    setShowReset(false);
  };

  return (
    <>
      {/* Side scroll progress bar */}
      <div
        className="fixed left-0 top-0 bottom-0 w-1 z-40 pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300"
          style={{ height: `${scrollPct}%`, transition: "height 100ms linear" }}
        />
      </div>

      {/* Top-right floating controls */}
      <div
        className="fixed z-40 right-4 top-4 sm:right-6 sm:top-6 flex items-center gap-2 px-3 py-2 rounded-full shadow-xl border border-pink-200/70 bg-white/85 backdrop-blur-md"
        role="region"
        aria-label="Editing controls"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-pink-600 hover:text-pink-700 transition-colors"
              aria-label="Editing help"
            >
              <HelpCircle size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-80 text-sm">
            <div className="font-serif-d text-base mb-2 flex items-center gap-2">
              <MousePointerClick size={16} className="text-pink-500" /> How to edit
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><strong className="text-foreground">Click any text</strong> to edit it inline. Press <kbd className="px-1 bg-muted rounded text-[10px]">Esc</kbd> to cancel, <kbd className="px-1 bg-muted rounded text-[10px]">⌘/Ctrl+Enter</kbd> to save.</li>
              <li><strong className="text-foreground">Hover any photo</strong> and use the toolbar to replace, edit (crop, zoom, rotate, brightness, hue), or reset it.</li>
              <li><strong className="text-foreground">Hover any 3D object</strong> and click to recolor its hue, replace its image, or reset.</li>
              <li>Toggle the switch to enable/disable edit mode.</li>
              <li>Use the <RotateCcw size={12} className="inline" /> button to reset everything to the original at once.</li>
            </ul>
          </PopoverContent>
        </Popover>

        <span className="text-xs sm:text-sm font-medium text-foreground/80 hidden min-[400px]:inline">
          Edit
        </span>
        <Switch
          checked={editingEnabled}
          onCheckedChange={(v) => toggleEditing(v)}
          aria-label="Toggle editing mode"
        />
        <Sparkles
          size={16}
          className={editingEnabled ? "text-pink-500 animate-pulse" : "text-muted-foreground"}
        />

        <span className="hidden sm:inline-block mx-1 h-5 w-px bg-pink-200/70" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReset(true)}
          className="hidden sm:inline-flex text-pink-600 hover:text-pink-700 hover:bg-pink-50 h-8 px-2"
          aria-label="Reset all edits"
        >
          <RotateCcw size={14} className="mr-1.5" /> Reset all
        </Button>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-pink-500 hover:text-pink-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      </div>

      {/* Mobile reset dialog (simple confirm) */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowReset(false)}>
          <div
            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif-d text-lg mb-2">Reset all edits?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will restore all text, images and 3D objects to their original state. Your changes cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowReset(false)}>Cancel</Button>
              <Button variant="destructive" onClick={resetAll} className="bg-pink-500 hover:bg-pink-600">Reset all</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
