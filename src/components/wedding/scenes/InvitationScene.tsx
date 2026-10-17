"use client";

import { SceneShell } from "../SceneShell";
import { EditableText } from "../EditableText";
import { Editable3DObject } from "../Editable3DObject";
import { Petals } from "../Petals";
import { ASSET } from "@/lib/wedding-data";
import { motion } from "framer-motion";

export function InvitationScene() {
  return (
    <SceneShell sceneId="invitation" bg="wedding-bg-soft" petals petalCount={20} className="min-h-[100svh] flex items-center justify-center py-16 sm:py-20">
      <div className="relative w-full flex items-center justify-center">
        {/* Background soft glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[760px] h-[80vw] max-h-[760px] rounded-full bg-pink-200/40 blur-3xl" />
        </div>

        {/* 3D pink flowers around the card */}
        <Editable3DObject
          objectKey="invite-flower-1"
          src={ASSET.objects("obj-pink-flowers.png")}
          alt="Pink paper flowers"
          className="absolute left-[2%] sm:left-[6%] top-[10%] w-24 sm:w-32 md:w-44 anim-float"
          imgClassName="w-full h-auto drop-shadow-2xl"
        />
        <Editable3DObject
          objectKey="invite-flower-2"
          src={ASSET.objects("obj-pink-flowers.png")}
          alt="Pink paper flowers"
          className="absolute right-[2%] sm:right-[6%] top-[18%] w-20 sm:w-28 md:w-40 anim-float-2"
          imgClassName="w-full h-auto drop-shadow-2xl"
        />
        <Editable3DObject
          objectKey="invite-flower-3"
          src={ASSET.objects("obj-pink-flowers.png")}
          alt="Pink paper flowers"
          className="absolute left-[6%] bottom-[6%] w-20 sm:w-28 md:w-36 anim-float-slow"
          imgClassName="w-full h-auto drop-shadow-2xl"
        />
        <Editable3DObject
          objectKey="invite-flower-4"
          src={ASSET.objects("obj-pink-flowers.png")}
          alt="Pink paper flowers"
          className="absolute right-[8%] bottom-[2%] w-24 sm:w-32 md:w-44 anim-float"
          imgClassName="w-full h-auto drop-shadow-2xl"
        />

        {/* The invitation card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-white rounded-md shadow-2xl"
        >
          {/* Ornate pink border with corner swirls */}
          <div className="relative p-8 sm:p-12 md:p-14">
            {/* Border frame */}
            <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-pink-300/80 rounded-md" />
            <div className="absolute inset-4 sm:inset-5 md:inset-6 border border-pink-300/40 rounded-md" />
            {/* Corner swirls */}
            <Swirl className="absolute top-2 left-2 w-8 h-8 text-pink-400" />
            <Swirl className="absolute top-2 right-2 w-8 h-8 text-pink-400 -scale-x-100" />
            <Swirl className="absolute bottom-2 left-2 w-8 h-8 text-pink-400 -scale-y-100" />
            <Swirl className="absolute bottom-2 right-2 w-8 h-8 text-pink-400 -scale-100" />

            <div className="relative text-center">
              <EditableText
                textKey="invite-pre"
                fallback="Together with their families"
                as="p"
                className="font-cormorant text-sm sm:text-base tracking-[0.25em] uppercase text-foreground/60"
              />
              <div className="my-6 sm:my-8 flex items-center justify-center gap-4 sm:gap-6">
                <span className="h-px w-10 sm:w-16 bg-pink-300/70" />
                <span className="text-pink-400 text-xs tracking-[0.3em] uppercase">·</span>
                <span className="h-px w-10 sm:w-16 bg-pink-300/70" />
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 flex-wrap">
                <EditableText
                  textKey="invite-name1"
                  fallback="James Harper"
                  as="span"
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-foreground"
                />
                <span className="text-pink-400 text-2xl sm:text-3xl">♥</span>
                <EditableText
                  textKey="invite-name2"
                  fallback="Julia Mason"
                  as="span"
                  className="font-script text-3xl sm:text-4xl md:text-5xl text-foreground"
                />
              </div>

              <div className="mt-6 sm:mt-8 mx-auto max-w-md">
                <EditableText
                  textKey="invite-line"
                  fallback="Life never meant this much until I found you"
                  as="p"
                  multiline
                  className="font-serif-d italic text-base sm:text-lg text-foreground/70"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}

function Swirl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M2 2 L2 12 M2 2 L12 2 M2 12 C 6 12, 12 8, 12 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="2" cy="2" r="1.2" fill="currentColor" />
    </svg>
  );
}
