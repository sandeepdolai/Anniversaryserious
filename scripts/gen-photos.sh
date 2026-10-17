#!/usr/bin/env bash
# Wedding photo generation script (Task 4a)
# Runs z-ai image generation sequentially with retries.

set -u
PHOTO_DIR="/home/z/my-project/public/images/photos"
LOG_FILE="/home/z/my-project/scripts/photo-gen.log"
mkdir -p "$PHOTO_DIR"
: > "$LOG_FILE"

# Format: filename|size|prompt
PHOTOS=(
"photo-dancing-overhead.jpg|1024x1024|Overhead aerial photo of a bride in white wedding gown and groom in black tuxedo dancing together on a circular patterned mosaic floor, romantic soft natural light, top-down view, professional wedding photography, warm tones"
"photo-snowy-embrace.jpg|1344x768|Romantic photo of a bride in white dress and groom in black coat embracing in a snowy rocky mountain landscape, soft overcast light, winter wedding photography"
"photo-forest-backlit.jpg|1344x768|Silhouette photo of a bride and groom standing in a misty forest backlit by warm golden sunlight, dreamy atmosphere, professional photography"
"photo-bride-portrait.jpg|768x1344|Portrait of a smiling bride wearing a long white veil holding a bouquet of white and pink roses, soft natural window light, elegant wedding photography"
"photo-colorful-bouquet.jpg|1024x1024|Close-up photo of a colorful wedding bouquet with yellow purple and pink flowers, soft natural light, professional photography"
"photo-ring-on-finger.jpg|1344x768|Close-up photo of a groom's hand placing a diamond wedding ring on a bride's finger, soft natural light, hands in focus, romantic wedding photography"
"photo-table-setting.jpg|1344x768|Elegant wedding reception table setting with white plates crystal wine glasses and a red cocktail, soft candlelight, professional photography, top-down view"
"photo-rings-dark.jpg|1024x1024|Macro photo of two gold wedding rings resting on a dark textured surface, soft moody lighting, professional jewelry photography"
"photo-bow-tie.jpg|768x1344|Close-up photo of a groom in a white shirt adjusting his black bow tie in front of a mirror, soft window light, professional wedding photography"
"photo-candles-petals.jpg|1344x768|Romantic photo of floating candles on a bed of purple flower petals in water, warm candlelight, dark moody atmosphere, professional wedding photography"
"photo-couple-on-grass.jpg|1344x768|Photo of a bride in white dress and groom in suit sitting together on green grass in a park, soft afternoon light, candid wedding photography"
"photo-bride-bw-window.jpg|768x1344|Black and white photo of a bride in a lace wedding dress standing by a window with sheer curtains holding a bouquet, soft natural light, fine-art wedding photography"
"photo-cooking-kitchen.jpg|1344x768|Candid photo of a young couple cooking together in a modern kitchen, the woman in a dress holding a wine glass and the man stirring a frying pan, warm cozy light, lifestyle photography"
"photo-yellow-roses-rings.jpg|1024x1024|Close-up photo of yellow roses with two gold wedding rings resting on the petals, soft natural light, professional photography"
"photo-ring-box-woven.jpg|1024x1024|Close-up photo of an open white ring box containing a diamond engagement ring on a woven mat surface, soft natural light, professional photography"
"photo-eiffel-kiss.jpg|768x1344|Romantic photo of a groom dipping his bride for a kiss outdoors with the Eiffel Tower visible in the background, golden hour light, professional wedding photography"
"photo-couple-laughing.jpg|1024x1024|Candid close-up photo of a bride and groom laughing and looking at each other, soft natural light, joyful wedding photography"
"photo-walking-hands.jpg|1344x768|Photo from the waist down of a bride in a white dress and groom in a suit holding hands while walking, soft natural light, wedding photography"
"photo-beach-walking.jpg|1344x768|Photo of a bride and groom holding hands walking on a sandy beach at sunset, romantic silhouette, professional wedding photography"
"photo-dj-turntable.jpg|1024x1024|Close-up photo of a DJ's hand on a turntable mixer with blue ambient lighting, professional event photography"
"photo-hands-bouquet.jpg|1344x768|Close-up photo of a bride and groom's hands stacked together on top of a bouquet of orange roses and white baby's breath, soft natural light, wedding photography"
"photo-jewelry-heart.jpg|1024x1024|Overhead photo of gold necklaces and earrings arranged on a purple velvet surface to form a heart shape, professional jewelry photography"
"photo-couple-white-suits.jpg|1344x768|Photo of a couple holding hands, the woman in a white dress and the man in a white suit, soft natural light, wedding photography, waist down"
"photo-banquet-hall.jpg|1344x768|Wide photo of an elegant banquet hall with round tables set for a wedding reception, warm chandelier light, professional event photography"
"photo-aerial-garden.jpg|1344x768|Aerial drone photo of a lush green garden with trees and a small building, sunny day, professional photography"
"photo-church-ceremony.jpg|1344x768|Wide photo inside a historic church showing a bride in a white gown and groom in a black suit walking down the aisle with a priest, soft stained-glass light, professional wedding photography"
"photo-sepia-embrace.jpg|1344x768|Sepia-toned romantic photo of a bride and groom embracing outdoors near a stone column building, vintage wedding photography"
"photo-planner-clipboard.jpg|768x1344|Photo of a woman with glasses holding a clipboard in a bright bridal shop, professional wedding planning photography"
"photo-bride-veil-detail.jpg|1024x1024|Close-up photo of a bride's lace veil and wedding dress detail with soft natural light, fine-art wedding photography"
"photo-couple-backlit-intimate.jpg|1024x1024|Intimate backlit photo of a bride and groom standing close together in soft golden hour light, professional wedding photography"
"photo-hands-waist-wine.jpg|1024x1024|Close-up photo of a hand resting on a partner's waist near a glass of red wine, soft candlelight, intimate wedding photography"
"photo-bride-groom-field.jpg|1344x768|Wide photo of a bride and groom standing together in a green field at golden hour, romantic wedding photography"
"photo-rings-on-doors.jpg|1344x768|Close-up photo of three wedding rings resting on three colorful painted wooden doors green teal and orange, professional wedding photography"
"photo-buttoning-shirt.jpg|1024x1024|Close-up photo of hands buttoning a white dress shirt, soft natural light, wedding morning photography"
)

