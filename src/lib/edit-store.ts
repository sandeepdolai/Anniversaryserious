"use client";

import { create } from "zustand";

// Persistent edit store: holds user overrides for text and image sources.
// Edits are stored in-memory (could be persisted to localStorage easily).

export type TextKey = string; // arbitrary, unique per editable element
export type ImageKey = string;

export type ImageEdit = {
  src: string;          // new image (data URL or path)
  filter?: {
    brightness?: number; // 0.5 .. 1.5
    contrast?: number;   // 0.5 .. 1.5
    saturate?: number;   // 0.5 .. 1.5
    blur?: number;        // 0 .. 6 px
    grayscale?: number;  // 0 .. 1
    sepia?: number;       // 0 .. 1
    hueRotate?: number;   // 0 .. 360 deg
  };
  transform?: {
    scale?: number;      // 0.5 .. 2
    rotate?: number;      // -180 .. 180 deg
    translateX?: number;  // -50 .. 50 %
    translateY?: number;  // -50 .. 50 %
  };
  // "fit" controls object-fit
  fit?: "cover" | "contain";
};

export type Object3DEdit = {
  // optional hue-rotate filter (deg) applied to the 3D object image
  hueRotate?: number;
  // optional replacement image (data URL or path)
  src?: string;
};

type EditState = {
  text: Record<TextKey, string>;
  images: Record<ImageKey, ImageEdit>;
  objects: Record<string, Object3DEdit>;
  // Editing UI state
  activeTextKey: TextKey | null;
  activeImageKey: ImageKey | null;
  activeObjectKey: string | null;
  editingEnabled: boolean;
  // Actions
  setText: (key: TextKey, value: string) => void;
  resetText: (key: TextKey, original: string) => void;
  setImage: (key: ImageKey, edit: Partial<ImageEdit>) => void;
  resetImage: (key: ImageKey) => void;
  setObject: (key: string, edit: Partial<Object3DEdit>) => void;
  resetObject: (key: string) => void;
  setActiveText: (key: TextKey | null) => void;
  setActiveImage: (key: ImageKey | null) => void;
  setActiveObject: (key: string | null) => void;
  toggleEditing: (on?: boolean) => void;
};

export const useEditStore = create<EditState>((set, get) => ({
  text: {},
  images: {},
  objects: {},
  activeTextKey: null,
  activeImageKey: null,
  activeObjectKey: null,
  editingEnabled: true,
  setText: (key, value) =>
    set((s) => ({ text: { ...s.text, [key]: value } })),
  resetText: (key, original) =>
    set((s) => {
      const next = { ...s.text };
      delete next[key];
      return { text: next };
    }),
  setImage: (key, edit) =>
    set((s) => {
      const prev = s.images[key] || {};
      return {
        images: {
          ...s.images,
          [key]: {
            ...prev,
            ...edit,
            filter: { ...(prev.filter || {}), ...(edit.filter || {}) },
            transform: { ...(prev.transform || {}), ...(edit.transform || {}) },
          },
        },
      };
    }),
  resetImage: (key) =>
    set((s) => {
      const next = { ...s.images };
      delete next[key];
      return { images: next };
    }),
  setObject: (key, edit) =>
    set((s) => {
      const prev = s.objects[key] || {};
      return { objects: { ...s.objects, [key]: { ...prev, ...edit } } };
    }),
  resetObject: (key) =>
    set((s) => {
      const next = { ...s.objects };
      delete next[key];
      return { objects: next };
    }),
  setActiveText: (key) => set({ activeTextKey: key }),
  setActiveImage: (key) => set({ activeImageKey: key }),
  setActiveObject: (key) => set({ activeObjectKey: key }),
  toggleEditing: (on) =>
    set((s) => ({
      editingEnabled: typeof on === "boolean" ? on : !s.editingEnabled,
      activeTextKey: null,
      activeImageKey: null,
      activeObjectKey: null,
    })),
}));

// Helper hook to read a text value with fallback
export function useText(key: TextKey, fallback: string) {
  return useEditStore((s) => s.text[key] ?? fallback);
}
