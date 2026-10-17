"use client";

import { SceneShell } from "../SceneShell";
import { EditableText } from "../EditableText";
import { GoldRings } from "../three/GoldRings";
import { motion } from "framer-motion";

export function ClosingScene() {
  return (
    <SceneShell
      sceneId="closing"
      bg="wedding-bg-dark"
      className="min-h-[100svh] flex items-center justify-center py-16 sm:py-20"
      contentClassName="text-center"
    >
      <div className="relative w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <EditableText
            textKey="closing-pre"
            fallback="— save the date —"
            as="p"
            className="font-cormorant text-sm sm:text-base tracking-[0.4em] uppercase text-white/70"
          />
          <div className="my-6 sm:my-8 mx-auto w-24 sm:w-32 h-px bg-white/30" />
          <EditableText
            textKey="closing-title"
            fallback="We Are Getting Married"
            as="h2"
            className="font-serif-d text-3xl sm:text-5xl md:text-6xl text-white drop-shadow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="my-8 sm:my-10 md:my-12 mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl h-56 sm:h-72 md:h-80"
        >
          <GoldRings className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-white/85">
            <EditableText
              textKey="closing-date"
              fallback="20 February 2021"
              as="span"
              className="font-script text-2xl sm:text-3xl"
            />
            <span className="hidden sm:inline-block text-white/40">·</span>
            <EditableText
              textKey="closing-place"
              fallback="Boston College Club, Boston MA"
              as="span"
              className="font-cormorant text-base sm:text-lg tracking-[0.2em] uppercase"
            />
          </div>
          <div className="mt-6 sm:mt-8 mx-auto max-w-md text-white/60">
            <EditableText
              textKey="closing-tagline"
              fallback="We can't wait to celebrate with you."
              as="p"
              multiline
              className="font-serif-d italic text-sm sm:text-base"
            />
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
