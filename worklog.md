# Wedding Invitation Website Reconstruction - Worklog

## Project Overview
Reconstructing the wedding invitation website shown in the reference video at
`/home/z/my-project/upload/video_20261017_164911.mp4`.

The site is a cinematic, scroll-driven wedding invitation for **James Harper ♥ Julia Mason**
(20 February 2021, 12:00 PM, Boston College Club, Boston MA). The original is a
sequence of "scenes" where 3D-rendered objects (pink paper flowers, cherry blossom
branches, vintage car, wedding cake, balloons, gift boxes, rowboat, bicycle, etc.)
float around real wedding photographs with romantic quote overlays, all on a soft
pastel pink/blue/cream gradient background.

## Reconstruction Plan

### Tech stack
- Next.js 16 App Router + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Framer Motion for scene transitions, parallax, and floating animations
- Three.js / React Three Fiber for the closing gold-rings + floating petals particle system
- AI-generated images for the wedding photos and the 3D-rendered objects (transparent PNGs)
- click-to-edit text (contentEditable), click-to-replace/edit images (file upload + crop/zoom/rotate)

### Scenes (in order)
1. **Hero quote** — "There is only one happiness in life / to love and be loved" + 3D pink petals
2. **Invitation card** — "James Harper ♥ Julia Mason / Life never meant this much until I found you" + ornate pink border + 3D pink flowers
3. **Photo collage A** — cherry blossom tree + 3 photos (dancing, snowy embrace, forest backlit) + "A moment to remember"
4. **Photo collage B** — bicycle with pink ribbons + bride portrait + "The best thing to hold onto in life is each other"
5. **Photo collage C** — decorative plate + flowers + table-setting photos
6. **Save the date** — round table + vase + "Save the date / 20 February 2021"
7. **Time** — rowboat + "At 12:00 in the afternoon"
8. **Venue** — polaroid film strip + "Boston College Club / Boston, MA"
9. **Best thing** — cherry blossom branch sweeping across + "You are the best thing that ever happened to me"
10. **Proposal** — ring placement close-ups
11. **Bride B&W** — open gift box with pink bow + "If you would be loved, love and be lovable."
12. **Formal portrait** — bouquet with ribbons + "Wish us a happy life."
13. **Storybook** — large pink bow + "Once upon a time"
14. **Sweetness** — balloon cluster + Eiffel Tower kiss + "The Sweetness of sharing"
15. **Wonderful beginning** — lollipop/candy + beach walk + "A Wonderful beginning"
16. **Wedding cake** — multi-tier cake + "Hand in hand together / This love will be forever"
17. **Your presence** — gift boxes + church ceremony + "Your presence will be Extremely important for us"
18. **Date & location** — vintage car (VW Beetle) with balloons + "20 February 2021 / At 12:00 in the afternoon / Boston College Club"
19. **Closing** — two gold rings + "We Are Getting Married"

### Editing functionality
- All visible text is click-to-edit (contentEditable with toolbar: save / cancel / reset)
- All photo cards are click-to-replace (file upload) and click-to-edit (crop / zoom / rotate / brightness)
- 3D objects can be clicked to open a small popover (change color tone / reset / replace image)
- Editing UI is hidden until the user hovers/long-presses an element; original design is preserved

### Responsive behavior
- Mobile-first layouts using Tailwind breakpoints
- 3D object images scale down on mobile and reposition to avoid overlap
- Multi-photo collages stack vertically on small screens
- Editing popovers become bottom-sheet dialogs on touch devices

---
Task ID: 1
Agent: Main (Z.ai Code)
Task: Analyze reference video and produce reconstruction plan

Work Log:
- Probed the reference video (113s, 854x480, HEVC, 30fps) with ffprobe
- Extracted 38 frames at 1 frame / 3s into /home/z/my-project/upload/frames/
- Ran z-ai vision on the frames in 5 batches to get a full scene-by-scene description
- Compiled a 19-scene reconstruction plan above
- Decided to use AI-generated 3D-rendered PNGs for the complex 3D objects
  (more faithful than rough Three.js models for things like the vintage car,
  wedding cake, balloons, etc.) and to use real Three.js only for the floating
  petals particle system and the closing gold rings.

Stage Summary:
- Complete scene inventory and plan written above.
- Next: dispatch parallel sub-agents to generate the wedding photos and the
  3D-object PNGs, then build the page.

---
Task ID: 4a + 4b
Agent: Main (Z.ai Code)
Task: Generate all wedding photos + 3D object PNGs

Work Log:
- Wrote parallel image gen scripts (gen-photos.sh, gen-objects.sh) using z-ai image CLI
- Hit persistent rate limits (HTTP 429) and process-detection issues
- Switched to a Bun SDK-based generator (upload/gen-images.ts) with:
  * Sequential single-worker (concurrency=1) to avoid 429
  * 4s delay between successful calls
  * Exponential backoff (10s -> 20s -> 40s -> ... up to 640s) on failures
- Wrapped in upload/run-forever.sh which auto-restarts until all files exist
- Started the loop as a fully-detached background process (setsid + nohup)
- Confirmed first new image generated successfully (~80s for first API call)

Stage Summary:
- ~16 photos + 2 objects were already on disk before the new run.
- New run will produce the remaining ~19 photos + ~23 objects sequentially.
- Expected total time: ~25-40 minutes (rate-limited to ~1 image / 30-80s).

---
Task ID: 5-12 (combined)
Agent: Main (Z.ai Code)
Task: Build the full wedding invitation website, add editing, verify with Agent Browser

Work Log:
- Built component structure under src/components/wedding:
  - EditableText (click-to-edit, contentEditable, with toolbar)
  - EditableImage (click-to-replace + click-to-edit) + ImageEditorModal
    (brightness, contrast, saturation, hue, blur, grayscale, sepia, scale,
    rotate, translate X/Y, flip H/V, +/-90°, object-fit toggle)
  - Editable3DObject (recolor hue palette + slider + replace + reset)
  - Petals (CSS keyframe falling-petals particle layer)
  - PhotoCard, SceneShell, EditModeToggle, Footer
  - scenes/ HeroScene, InvitationScene, CollageScene, DateLocationScene,
    ClosingScene (with three/GoldRings.tsx using @react-three/fiber)
- Wired WeddingSite.tsx that composes 19 scenes in order matching the
  reference video (hero, invitation, 13 collage scenes, date+vintage-car,
  closing gold-rings)
- Added wedding styles + fonts (Playfair, Great Vibes, Cormorant) to
  globals.css and layout.tsx
- Added Zustand edit store (src/lib/edit-store.ts) and content data
  (src/lib/wedding-data.ts)
- Added README.md with full installation + usage instructions
- Updated .gitignore for /upload, /skills, /mini-services, log files
- All 60 images generated (35 photos + 25 3D objects) via upload/gen-images.ts

Verification:
- bun run lint: 0 errors, 0 warnings
- Dev server on :3000 compiles cleanly, no runtime errors
- Agent Browser verified:
  * Hero, Invitation, Collage, Date/Car and Closing scenes all render
  * Click-to-edit text works (James Harper -> John Smith -> Reset)
  * Image editor modal opens, transform tab works, +90° rotation applied
  * 3D object popover opens, recolor palette visible
  * Mobile 390x844 layout usable (invitation card + collage + 3D objects)
  * Closing scene shows real Three.js gold rings with "We Are Getting Married"

Stage Summary:
- Site is visually and functionally complete; matches the reference video
  scene-by-scene with all 19 sections, all images loaded, and full
  click-to-edit functionality for text, images, and 3D objects.
