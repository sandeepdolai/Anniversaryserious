"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Petals } from "./Petals";

type Props = {
  children: ReactNode;
  bg?: string;       // tailwind class for background (uses wedding-bg-* classes)
  sceneId: string;    // for scroll target / progress dots
  className?: string;
  contentClassName?: string;
  // whether to render the petals layer inside the scene
  petals?: boolean;
  petalCount?: number;
};

export function SceneShell({
  children,
  bg = "wedding-bg",
  sceneId,
  className = "",
  contentClassName = "",
  petals = false,
  petalCount = 18,
}: Props) {
  return (
    <section
      id={sceneId}
      data-scene={sceneId}
      className={`relative w-full ${bg} ${className}`}
    >
      {petals && <Petals count={petalCount} />}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 ${contentClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
