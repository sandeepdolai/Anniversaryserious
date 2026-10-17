"use client";

import { SceneShell } from "../SceneShell";
import { EditableText } from "../EditableText";
import { Editable3DObject } from "../Editable3DObject";
import { ASSET, type Photo } from "@/lib/wedding-data";
import { PhotoCard } from "../PhotoCard";
import { motion } from "framer-motion";

type Props = {
  sceneId: string;
  bg?: string;
  petals?: boolean;
  petalCount?: number;
  // the main photo (sepia couple embracing)
  photo: Photo & { key: string };
  // the 3D object (vintage car)
  objectKey: string;
  objectSrc: string;
  objectAlt: string;
  // text content
  day: string;
  time: string;
  place: string;
  city: string;
  // editable keys for text
  keys: {
    day: string;
    time: string;
    place: string;
    city: string;
  };
  // optional extra floating hearts objects
  extras?: React.ReactNode;
};

export function DateLocationScene({
  sceneId,
  bg = "wedding-bg",
  petals = true,
  petalCount = 18,
  photo,
  objectKey,
  objectSrc,
  objectAlt,
  day,
  time,
  place,
  city,
  keys,
  extras,
}: Props) {
  return (
    <SceneShell
      sceneId={sceneId}
      bg={bg}
      petals={petals}
      petalCount={petalCount}
      className="min-h-[100svh] flex items-center py-16 sm:py-20"
      contentClassName="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      {/* Left side: photo + text */}
      <div className="relative flex flex-col gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhotoCard
            imageKey={photo.key}
            src={photo.src}
            alt={photo.alt}
            rotate={-2}
            className="w-full max-w-md mx-auto md:mx-0"
            frameClassName="aspect-[4/5] bg-pink-50/40"
            objectFit="cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center md:text-left"
        >
          <EditableText
            textKey={keys.day}
            fallback={day}
            as="p"
            className="font-script text-4xl sm:text-5xl md:text-6xl text-foreground"
          />
          <div className="my-3 sm:my-4 flex items-center justify-center md:justify-start gap-3">
            <span className="h-px w-10 bg-pink-300/70" />
            <EditableText
              textKey={keys.time}
              fallback={time}
              as="span"
              className="font-cormorant text-base sm:text-lg tracking-[0.2em] uppercase text-foreground/70"
            />
            <span className="h-px w-10 bg-pink-300/70" />
          </div>
          <EditableText
            textKey={keys.place}
            fallback={place}
            as="p"
            className="font-serif-d text-xl sm:text-2xl md:text-3xl text-foreground/85"
          />
          <EditableText
            textKey={keys.city}
            fallback={city}
            as="p"
            className="font-cormorant text-sm sm:text-base tracking-[0.2em] uppercase text-foreground/60 mt-1"
          />
          {/* Small pink heart icon */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center md:justify-start">
            <svg width="22" height="20" viewBox="0 0 24 24" fill="#f472b6" aria-hidden>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Right side: 3D vintage car with floating balloons */}
      <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[520px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Editable3DObject
            objectKey={objectKey}
            src={objectSrc}
            alt={objectAlt}
            className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[80%] max-w-[520px] anim-float"
            imgClassName="w-full h-auto drop-shadow-2xl"
            rotate={-6}
          />
          {/* Floating balloons attached to car */}
          <Editable3DObject
            objectKey={`${objectKey}-balloon-1`}
            src={ASSET.objects("obj-balloons-cluster.png")}
            alt="Floating balloons"
            className="absolute left-[8%] top-4 w-20 sm:w-28 md:w-36 anim-float-slow"
            imgClassName="w-full h-auto drop-shadow-xl"
          />
          <Editable3DObject
            objectKey={`${objectKey}-balloon-2`}
            src={ASSET.objects("obj-balloons-cluster.png")}
            alt="Floating balloons"
            className="absolute right-[6%] top-12 w-16 sm:w-24 md:w-32 anim-float-2"
            imgClassName="w-full h-auto drop-shadow-xl"
          />
          {/* Scattered pink hearts */}
          <Editable3DObject
            objectKey={`${objectKey}-heart-1`}
            src={ASSET.objects("obj-pink-heart.png")}
            alt="Pink heart"
            className="absolute right-[10%] top-[40%] w-10 sm:w-14 md:w-16 anim-float-2"
            imgClassName="w-full h-auto drop-shadow-xl"
          />
          {extras}
        </motion.div>
      </div>
    </SceneShell>
  );
}
