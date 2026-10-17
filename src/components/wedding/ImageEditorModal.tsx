"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEditStore, type ImageEdit } from "@/lib/edit-store";
import {
  RotateCw, RotateCcw, ZoomIn, ZoomOut, Sun, Contrast, Droplets,
  Sparkles, Crop, Move, RefreshCcw, Check, X, Upload, ArrowLeft, ArrowRight,
  ArrowUp, ArrowDown, FlipHorizontal, FlipVertical,
} from "lucide-react";

type Props = {
  imageKey: string;
  open: boolean;
  onClose: () => void;
};

const DEFAULT_FILTER = { brightness: 1, contrast: 1, saturate: 1, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0 };
const DEFAULT_TRANSFORM = { scale: 1, rotate: 0, translateX: 0, translateY: 0, flipH: false, flipV: false };

function buildFilter(f: typeof DEFAULT_FILTER) {
  return `brightness(${f.brightness}) contrast(${f.contrast}) saturate(${f.saturate}) blur(${f.blur}px) grayscale(${f.grayscale}) sepia(${f.sepia}) hue-rotate(${f.hueRotate}deg)`;
}
function buildTransform(t: typeof DEFAULT_TRANSFORM) {
  const sx = t.flipH ? -1 : 1;
  const sy = t.flipV ? -1 : 1;
  return `translate(${t.translateX}%, ${t.translateY}%) scale(${t.scale * sx}, ${t.scale * sy}) rotate(${t.rotate}deg)`;
}

