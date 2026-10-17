"use client";

import { ReactNode } from "react";
import { EditableImage } from "./EditableImage";

type Props = {
  imageKey: string;
  src: string;
  alt: string;
  // tilt in degrees for the collage look
  rotate?: number;
  // sizes
  className?: string;          // outer wrapper (position + size)
  imgClassName?: string;        // img element classes
  frameClassName?: string;       // inner frame (around the img)
  objectFit?: "cover" | "contain";
  // optional overlay content (e.g. caption text + dark scrim)
  overlay?: ReactNode;
  // optional padding around the photo for the "polaroid" look
  padding?: boolean;
};

export function PhotoCard({
  imageKey,
  src,
  alt,
  rotate = 0,
  className = "",
  imgClassName = "",
  frameClassName = "",
  objectFit = "cover",
  overlay,
  padding = true,
}: Props) {
  return (
    <div
      className={`photo-card ${padding ? "p-2 sm:p-2.5 md:p-3" : ""} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className={`relative overflow-hidden rounded ${frameClassName}`}>
        <EditableImage
          imageKey={imageKey}
          src={src}
          alt={alt}
          imgClassName={imgClassName}
          objectFit={objectFit}
        />
        {overlay}
      </div>
    </div>
  );
}
