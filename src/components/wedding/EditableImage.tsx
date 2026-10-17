"use client";

import { useState, useRef, useEffect } from "react";
import { useEditStore, type ImageEdit } from "@/lib/edit-store";
import { ImageEditorModal } from "./ImageEditorModal";
import { Pencil, Upload, RotateCcw, ImageOff } from "lucide-react";

type Props = {
  imageKey: string;
  src: string;           // default original src
  alt: string;
  className?: string;    // outer wrapper
  imgClassName?: string;  // img element classes
  rounded?: string;      // e.g. "rounded-md"
  caption?: React.ReactNode; // overlay caption inside the frame
  objectFit?: "cover" | "contain"; // default fit when no edit
  frameClassName?: string; // classes for inner frame (around the img)
  showToolbarOnHover?: boolean;
};

function buildFilter(f: ImageEdit["filter"] = {}) {
  const { brightness = 1, contrast = 1, saturate = 1, blur = 0, grayscale = 0, sepia = 0, hueRotate = 0 } = f;
  return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) blur(${blur}px) grayscale(${grayscale}) sepia(${sepia}) hue-rotate(${hueRotate}deg)`;
}
function buildTransform(t: ImageEdit["transform"] = {}) {
  const { scale = 1, rotate = 0, translateX = 0, translateY = 0, flipH = false, flipV = false } = t as any;
  const sx = flipH ? -1 : 1;
  const sy = flipV ? -1 : 1;
  return `translate(${translateX}%, ${translateY}%) scale(${scale * sx}, ${scale * sy}) rotate(${rotate}deg)`;
}

export function EditableImage({
  imageKey,
  src,
  alt,
  className = "",
  imgClassName = "",
  rounded = "rounded-md",
  caption,
  objectFit = "cover",
  frameClassName = "",
  showToolbarOnHover = true,
}: Props) {
  const editingEnabled = useEditStore((s) => s.editingEnabled);
  const activeImageKey = useEditStore((s) => s.activeImageKey);
  const setActiveImage = useEditStore((s) => s.setActiveImage);
  const stored = useEditStore((s) => s.images[imageKey]);
  const resetImage = useEditStore((s) => s.resetImage);

  const [editorOpen, setEditorOpen] = useState(false);
  const [broken, setBroken] = useState(false);
  const [hovered, setHovered] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // Active state for this image
  const isActive = activeImageKey === imageKey;

  // Compute current src & style
  const currentSrc = stored?.src || src;
  const currentFit = stored?.fit || objectFit;

  // Reset broken flag whenever the src changes.
  // setState-in-effect is acceptable here: we want to retry the image when src changes.
  const knownSrc = currentSrc;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBroken(false);
  }, [knownSrc]);

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Save just the src here; advanced editing happens in modal
        useEditStore.getState().setImage(imageKey, { src: reader.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const quickReplace = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileRef.current?.click();
  };

  const openEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditorOpen(true);
    setActiveImage(imageKey);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetImage(imageKey);
  };

  // The toolbar that appears on hover (only when editing enabled)
  const showToolbar = editingEnabled && (hovered || isActive);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative overflow-hidden ${rounded} ${frameClassName}`}>
        {currentSrc && !broken ? (
          <img
            src={currentSrc}
            alt={alt}
            className={`block w-full h-full transition-transform duration-300 ${imgClassName}`}
            style={{
              objectFit: currentFit,
              filter: buildFilter(stored?.filter),
              transform: buildTransform(stored?.transform),
            }}
            onError={() => setBroken(true)}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-pink-50/40 text-pink-400/70">
            <ImageOff size={20} />
            <span className="text-[10px] mt-1">image missing</span>
          </div>
        )}
        {caption}
      </div>

      {editingEnabled && (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={onFileSelected}
          />
          {showToolbar && (
            <div
              className="ed-toolbar"
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                zIndex: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="ed-btn" onClick={quickReplace} title="Replace image">
                <Upload size={14} />
              </button>
              <button type="button" className="ed-btn" onClick={openEditor} title="Edit (crop/zoom/adjust)">
                <Pencil size={14} />
              </button>
              {stored && (
                <button type="button" className="ed-btn danger" onClick={reset} title="Reset to original">
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          )}
          {showToolbar && (
            <div
              className="ed-toolbar"
              style={{
                position: "absolute",
                bottom: 6,
                left: 6,
                zIndex: 30,
                fontSize: 10,
                pointerEvents: "none",
              }}
            >
              <span className="px-2 text-[10px] tracking-wide opacity-70">Click to edit</span>
            </div>
          )}
        </>
      )}

      {/* Invisible click layer for opening editor */}
      {editingEnabled && (
        <button
          type="button"
          aria-label={`Edit image ${alt}`}
          className="absolute inset-0 cursor-pointer"
          style={{ background: "transparent", border: 0, padding: 0 }}
          onClick={openEditor}
        />
      )}

      <ImageEditorModal imageKey={imageKey} open={editorOpen} onClose={() => { setEditorOpen(false); setActiveImage(null); }} />
    </div>
  );
}
