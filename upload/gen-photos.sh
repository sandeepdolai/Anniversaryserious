#!/bin/bash
# Wedding photo generator (with per-call timeout)
set -u
OUT=/home/z/my-project/public/images/photos
mkdir -p "$OUT"
LOG=/home/z/my-project/upload/photo-gen.log
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

gen "photo-dancing-overhead.jpg" "Overhead aerial photo of a bride in white wedding gown and groom in black tuxedo dancing together on a circular patterned mosaic floor, romantic soft natural light, top-down view, professional wedding photography, warm tones" 1024x1024
gen "photo-snowy-embrace.jpg" "Romantic photo of a bride in white dress and groom in black coat embracing in a snowy rocky mountain landscape, soft overcast light, winter wedding photography" 1344x768
gen "photo-forest-backlit.jpg" "Silhouette photo of a bride and groom standing in a misty forest backlit by warm golden sunlight, dreamy atmosphere, professional photography" 1344x768
gen "photo-bride-portrait.jpg" "Portrait of a smiling bride wearing a long white veil holding a bouquet of white and pink roses, soft natural window light, elegant wedding photography" 768x1344
gen "photo-colorful-bouquet.jpg" "Close-up photo of a colorful wedding bouquet with yellow purple and pink flowers, soft natural light, professional photography" 1024x1024
gen "photo-ring-on-finger.jpg" "Close-up photo of a groom's hand placing a diamond wedding ring on a bride's finger, soft natural light, hands in focus, romantic wedding photography" 1344x768
gen "photo-table-setting.jpg" "Elegant wedding reception table setting with white plates crystal wine glasses and a red cocktail, soft candlelight, professional photography, top-down view" 1344x768
gen "photo-rings-dark.jpg" "Macro photo of two gold wedding rings resting on a dark textured surface, soft moody lighting, professional jewelry photography" 1024x1024
gen "photo-bow-tie.jpg" "Close-up photo of a groom in a white shirt adjusting his black bow tie in front of a mirror, soft window light, professional wedding photography" 768x1344
gen "photo-candles-petals.jpg" "Romantic photo of floating candles on a bed of purple flower petals in water, warm candlelight, dark moody atmosphere, professional wedding photography" 1344x768
gen "photo-couple-on-grass.jpg" "Photo of a bride in white dress and groom in suit sitting together on green grass in a park, soft afternoon light, candid wedding photography" 1344x768
gen "photo-bride-bw-window.jpg" "Black and white photo of a bride in a lace wedding dress standing by a window with sheer curtains holding a bouquet, soft natural light, fine-art wedding photography" 768x1344
gen "photo-cooking-kitchen.jpg" "Candid photo of a young couple cooking together in a modern kitchen, the woman in a dress holding a wine glass and the man stirring a frying pan, warm cozy light, lifestyle photography" 1344x768
gen "photo-yellow-roses-rings.jpg" "Close-up photo of yellow roses with two gold wedding rings resting on the petals, soft natural light, professional photography" 1024x1024
gen "photo-ring-box-woven.jpg" "Close-up photo of an open white ring box containing a diamond engagement ring on a woven mat surface, soft natural light, professional photography" 1024x1024
gen "photo-eiffel-kiss.jpg" "Romantic photo of a groom dipping his bride for a kiss outdoors with the Eiffel Tower visible in the background, golden hour light, professional wedding photography" 768x1344
gen "photo-couple-laughing.jpg" "Candid close-up photo of a bride and groom laughing and looking at each other, soft natural light, joyful wedding photography" 1024x1024
gen "photo-walking-hands.jpg" "Photo from the waist down of a bride in a white dress and groom in a suit holding hands while walking, soft natural light, wedding photography" 1344x768
gen "photo-beach-walking.jpg" "Photo of a bride and groom holding hands walking on a sandy beach at sunset, romantic silhouette, professional wedding photography" 1344x768
gen "photo-dj-turntable.jpg" "Close-up photo of a DJ's hand on a turntable mixer with blue ambient lighting, professional event photography" 1024x1024
gen "photo-hands-bouquet.jpg" "Close-up photo of a bride and groom's hands stacked together on top of a bouquet of orange roses and white baby's breath, soft natural light, wedding photography" 1344x768
gen "photo-jewelry-heart.jpg" "Overhead photo of gold necklaces and earrings arranged on a purple velvet surface to form a heart shape, professional jewelry photography" 1024x1024
gen "photo-couple-white-suits.jpg" "Photo of a couple holding hands, the woman in a white dress and the man in a white suit, soft natural light, wedding photography, waist down" 1344x768
gen "photo-banquet-hall.jpg" "Wide photo of an elegant banquet hall with round tables set for a wedding reception, warm chandelier light, professional event photography" 1344x768
gen "photo-aerial-garden.jpg" "Aerial drone photo of a lush green garden with trees and a small building, sunny day, professional photography" 1344x768
gen "photo-church-ceremony.jpg" "Wide photo inside a historic church showing a bride in a white gown and groom in a black suit walking down the aisle with a priest, soft stained-glass light, professional wedding photography" 1344x768
gen "photo-sepia-embrace.jpg" "Sepia-toned romantic photo of a bride and groom embracing outdoors near a stone column building, vintage wedding photography" 1344x768
gen "photo-planner-clipboard.jpg" "Photo of a woman with glasses holding a clipboard in a bright bridal shop, professional wedding planning photography" 768x1344
gen "photo-bride-veil-detail.jpg" "Close-up photo of a bride's lace veil and wedding dress detail with soft natural light, fine-art wedding photography" 1024x1024
gen "photo-couple-backlit-intimate.jpg" "Intimate backlit photo of a bride and groom standing close together in soft golden hour light, professional wedding photography" 1024x1024
gen "photo-hands-waist-wine.jpg" "Close-up photo of a hand resting on a partner's waist near a glass of red wine, soft candlelight, intimate wedding photography" 1024x1024
gen "photo-bride-groom-field.jpg" "Wide photo of a bride and groom standing together in a green field at golden hour, romantic wedding photography" 1344x768
gen "photo-rings-on-doors.jpg" "Close-up photo of three wedding rings resting on three colorful painted wooden doors green teal and orange, professional wedding photography" 1344x768
gen "photo-buttoning-shirt.jpg" "Close-up photo of hands buttoning a white dress shirt, soft natural light, wedding morning photography" 1024x1024
gen "photo-couple-dancing-veil.jpg" "Romantic photo of a bride and groom dancing outdoors with the bride's long veil flowing in the wind, golden hour light, professional wedding photography" 1344x768

echo "DONE photos at $(date)"
ls -la "$OUT"
