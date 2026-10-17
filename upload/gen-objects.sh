#!/bin/bash
# 3D-rendered object PNG generator (with per-call timeout)
set -u
OUT=/home/z/my-project/public/images/objects
mkdir -p "$OUT"
LOG=/home/z/my-project/upload/obj-gen.log
: > "$LOG"

gen() {
  local file="$1"; local prompt="$2"; local size="${3:-1024x1024}"
  if [ -s "$OUT/$file" ]; then echo "SKIP $file (exists)"; return; fi
  echo "GEN $file ..."
  for attempt in 1 2 3; do
    if timeout 90 z-ai image -p "$prompt" -o "$OUT/$file" -s "$size" >>"$LOG" 2>&1; then
      if [ -s "$OUT/$file" ]; then
        echo "OK $file ($(stat -c%s "$OUT/$file") bytes)"
        return 0
      fi
    fi
    echo "  retry $attempt for $file (timeout/error)"
    rm -f "$OUT/$file"
    sleep 3
  done
  echo "FAIL $file"
  return 1
}

gen "obj-petals-cluster.png" "3D render of a small scattered cluster of soft pink paper flower petals, matte paper texture, gentle soft shadows, isolated on a pure white background, top-down 3D product render, high quality" 1024x1024
gen "obj-cherry-blossom-branch.png" "3D render of a single elegant cherry blossom branch with pink flowers, stylized cartoon style, soft pastel colors, isolated on pure white background, gentle soft drop shadow, high quality" 1344x768
gen "obj-rowboat.png" "3D render of a small wooden rowboat with a pink interior and light blue exterior, an oar resting inside, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1344x768
gen "obj-bicycle-ribbons.png" "3D render of a vintage bicycle with long flowing pink ribbons streaming from the handlebars, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-bouquet-ribbons.png" "3D render of an elegant wedding bouquet of pink white and pale blue stylized flowers with long flowing pink ribbons, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-gift-box-bow.png" "3D render of an open cream-colored gift box with a light blue interior, a large stylized pink ribbon bow on top, two gold wedding bands visible inside, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-pink-bow.png" "3D render of a large voluminous pink ribbon bow with long flowing tails, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-balloons-cluster.png" "3D render of a dense cluster of matte balloons in pastel pink peach cream and pale blue with subtle metallic silver balloons mixed in, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-vintage-car.png" "3D render of a vintage Volkswagen Beetle style car with a glossy pink body and cream white roof, two-tone color scheme, stylized cartoon style, three-quarter front view, isolated on pure white background, soft drop shadow, high quality" 1344x768
gen "obj-wedding-cake.png" "3D render of an elegant multi-tiered wedding cake, white and pale blue frosting, decorated with pink roses and small blue gem accents, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-meringues.png" "3D render of three small swirled meringue cookies with white and pale blue swirls, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-gift-boxes.png" "3D render of a scattered cluster of small square gift boxes wrapped in pastel pink and white paper with pink and light blue ribbons, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-lollipop.png" "3D render of a single elegant swirled pink and white lollipop candy with a small pink ribbon bow on the stick, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-gold-rings.png" "3D render of two gold wedding bands interlocking, polished shiny metallic gold material, soft studio lighting, isolated on pure black background, dramatic spotlight, high quality" 1024x1024
gen "obj-cherry-tree.png" "3D render of a small stylized cherry blossom tree with a brown trunk and dense pink blossoms, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-cylindrical-containers.png" "3D render of a small cluster of cylindrical containers and spools in pink and translucent white materials, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-round-table-vase.png" "3D render of a small round white table with a vase of pink paper flowers and a small blue ring on top, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-polaroid-strip.png" "3D render of a vertical strip of blank white polaroid photo frames tied with pink ribbons, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-pink-heart.png" "3D render of a small simple glossy pink heart shape, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-pink-hearts-scattered.png" "3D render of several small pink heart shapes scattered around, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-decorative-plate.png" "3D render of a round white decorative plate with painted pink flowers, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-boat-petals.png" "3D render of a small wooden rowboat with a pink interior floating on stylized blue water with pink paper petals drifting around, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1344x768
gen "obj-pink-flowers.png" "3D render of a cluster of pink paper flowers with green paper leaves, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 1024x1024
gen "obj-cake-meringues.png" "3D render of a multi-tiered wedding cake with pink roses and three small swirled meringues floating above, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" 768x1344
gen "obj-invitation-card.png" "3D render of an elegant white invitation card with an ornate thin pink border with decorative swirls in the corners, isolated on pure white background, soft drop shadow, high quality" 1024x1024

echo "DONE objects at $(date)"
ls -la "$OUT"