// Range control helper, declared outside the modal to avoid "components created
// during render" warnings.
function Range({
  icon, label, value, min, max, step, onChange, suffix = "",
}: {
  icon: React.ReactNode; label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-foreground/80 flex items-center gap-2">
          {icon} {label}
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {value.toFixed(2)}{suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min} max={max} step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}

export function ImageEditorModal({ imageKey, open, onClose }: Props) {
  const stored = useEditStore((s) => s.images[imageKey]);
  const setImage = useEditStore((s) => s.setImage);
  const resetImage = useEditStore((s) => s.resetImage);

  // Local working copy
  const [src, setSrc] = useState<string>(stored?.src || "");
  const [filter, setFilter] = useState<typeof DEFAULT_FILTER>(
    stored?.filter ? { ...DEFAULT_FILTER, ...stored.filter } : DEFAULT_FILTER
  );
  const [transform, setTransform] = useState<any>(
    stored?.transform ? { ...DEFAULT_TRANSFORM, ...stored.transform } : DEFAULT_TRANSFORM
  );
  const [fit, setFit] = useState<"cover" | "contain">(stored?.fit || "cover");
  const [tab, setTab] = useState("adjust");

  // Reset local state when opening. We intentionally call setState in an effect
  // here to reset the working copy when the dialog opens.
  useEffect(() => {
    if (open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setSrc(stored?.src || "");
      setFilter(stored?.filter ? { ...DEFAULT_FILTER, ...stored.filter } : DEFAULT_FILTER);
      setTransform(stored?.transform ? { ...DEFAULT_TRANSFORM, ...stored.transform } : DEFAULT_TRANSFORM);
      setFit(stored?.fit || "cover");
      setTab("adjust");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open, imageKey]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setSrc(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const apply = () => {
    const edit: Partial<ImageEdit> = {
      filter: filter as any,
      transform: transform as any,
      fit,
    };
    if (src) edit.src = src;
    setImage(imageKey, edit);
    onClose();
  };

  const cancel = () => onClose();

  const reset = () => {
    setFilter(DEFAULT_FILTER);
    setTransform(DEFAULT_TRANSFORM);
    setFit("cover");
    setSrc("");
  };

  const resetAll = () => {
    resetImage(imageKey);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-4 pb-2 border-b">
          <DialogTitle className="font-serif-d text-xl">Edit image</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
          {/* Preview area */}
          <div className="relative h-[55vh] md:h-[65vh] bg-[repeating-conic-gradient(#f5f5f5_0%_25%,#fafafa_0%_50%)] bg-[length:24px_24px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {src ? (
                <img
                  src={src}
                  alt="preview"
                  className="max-w-full max-h-full shadow-xl transition-transform duration-200"
                  style={{
                    filter: buildFilter(filter),
                    transform: buildTransform(transform),
                    objectFit: fit,
                  }}
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <p className="font-serif-d text-lg mb-2">No image yet</p>
                  <p className="text-sm mb-4">Upload a photo to start editing, or close to keep the current image.</p>
                  <label className="inline-block">
                    <span className="ed-toolbar ed-btn !bg-pink-500 !text-white !px-4 !py-2 !h-auto cursor-pointer">
                      <Upload size={14} className="mr-2" /> Upload image
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={onFile} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col border-l">
            <div className="p-3 border-b">
              <label className="block">
                <span className="inline-flex items-center justify-center w-full h-9 rounded-md bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors cursor-pointer">
                  <Upload size={14} className="mr-2" /> Replace image
                </span>
                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={onFile} />
              </label>
            </div>

            <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 mx-3 mt-3">
                <TabsTrigger value="adjust"><Sun size={14} className="mr-1" /> Adjust</TabsTrigger>
                <TabsTrigger value="transform"><Crop size={14} className="mr-1" /> Transform</TabsTrigger>
                <TabsTrigger value="fit"><Move size={14} className="mr-1" /> Fit</TabsTrigger>
              </TabsList>

              <TabsContent value="adjust" className="flex-1 overflow-y-auto p-4 pt-3 m-0">
                <Range icon={<Sun size={14} />} label="Brightness" value={filter.brightness} min={0.5} max={1.5} step={0.01} onChange={(v) => setFilter({ ...filter, brightness: v })} />
                <Range icon={<Contrast size={14} />} label="Contrast" value={filter.contrast} min={0.5} max={1.5} step={0.01} onChange={(v) => setFilter({ ...filter, contrast: v })} />
                <Range icon={<Droplets size={14} />} label="Saturation" value={filter.saturate} min={0} max={2} step={0.01} onChange={(v) => setFilter({ ...filter, saturate: v })} />
                <Range icon={<Sparkles size={14} />} label="Hue rotate" value={filter.hueRotate} min={0} max={360} step={1} suffix="°" onChange={(v) => setFilter({ ...filter, hueRotate: v })} />
                <Range icon={<span className="text-xs">▢</span>} label="Blur" value={filter.blur} min={0} max={6} step={0.1} suffix="px" onChange={(v) => setFilter({ ...filter, blur: v })} />
                <Range icon={<span className="text-xs">◐</span>} label="Grayscale" value={filter.grayscale} min={0} max={1} step={0.01} onChange={(v) => setFilter({ ...filter, grayscale: v })} />
                <Range icon={<span className="text-xs">◖</span>} label="Sepia" value={filter.sepia} min={0} max={1} step={0.01} onChange={(v) => setFilter({ ...filter, sepia: v })} />
              </TabsContent>

              <TabsContent value="transform" className="flex-1 overflow-y-auto p-4 pt-3 m-0">
                <Range icon={<ZoomIn size={14} />} label="Scale" value={transform.scale} min={0.5} max={2.5} step={0.01} onChange={(v) => setTransform({ ...transform, scale: v })} />
                <Range icon={<RotateCw size={14} />} label="Rotate" value={transform.rotate} min={-180} max={180} step={1} suffix="°" onChange={(v) => setTransform({ ...transform, rotate: v })} />
                <Range icon={<ArrowLeft size={14} />} label="Move X" value={transform.translateX} min={-50} max={50} step={1} suffix="%" onChange={(v) => setTransform({ ...transform, translateX: v })} />
                <Range icon={<ArrowUp size={14} />} label="Move Y" value={transform.translateY} min={-50} max={50} step={1} suffix="%" onChange={(v) => setTransform({ ...transform, translateY: v })} />
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={() => setTransform({ ...transform, flipH: !transform.flipH })}>
                    <FlipHorizontal size={14} className="mr-2" /> Flip H
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTransform({ ...transform, flipV: !transform.flipV })}>
                    <FlipVertical size={14} className="mr-2" /> Flip V
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTransform({ ...transform, rotate: (transform.rotate + 90) % 360 })}>
                    <RotateCw size={14} className="mr-2" /> +90°
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTransform({ ...transform, rotate: (transform.rotate - 90) % 360 })}>
                    <RotateCcw size={14} className="mr-2" /> -90°
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="fit" className="flex-1 overflow-y-auto p-4 pt-3 m-0">
                <p className="text-sm text-muted-foreground mb-3">
                  Choose how the image fits inside its frame on the page.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={fit === "cover" ? "default" : "outline"}
                    onClick={() => setFit("cover")}
                  >
                    Cover (fill)
                  </Button>
                  <Button
                    variant={fit === "contain" ? "default" : "outline"}
                    onClick={() => setFit("contain")}
                  >
                    Contain (fit)
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Tip: Use <strong>Cover</strong> to fill the frame and crop the overflow;
                  use <strong>Contain</strong> to show the whole image with letterbox.
                </p>
              </TabsContent>
            </Tabs>

            <DialogFooter className="border-t p-3 flex-row gap-2">
              <Button variant="ghost" size="sm" onClick={resetAll} className="text-pink-600">
                <RefreshCcw size={14} className="mr-2" /> Reset to original
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" size="sm" onClick={cancel}>
                <X size={14} className="mr-2" /> Cancel
              </Button>
              <Button size="sm" onClick={apply} className="bg-pink-500 hover:bg-pink-600 text-white">
                <Check size={14} className="mr-2" /> Apply
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
