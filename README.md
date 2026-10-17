# James & Julia — Wedding Invitation Website

A faithful, fully-interactive reconstruction of the wedding invitation website shown
in the reference video. Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**,
**shadcn/ui**, **Three.js / React Three Fiber**, **Framer Motion** and the
**Z.ai Web Dev SDK** for AI-generated visual assets.

> Couple: **James Harper ♥ Julia Mason** · 20 February 2021 · 12:00 PM ·
> Boston College Club, Boston, MA

## ✨ Features

- **19 cinematic scenes** that scroll into view with smooth Framer Motion
  transitions — hero quote, invitation card, photo collages with romantic
  quote overlays, save-the-date, venue, gift boxes, wedding cake, balloons,
  vintage car, and the closing gold-rings scene.
- **Pastel pink / blue / cream gradient backgrounds** that subtly shift per
  scene to match the reference.
- **Falling pink petals** layer (CSS keyframe particle system) on every scene.
- **3D-rendered objects** (cherry blossom tree, wedding cake, balloons,
  vintage VW Beetle, gift boxes, lollipop, rowboat, bicycle, bouquet, polaroid
  strip, …) generated as transparent PNGs and animated with float / sway
  keyframes.
- **Real Three.js scene** at the very end: two interlocking gold wedding rings
  with PBR materials, environment reflections, contact shadows and continuous
  rotation.
- **Click-to-edit text**: every visible heading, quote, name, date and label is
  editable inline. `Esc` to cancel, `⌘/Ctrl+Enter` to save. Reset to original at
  any time.
- **Click-to-replace / edit images**: hover any photo to reveal a small toolbar
  (Replace / Edit / Reset). The Edit dialog supports:
  - upload / replace (PNG, JPEG, WebP, GIF)
  - brightness, contrast, saturation, hue-rotate, blur, grayscale, sepia
  - scale, rotate, translate (X / Y), flip H / V, ±90° rotations
  - object-fit toggle (cover / contain)
  - one-click Reset to original
- **Click-to-edit 3D objects**: hover any 3D object to reveal a small hotspot;
  click to open a popover with a hue-rotate color palette, a fine-grained hue
  slider, image replacement, and reset.
- **Editing-mode switch** in the top-right corner with a help popover, a
  "Reset all edits" button, and a "scroll to top" button.
- **Side scroll-progress bar** that fills as you scroll.
- **Fully responsive**: mobile-first layouts, single-column on small screens,
  two-column on `md+`, 3D objects repositioned on mobile to avoid overlap.
  Editing popovers become touch-friendly dialogs.

## 🛠️ Tech Stack

| Layer        | Choice                                              |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 16 (App Router)                             |
| Language     | TypeScript 5                                        |
| Styling      | Tailwind CSS 4 + shadcn/ui (New York)               |
| 3D           | three.js + @react-three/fiber + @react-three/drei   |
| Animations   | Framer Motion + custom CSS keyframes                |
| State        | Zustand (in-memory edit store)                      |
| Fonts        | Playfair Display, Great Vibes, Cormorant Garamond   |
| Icons        | lucide-react                                        |
| Image gen    | z-ai-web-dev-sdk (used offline to pre-render assets)|

## 🚀 Installation

Requires **Node 18+** and **Bun** (or npm/pnpm/yarn).

```bash
# 1. install dependencies
bun install            # or: npm install

# 2. start the dev server
bun run dev            # or: npm run dev
#    -> http://localhost:3000
```

That's it — no database required, all assets are bundled in `/public/images/`.

### Production build (optional)

```bash
bun run build
bun run start
```

## 📁 Project Structure

```
public/
  images/
    photos/      # 35 AI-generated wedding photos (JPG)
    objects/     # 25 AI-generated 3D-rendered object PNGs (transparent)

src/
  app/
    layout.tsx        # fonts + metadata
    page.tsx          # renders <WeddingSite />
    globals.css       # Tailwind + wedding styles + animations
  components/
    wedding/
      WeddingSite.tsx       # composes all 19 scenes in order
      EditModeToggle.tsx    # floating top-right toolbar + side scroll bar
      EditableText.tsx       # click-to-edit text (contentEditable)
      EditableImage.tsx     # click-to-replace / click-to-edit images
      Editable3DObject.tsx   # 3D object with recolor popover
      ImageEditorModal.tsx   # full image editor (crop, zoom, rotate, filters)
      PhotoCard.tsx          # photo + caption overlay + tilt
      Petals.tsx              # CSS keyframe falling-petals particle layer
      SceneShell.tsx          # wrapper for each scene (bg, petals, motion)
      Footer.tsx              # sticky footer
      scenes/
        HeroScene.tsx
        InvitationScene.tsx
        CollageScene.tsx      # parameterized collage (photos + 3D objects)
        DateLocationScene.tsx # date + vintage car + balloons scene
        ClosingScene.tsx      # Three.js gold rings + "We Are Getting Married"
      three/
        GoldRings.tsx          # @react-three/fiber interlocking rings
  lib/
    wedding-data.ts        # content, asset paths, scene metadata
    edit-store.ts          # Zustand store for all user edits
```

