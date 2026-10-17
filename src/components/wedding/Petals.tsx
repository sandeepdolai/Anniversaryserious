"use client";

import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
  // color variants
  colors?: string[];
};

const DEFAULT_COLORS = [
  "linear-gradient(140deg, #ffd1e0 0%, #ff9ec1 100%)",
  "linear-gradient(140deg, #fde2ec 0%, #f7b6cf 100%)",
  "linear-gradient(140deg, #ffeaf1 0%, #ffc8d8 100%)",
  "linear-gradient(140deg, #f9c8dd 0%, #f383a8 100%)",
];

export function Petals({ count = 22, className = "", colors = DEFAULT_COLORS }: Props) {
  // Build a stable list once per render w/ the given count.
  const colorsKey = colors.join(",");
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = Math.random() * 100; // vw
      const size = 8 + Math.random() * 14;
      const duration = 8 + Math.random() * 10;
      const delay = -Math.random() * duration;
      const drift = (Math.random() - 0.5) * 200;
      const color = colors[i % colors.length];
      const opacity = 0.55 + Math.random() * 0.35;
      return { id: i, left, size, duration, delay, drift, color, opacity };
    });
  }, [count, colorsKey]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.color,
            opacity: p.opacity,
            // @ts-ignore CSS custom prop
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