# A simplified prompt fallback table (shorter prompts in case the API errors)
SIMPLE_PROMPTS=(
"photo-dancing-overhead.jpg|1024x1024|Overhead photo of bride and groom dancing on mosaic floor"
"photo-snowy-embrace.jpg|1344x768|Bride and groom embracing in snowy mountains"
"photo-forest-backlit.jpg|1344x768|Silhouette of bride and groom in misty forest at golden hour"
"photo-bride-portrait.jpg|768x1344|Portrait of bride with veil and rose bouquet"
"photo-colorful-bouquet.jpg|1024x1024|Colorful wedding bouquet with yellow purple pink flowers"
"photo-ring-on-finger.jpg|1344x768|Groom placing diamond ring on bride finger"
"photo-table-setting.jpg|1344x768|Wedding reception table setting with plates and wine glasses"
"photo-rings-dark.jpg|1024x1024|Two gold wedding rings on dark surface"
"photo-bow-tie.jpg|768x1344|Groom adjusting black bow tie in mirror"
"photo-candles-petals.jpg|1344x768|Floating candles on purple flower petals in water"
"photo-couple-on-grass.jpg|1344x768|Bride and groom sitting on grass in park"
"photo-bride-bw-window.jpg|768x1344|Black and white bride in lace dress by window"
"photo-cooking-kitchen.jpg|1344x768|Young couple cooking together in modern kitchen"
"photo-yellow-roses-rings.jpg|1024x1024|Yellow roses with two gold wedding rings on petals"
"photo-ring-box-woven.jpg|1024x1024|Open white ring box with diamond engagement ring"
"photo-eiffel-kiss.jpg|768x1344|Groom dipping bride for kiss with Eiffel Tower background"
"photo-couple-laughing.jpg|1024x1024|Bride and groom laughing together"
"photo-walking-hands.jpg|1344x768|Bride and groom holding hands walking waist down"
"photo-beach-walking.jpg|1344x768|Bride and groom walking on beach at sunset"
"photo-dj-turntable.jpg|1024x1024|DJ hand on turntable mixer with blue lighting"
"photo-hands-bouquet.jpg|1344x768|Bride and groom hands on orange rose bouquet"
"photo-jewelry-heart.jpg|1024x1024|Gold necklaces and earrings arranged in heart shape"
"photo-couple-white-suits.jpg|1344x768|Couple in white dress and white suit holding hands"
"photo-banquet-hall.jpg|1344x768|Elegant banquet hall with round tables for reception"
"photo-aerial-garden.jpg|1344x768|Aerial photo of lush green garden with trees"
"photo-church-ceremony.jpg|1344x768|Bride and groom walking down aisle in historic church"
"photo-sepia-embrace.jpg|1344x768|Sepia photo of bride and groom embracing outdoors"
"photo-planner-clipboard.jpg|768x1344|Woman with glasses holding clipboard in bridal shop"
"photo-bride-veil-detail.jpg|1024x1024|Close-up of bride lace veil and dress detail"
"photo-couple-backlit-intimate.jpg|1024x1024|Backlit bride and groom in golden hour light"
"photo-hands-waist-wine.jpg|1024x1024|Hand on partner waist near glass of red wine"
"photo-bride-groom-field.jpg|1344x768|Bride and groom standing in green field at golden hour"
"photo-rings-on-doors.jpg|1344x768|Three wedding rings on colorful painted wooden doors"
"photo-buttoning-shirt.jpg|1024x1024|Hands buttoning white dress shirt"
)