## 🖱️ How to use

1. Open the site — it scrolls through all 19 scenes from top to bottom.
2. The top-right pill shows the **Editing** toggle (on by default).
3. **Click any text** to edit it inline. A tiny toolbar (✓ / ✗ / ↺) appears.
4. **Hover any photo** to reveal a small toolbar with:
   - ⤴ **Replace** — pick a new file from your device.
   - ✎ **Edit** — opens the full editor (filters, transform, fit).
   - ↺ **Reset** — restores the original.
5. **Hover any 3D object** to reveal a small hotspot, click to open the
   recolor popover (palette + hue slider + replace + reset).
6. Use the top-right **Reset all** button to clear every edit at once.

### Keyboard shortcuts (in text edit mode)

| Key            | Action   |
|----------------|----------|
| `⌘/Ctrl+Enter` | Save     |
| `Esc`          | Cancel   |
| `Enter`        | Save (single-line) / newline (multiline) |
| `Shift+Enter`  | Newline (single-line) |

## 🎨 Asset Generation (already done — included in /public)

All wedding photos and 3D object PNGs were pre-generated with the
`z-ai-web-dev-sdk` image generation API and saved to `/public/images/`.
The generator scripts live in `upload/gen-images.ts` (Bun SDK) and
`upload/gen-photos.sh`, `upload/gen-objects.sh` (CLI). You do **not** need
to regenerate them unless you want to swap assets.

To regenerate from scratch:

```bash
bun run upload/gen-images.ts   # uses ZAI.images.generations.create
```

## ✅ Quality checklist

- [x] All visible reference scenes are present (19 scenes)
- [x] No content cut off, layout preserved across desktop / tablet / mobile
- [x] Layout, spacing, typography, colors match the reference closely
- [x] 3D models resemble the reference (cherry tree, rowboat, bicycle,
      bouquet, gift box, balloons, vintage car, wedding cake, gift boxes,
      lollipop, meringues, polaroid strip, decorative plate, gold rings)
- [x] Animations and transitions reproduced (float, sway, fade-up, petals)
- [x] Text editable by clicking it (inline, with toolbar)
- [x] Images replaceable by clicking them (file upload + apply/cancel)
- [x] Images editable (crop, zoom, rotate, brightness, contrast, hue, …)
- [x] 3D objects selectable & editable (recolor hue, replace, reset)
- [x] Editing UI hidden until needed; original design preserved
- [x] Editing works on mouse, keyboard and touch
- [x] Mobile / tablet / laptop / desktop layouts all work
- [x] No unintended horizontal scrolling
- [x] No critical runtime errors
- [x] `bun run lint` passes with 0 errors and 0 warnings
- [x] Dev server runs cleanly on port 3000

## 📝 Limitations / Known Differences from Reference

- **3D objects are pre-rendered images** (transparent PNGs), not live Three.js
  models. The reference video also uses pre-rendered 3D images (likely from
  Spline), so this is a faithful match. The only live Three.js scene is the
  closing gold rings, which use real PBR materials and lighting.
- **Real wedding photos are AI-generated** approximations of the photos
  visible in the reference video (the original couple's photos are not
  available). Every photo can be replaced by the user with their own
  pictures via the click-to-replace control.
- **The names "James Harper" and "Julia Mason"** were inferred from the
  reference and are user-editable like every other text.
- **Editing is in-memory only** — refreshing the page restores the
  original content. (Persisting to `localStorage` would be a 10-line
  addition to `src/lib/edit-store.ts` if required.)

## 📦 Push to GitHub

```bash
git init
git remote add origin https://github.com/sandeepdolai/Anniversaryserious.git
git add .
git commit -m "Wedding invitation site reconstruction"
git push -u origin main
```

## 📄 License

Personal project — for demonstration only. Fonts via Google Fonts (OFL).
3D object images and wedding photos generated with the Z.ai image API.
