"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useEditStore } from "@/lib/edit-store";
import { Check, X, RotateCcw, Pencil } from "lucide-react";

type Props = {
  textKey: string;
  fallback: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
  toolbarPosition?: "top" | "bottom" | "left" | "right";
};

export function EditableText({
  textKey,
  fallback,
  as = "p",
  className = "",
  multiline = false,
  toolbarPosition = "top",
}: Props) {
  const editingEnabled = useEditStore((s) => s.editingEnabled);
  const activeTextKey = useEditStore((s) => s.activeTextKey);
  const setText = useEditStore((s) => s.setText);
  const resetText = useEditStore((s) => s.resetText);
  const setActiveText = useEditStore((s) => s.setActiveText);

  const stored = useEditStore((s) => s.text[textKey]);
  const isActive = activeTextKey === textKey;

  const ref = useRef<HTMLElement | null>(null);

  // Focus when becoming active
  useEffect(() => {
    if (isActive && ref.current) {
      const t = setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        el.focus();
        // place cursor at end
        const sel = window.getSelection();
        if (sel) {
          const range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  // Keep visual content in sync when not editing (so external updates show up)
  useLayoutEffect(() => {
    if (!isActive && ref.current) {
      const next = stored ?? fallback;
      if (ref.current.textContent !== next) {
        ref.current.textContent = next;
      }
    }
  }, [stored, fallback, isActive]);

  const Tag = as as any;

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingEnabled) return;
    setActiveText(textKey);
  };

  const commit = () => {
    const text = ref.current?.innerText ?? (stored ?? fallback);
    setText(textKey, text.trim());
    setActiveText(null);
  };

  const cancel = () => {
    // Restore visual content
    if (ref.current) ref.current.textContent = stored ?? fallback;
    setActiveText(null);
  };

  const reset = () => {
    resetText(textKey, fallback);
    if (ref.current) ref.current.textContent = fallback;
    setActiveText(null);
  };

  const onInput = () => {
    // No-op; we read the DOM directly on commit. This exists to keep React
    // happy with contentEditable.
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    } else if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      commit();
    } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      commit();
    }
  };

  const tbPosClass =
    toolbarPosition === "top"
      ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
      : toolbarPosition === "bottom"
      ? "top-full mt-2 left-1/2 -translate-x-1/2"
      : toolbarPosition === "left"
      ? "right-full mr-2 top-1/2 -translate-y-1/2"
      : "left-full ml-2 top-1/2 -translate-y-1/2";

  return (
    <span
      className={`relative inline-block ${isActive ? "ed-active" : editingEnabled ? "ed-hover" : ""}`}
      onClick={startEdit}
    >
      <Tag
        ref={ref as any}
        className={className}
        contentEditable={isActive}
        suppressContentEditableWarning
        onInput={onInput}
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (isActive) commit();
        }}
        data-textkey={textKey}
      >
        {stored ?? fallback}
      </Tag>

      {isActive && (
        <div className={`ed-toolbar ${tbPosClass}`} onMouseDown={(e) => e.preventDefault()}>
          <button type="button" className="ed-btn" onClick={commit} title="Save (Ctrl/Cmd+Enter)">
            <Check size={14} />
          </button>
          <button type="button" className="ed-btn" onClick={cancel} title="Cancel (Esc)">
            <X size={14} />
          </button>
          <button type="button" className="ed-btn danger" onClick={reset} title="Reset to original">
            <RotateCcw size={14} />
          </button>
        </div>
      )}

      {editingEnabled && !isActive && (
        <span
          className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity text-pink-500/60"
          aria-hidden
        >
          <Pencil size={12} />
        </span>
      )}
    </span>
  );
}
