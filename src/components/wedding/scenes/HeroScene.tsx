"use client";

import { SceneShell } from "../SceneShell";
import { EditableText } from "../EditableText";
import { Editable3DObject } from "../Editable3DObject";
import { Petals } from "../Petals";
import { ASSET } from "@/lib/wedding-data";
import { motion } from "framer-motion";

export function HeroScene() {
  return (
    <SceneShell sceneId="hero" bg="wedding-bg" petals petalCount={26} className="min-h-[100svh] flex items-center justify-center py-16 sm:py-24">
      <div className="relative w-full flex flex-col items-center text-center">
        {/* Soft glow behind text */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[640px] h-[60vw] max-h-[640px] rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute left-[20%] top-[30%] w-40 h-40 rounded-full bg-blue-200/30 blur-3xl" />
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="px-4"
        >
          <EditableText
            textKey="hero-title"
            fallback="There is only one happiness in life"
            as="h1"
            className="font-serif-d italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-700 leading-tight tracking-tight text-foreground/90"
          />
          <div className="mt-6 sm:mt-8">
            <EditableText
              textKey="hero-subtitle"
              fallback="to love and be loved"
              as="p"
              className="font-cormorant text-xl sm:text-2xl md:text-3xl tracking-[0.2em] uppercase text-foreground/60"
            />
          </div>
        </motion.div>

        {/* 3D petals cluster below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 sm:mt-16 w-full max-w-2xl"
        >
          <div className="relative h-40 sm:h-64 md:h-72">
            {/* Five petals scattered, animated. Smaller and fewer visual on mobile */}
            <Editable3DObject
              objectKey="hero-petal-1"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink paper flower petals cluster"
              className="absolute left-[5%] top-[10%] w-20 sm:w-32 md:w-40 anim-float"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="hero-petal-2"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink paper flower petals cluster"
              className="absolute left-[35%] top-[45%] w-16 sm:w-28 md:w-36 anim-float-2"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="hero-petal-3"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink paper flower petals cluster"
              className="absolute left-[55%] top-[5%] w-24 sm:w-40 md:w-48 anim-float-slow"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="hero-petal-4"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink paper flower petals cluster"
              className="absolute right-[5%] top-[55%] w-14 sm:w-24 md:w-28 anim-float"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="hero-petal-5"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink paper flower petals cluster"
              className="absolute left-[45%] top-[75%] w-12 sm:w-20 md:w-24 anim-float-2 hidden sm:block"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
          </div>
        </motion.div>

        {/* Small scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-foreground/40"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
