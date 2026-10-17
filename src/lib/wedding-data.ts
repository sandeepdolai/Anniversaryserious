// Wedding content + scene definitions used across the site.
// All text & images here can be edited at runtime via the EditableText /
// EditableImage / Editable3DObject components.

export type Photo = {
  id: string;
  src: string;
  alt: string;
  // optional caption overlay
  caption?: string;
  // optional tilt in degrees for the collage look
  rotate?: number;
  // aspect ratio hint (width/height) used by the layout
  aspect?: "portrait" | "landscape" | "square" | "wide";
};

export type Object3D = {
  id: string;
  src: string;
  alt: string;
  // position classes within the scene, e.g. "left-4 bottom-8"
  className?: string;
  // animation class: anim-float / anim-float-2 / anim-sway
  anim?: string;
  // base rotation in degrees (used by CSS var --rot)
  rotate?: number;
  // size hint
  size?: "sm" | "md" | "lg" | "xl";
  // optional hue filter (CSS filter string) for recolorable objects
  hueFilter?: string;
};

// Default fonts - all overridable on the page via EditableText
export const WEDDING = {
  hero: {
    title: "There is only one happiness in life",
    subtitle: "to love and be loved",
  },
  invite: {
    name1: "James Harper",
    name2: "Julia Mason",
    symbol: "♥",
    line: "Life never meant this much until I found you",
  },
  date: {
    day: "20 February 2021",
    time: "At 12:00 in the afternoon",
    place: "Boston College Club",
    city: "Boston, MA",
  },
  closing: {
    title: "We Are Getting Married",
  },
  scenes: [
    {
      id: "sc-moment",
      quote: ["A moment", "to remember"],
    },
    {
      id: "sc-hold",
      quote: ["The best thing to hold onto in life", "is each other"],
    },
    {
      id: "sc-savedate",
      quote: ["Save the date", "20 February 2021"],
    },
    {
      id: "sc-time",
      quote: ["At 12:00 in the afternoon"],
    },
    {
      id: "sc-venue",
      quote: ["Boston College Club", "Boston, MA"],
    },
    {
      id: "sc-best",
      quote: ["You are the best thing", "that ever happened to me"],
    },
    {
      id: "sc-lovable",
      quote: ["If you would be loved,", "love and be lovable."],
    },
    {
      id: "sc-wish",
      quote: ["Wish us a happy life."],
    },
    {
      id: "sc-once",
      quote: ["Once upon a time"],
    },
    {
      id: "sc-sweet",
      quote: ["The Sweetness of sharing"],
    },
    {
      id: "sc-wonderful",
      quote: ["A Wonderful beginning"],
    },
    {
      id: "sc-hand",
      quote: ["Hand in hand together", "This love will be forever"],
    },
    {
      id: "sc-presence",
      quote: ["Your presence will be", "Extremely important for us"],
    },
  ],
};

// Asset paths — kept in one place so the EditableImage default fallback can
// detect "missing" generated assets and render a graceful placeholder.
export const ASSET = {
  photos: (name: string) => `/images/photos/${name}`,
  objects: (name: string) => `/images/objects/${name}`,
};

// Helper to know if a generated file is "ready" (used for placeholder fallback)
export const PHOTO_FILES = [
  "photo-dancing-overhead.jpg",
  "photo-snowy-embrace.jpg",
  "photo-forest-backlit.jpg",
  "photo-bride-portrait.jpg",
  "photo-colorful-bouquet.jpg",
  "photo-ring-on-finger.jpg",
  "photo-table-setting.jpg",
  "photo-rings-dark.jpg",
  "photo-bow-tie.jpg",
  "photo-candles-petals.jpg",
  "photo-couple-on-grass.jpg",
  "photo-bride-bw-window.jpg",
  "photo-cooking-kitchen.jpg",
  "photo-yellow-roses-rings.jpg",
  "photo-ring-box-woven.jpg",
  "photo-eiffel-kiss.jpg",
  "photo-couple-laughing.jpg",
  "photo-walking-hands.jpg",
  "photo-beach-walking.jpg",
  "photo-dj-turntable.jpg",
  "photo-hands-bouquet.jpg",
  "photo-jewelry-heart.jpg",
  "photo-couple-white-suits.jpg",
  "photo-banquet-hall.jpg",
  "photo-aerial-garden.jpg",
  "photo-church-ceremony.jpg",
  "photo-sepia-embrace.jpg",
  "photo-planner-clipboard.jpg",
  "photo-bride-veil-detail.jpg",
  "photo-couple-backlit-intimate.jpg",
  "photo-hands-waist-wine.jpg",
  "photo-bride-groom-field.jpg",
  "photo-rings-on-doors.jpg",
  "photo-buttoning-shirt.jpg",
  "photo-couple-dancing-veil.jpg",
];

export const OBJECT_FILES = [
  "obj-petals-cluster.png",
  "obj-cherry-blossom-branch.png",
  "obj-rowboat.png",
  "obj-bicycle-ribbons.png",
  "obj-bouquet-ribbons.png",
  "obj-gift-box-bow.png",
  "obj-pink-bow.png",
  "obj-balloons-cluster.png",
  "obj-vintage-car.png",
  "obj-wedding-cake.png",
  "obj-meringues.png",
  "obj-gift-boxes.png",
  "obj-lollipop.png",
  "obj-gold-rings.png",
  "obj-cherry-tree.png",
  "obj-cylindrical-containers.png",
  "obj-round-table-vase.png",
  "obj-polaroid-strip.png",
  "obj-pink-heart.png",
  "obj-pink-hearts-scattered.png",
  "obj-decorative-plate.png",
  "obj-boat-petals.png",
  "obj-pink-flowers.png",
  "obj-cake-meringues.png",
  "obj-invitation-card.png",
];
