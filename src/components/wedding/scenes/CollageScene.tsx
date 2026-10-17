"use client";

import { SceneShell } from "../SceneShell";
import { EditableText } from "../EditableText";
import { Editable3DObject } from "../Editable3DObject";
import { PhotoCard } from "../PhotoCard";
import { ASSET, type Photo } from "@/lib/wedding-data";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export type SceneObj = {
  key: string;
  src: string;
  alt: string;
  className: string;       // absolute position + size
  imgClassName?: string;
  anim?: string;
  rotate?: number;
};

export type ScenePhoto = Photo & {
  key: string;
};

type Props = {
  sceneId: string;
  bg?: string;
  petals?: boolean;
  petalCount?: number;
  // layout configuration
  photos: ScenePhoto[];
  objects?: SceneObj[];
  // optional side content: text block on the opposite side of the photos
  quoteLines?: string[];
  quoteKey?: string;
  quoteClassName?: string;
  // optional extra foreground content (e.g. for special scenes)
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  // which side the 3D objects / quote sit on
  layout?: "left-photos" | "right-photos" | "center-photos";
  // optional min height
  minHeight?: string;
};

function buildQuoteOverlay(lines: string[]) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/70 via-black/35 to-transparent">
      <div className="text-center">
        {lines.map((l, i) => (
          <p key={i} className="font-serif-d italic text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * CollageScene: a flexible scene with photos on one side and 3D objects + quote on the other.
 */
export function CollageScene({
  sceneId,
  bg = "wedding-bg",
  petals = false,
  petalCount = 14,
  photos,
  objects = [],
  quoteLines,
  quoteKey,
  quoteClassName = "",
  children,
  className = "",
  contentClassName = "",
  layout = "right-photos",
  minHeight = "min-h-[100svh]",
}: Props) {
  return (
    <SceneShell
      sceneId={sceneId}
      bg={bg}
      petals={petals}
      petalCount={petalCount}
      className={`relative flex items-center py-16 sm:py-20 md:py-24 ${minHeight} ${className}`}
      contentClassName={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center ${contentClassName}`}
    >
      {children}

      {/* Photos side */}
      <div
        className={`relative ${layout === "right-photos" ? "md:order-2" : layout === "left-photos" ? "md:order-1" : "md:col-span-2"}`}
      >
        <PhotosLayout photos={photos} quoteLines={quoteLines} />
      </div>

      {/* 3D objects + quote side */}
      <div className={`relative ${layout === "right-photos" ? "md:order-1" : "md:order-2"} min-h-[280px] sm:min-h-[320px] md:min-h-[420px]`}>
        {/* 3D objects */}
        {objects.map((o) => (
          <Editable3DObject
            key={o.key}
            objectKey={o.key}
            src={o.src}
            alt={o.alt}
            className={`${o.className} ${o.anim || ""}`}
            imgClassName={`${o.imgClassName || ""}`}
          />
        ))}

        {/* Quote (for scenes where the quote is on the object side) */}
        {quoteKey && quoteLines && (
          <div className={`relative z-10 text-center ${quoteClassName}`}>
            {quoteLines.map((line, i) => (
              <EditableText
                key={i}
                textKey={`${quoteKey}-${i}`}
                fallback={line}
                as="p"
                multiline
                className="font-serif-d italic text-2xl sm:text-3xl md:text-4xl text-foreground/85"
              />
            ))}
          </div>
        )}
      </div>
    </SceneShell>
  );
}

/**
 * PhotosLayout: lays out up to 3 photos in a layered collage with optional caption overlay on the largest.
 */
function PhotosLayout({ photos, quoteLines }: { photos: ScenePhoto[]; quoteLines?: string[] }) {
  if (photos.length === 0) return null;

  // Pick the first photo as the "main" if there's a quote; otherwise the largest.
  const [main, ...rest] = photos;

  return (
    <div className="relative w-full max-w-xl mx-auto md:max-w-none">
      {/* Main photo */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative ${rest.length > 0 ? "mb-6 sm:mb-8" : ""}`}
      >
        <PhotoCard
          imageKey={main.key}
          src={main.src}
          alt={main.alt}
          rotate={main.rotate || 0}
          className="w-full"
          frameClassName="aspect-[4/5] sm:aspect-[4/5] md:aspect-[5/6] bg-pink-50/40"
          objectFit="cover"
          overlay={quoteLines && quoteLines.length > 0 ? buildQuoteOverlay(quoteLines) : undefined}
        />
      </motion.div>

      {/* Rest photos: positioned around the main */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {rest.slice(0, 2).map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20, rotate: i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -3 : 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i === 1 ? "mt-6 sm:mt-8 md:mt-12" : ""}
            >
              <PhotoCard
                imageKey={p.key}
                src={p.src}
                alt={p.alt}
                rotate={p.rotate ?? (i === 0 ? -2 : 2)}
                className="w-full"
                frameClassName="aspect-[4/3] bg-pink-50/40"
                objectFit="cover"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
