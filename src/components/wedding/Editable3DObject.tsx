"use client";

import { useState, useRef, useEffect } from "react";
import { useEditStore, type Object3DEdit } from "@/lib/edit-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Upload, RotateCcw, Palette, ImageOff, Check } from "lucide-react";

type Props = {
  objectKey: string;
  src: string;            // default 3D-object image
  alt: string;
  className?: string;     // outer wrapper position/size classes
  imgClassName?: string;  // image classes (width/height/filter overrides)
  // optional: a palette of hue-rotate presets (deg) for "color change"
  huePresets?: number[];
};

const DEFAULT_HUE_PRESETS = [0, 30, 60, 120, 180, 240, 300, 330];

export function Editable3DObject({
  objectKey,
  src,
  alt,
  className = "",
  imgClassName = "",
  huePresets = DEFAULT_HUE_PRESETS,
}: Props) {
  const editingEnabled = useEditStore((s) => s.editingEnabled);
  const stored = useEditStore((s) => s.objects[objectKey]);
  const setObject = useEditStore((s) => s.setObject);
  const resetObject = useEditStore((s) => s.resetObject);
  const activeObjectKey = useEditStore((s) => s.activeObjectKey);
  const setActiveObject = useEditStore((s) => s.setActiveObject);

  const [broken, setBroken] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentSrc = stored?.src || src;
  const hueRotate = stored?.hueRotate || 0;

  // Reset broken flag whenever the src changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBroken(false);
  }, [currentSrc]);

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setObject(objectKey, { src: reader.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const reset = () => resetObject(objectKey);

  const filter = `hue-rotate(${hueRotate}deg) saturate(1.05)`;

  // Outer wrapper handles the user-provided positioning (absolute etc).
  // Inner wrapper is `relative` so the popover trigger button can be `absolute inset-0`.
  return (
    <div className={`group ${className}`}>
      <div className="relative w-full h-full">
        {currentSrc && !broken ? (
          <img
            src={currentSrc}
            alt={alt}
            className={`block ${imgClassName}`}
            style={{ filter }}
            onError={() => setBroken(true)}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pink-400/50">
            <ImageOff size={20} />
          </div>
        )}

        {editingEnabled && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={onFileSelected}
            />
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={`Edit ${alt}`}
                  className="absolute inset-0 cursor-pointer rounded-md transition-shadow"
                  style={{
                    background: "transparent",
                    border: 0,
                    boxShadow: "inset 0 0 0 1px transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(244,114,182,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px transparent")}
                  onClick={() => setActiveObject(objectKey)}
                />
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={6}
                className="w-64 p-3"
                onOpenChange={(open) => { if (!open) setActiveObject(null); }}
              >
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Palette size={14} className="text-pink-500" />
                  Edit 3D object
                </div>

                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1.5">Recolor</div>
                  <div className="flex flex-wrap gap-1.5">
                    {huePresets.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setObject(objectKey, { hueRotate: h })}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          hueRotate === h ? "border-pink-500 scale-110" : "border-white shadow"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, hsl(${(h + 330) % 360}, 70%, 80%), hsl(${(h + 200) % 360}, 70%, 75%))`,
                        }}
                        aria-label={`Hue ${h}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[hueRotate]}
                      min={0} max={360} step={1}
                      onValueChange={(v) => setObject(objectKey, { hueRotate: v[0] })}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload size={14} className="mr-1.5" /> Replace
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-600"
                    onClick={reset}
                  >
                    <RotateCcw size={14} className="mr-1.5" /> Reset
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
}