# Build lookup map for simple prompts
declare -A SIMPLE_MAP
for entry in "${SIMPLE_PROMPTS[@]}"; do
  IFS='|' read -r fn sz pr <<< "$entry"
  SIMPLE_MAP["$fn"]="$sz|$pr"
done

gen_one() {
  local fname="$1"
  local size="$2"
  local prompt="$3"
  local out_path="$PHOTO_DIR/$fname"
  # Skip if already exists with non-zero size
  if [[ -f "$out_path" && $(stat -c%s "$out_path" 2>/dev/null || echo 0) -gt 1000 ]]; then
    echo "[SKIP] $fname already exists ($(stat -c%s "$out_path") bytes)" | tee -a "$LOG_FILE"
    return 0
  fi
  echo "[GEN] $fname ($size) prompt: ${prompt:0:60}..." | tee -a "$LOG_FILE"
  z-ai image -p "$prompt" -o "$out_path" -s "$size" >>"$LOG_FILE" 2>&1
  local rc=$?
  if [[ $rc -ne 0 || ! -f "$out_path" || $(stat -c%s "$out_path" 2>/dev/null || echo 0) -lt 1000 ]]; then
    echo "[RETRY] $fname failed (rc=$rc), trying simplified prompt" | tee -a "$LOG_FILE"
    local simple="${SIMPLE_MAP[$fname]}"
    IFS='|' read -r ssz spr <<< "$simple"
    # remove the broken file
    rm -f "$out_path"
    sleep 2
    z-ai image -p "$spr" -o "$out_path" -s "$ssz" >>"$LOG_FILE" 2>&1
    local rc2=$?
    if [[ $rc2 -ne 0 || ! -f "$out_path" || $(stat -c%s "$out_path" 2>/dev/null || echo 0) -lt 1000 ]]; then
      echo "[FAIL] $fname could not be generated (rc=$rc2)" | tee -a "$LOG_FILE"
      return 1
    fi
    echo "[OK2] $fname ($(stat -c%s "$out_path") bytes)" | tee -a "$LOG_FILE"
    return 0
  fi
  echo "[OK] $fname ($(stat -c%s "$out_path") bytes)" | tee -a "$LOG_FILE"
  return 0
}

idx=0
total=${#PHOTOS[@]}
for entry in "${PHOTOS[@]}"; do
  idx=$((idx+1))
  IFS='|' read -r fname size prompt <<< "$entry"
  echo "===== [$idx/$total] $fname =====" | tee -a "$LOG_FILE"
  gen_one "$fname" "$size" "$prompt"
  sleep 1
done

echo "===== SUMMARY =====" | tee -a "$LOG_FILE"
ok=0
fail=0
for entry in "${PHOTOS[@]}"; do
  IFS='|' read -r fname _ _ <<< "$entry"
  p="$PHOTO_DIR/$fname"
  if [[ -f "$p" && $(stat -c%s "$p" 2>/dev/null || echo 0) -gt 1000 ]]; then
    ok=$((ok+1))
  else
    fail=$((fail+1))
  fi
done
echo "OK=$ok FAIL=$fail" | tee -a "$LOG_FILE"
