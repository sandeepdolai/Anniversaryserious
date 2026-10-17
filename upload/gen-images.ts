import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_PHOTOS = "/home/z/my-project/public/images/photos";
const OUT_OBJECTS = "/home/z/my-project/public/images/objects";
fs.mkdirSync(OUT_PHOTOS, { recursive: true });
fs.mkdirSync(OUT_OBJECTS, { recursive: true });

type Job = { file: string; prompt: string; size: string; outDir: string };

const photos: Job[] = [
  { file: "photo-couple-laughing.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Candid close-up photo of a bride and groom laughing and looking at each other, soft natural light, joyful wedding photography" },
  { file: "photo-walking-hands.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Photo from the waist down of a bride in a white dress and groom in a suit holding hands while walking, soft natural light, wedding photography" },
  { file: "photo-beach-walking.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Photo of a bride and groom holding hands walking on a sandy beach at sunset, romantic silhouette, professional wedding photography" },
  { file: "photo-dj-turntable.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Close-up photo of a DJ hand on a turntable mixer with blue ambient lighting, professional event photography" },
  { file: "photo-hands-bouquet.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Close-up photo of a bride and grooms hands stacked together on top of a bouquet of orange roses and white babys breath, soft natural light, wedding photography" },
  { file: "photo-jewelry-heart.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Overhead photo of gold necklaces and earrings arranged on a purple velvet surface to form a heart shape, professional jewelry photography" },
  { file: "photo-couple-white-suits.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Photo of a couple holding hands, the woman in a white dress and the man in a white suit, soft natural light, wedding photography, waist down" },
  { file: "photo-banquet-hall.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Wide photo of an elegant banquet hall with round tables set for a wedding reception, warm chandelier light, professional event photography" },
  { file: "photo-aerial-garden.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Aerial drone photo of a lush green garden with trees and a small building, sunny day, professional photography" },
  { file: "photo-church-ceremony.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Wide photo inside a historic church showing a bride in a white gown and groom in a black suit walking down the aisle with a priest, soft stained-glass light, professional wedding photography" },
  { file: "photo-sepia-embrace.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Sepia-toned romantic photo of a bride and groom embracing outdoors near a stone column building, vintage wedding photography" },
  { file: "photo-planner-clipboard.jpg", size: "768x1344", outDir: OUT_PHOTOS, prompt: "Photo of a woman with glasses holding a clipboard in a bright bridal shop, professional wedding planning photography" },
  { file: "photo-bride-veil-detail.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Close-up photo of a brides lace veil and wedding dress detail with soft natural light, fine-art wedding photography" },
  { file: "photo-couple-backlit-intimate.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Intimate backlit photo of a bride and groom standing close together in soft golden hour light, professional wedding photography" },
  { file: "photo-hands-waist-wine.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Close-up photo of a hand resting on a partners waist near a glass of red wine, soft candlelight, intimate wedding photography" },
  { file: "photo-bride-groom-field.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Wide photo of a bride and groom standing together in a green field at golden hour, romantic wedding photography" },
  { file: "photo-rings-on-doors.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Close-up photo of three wedding rings resting on three colorful painted wooden doors green teal and orange, professional wedding photography" },
  { file: "photo-buttoning-shirt.jpg", size: "1024x1024", outDir: OUT_PHOTOS, prompt: "Close-up photo of hands buttoning a white dress shirt, soft natural light, wedding morning photography" },
  { file: "photo-couple-dancing-veil.jpg", size: "1344x768", outDir: OUT_PHOTOS, prompt: "Romantic photo of a bride and groom dancing outdoors with the brides long veil flowing in the wind, golden hour light, professional wedding photography" },
];

const objects: Job[] = [
  { file: "obj-rowboat.png", size: "1344x768", outDir: OUT_OBJECTS, prompt: "3D render of a small wooden rowboat with a pink interior and light blue exterior, an oar resting inside, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-bicycle-ribbons.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a vintage bicycle with long flowing pink ribbons streaming from the handlebars, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-bouquet-ribbons.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of an elegant wedding bouquet of pink white and pale blue stylized flowers with long flowing pink ribbons, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-gift-box-bow.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of an open cream-colored gift box with a light blue interior, a large stylized pink ribbon bow on top, two gold wedding bands visible inside, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-pink-bow.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a large voluminous pink ribbon bow with long flowing tails, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-balloons-cluster.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a dense cluster of matte balloons in pastel pink peach cream and pale blue with subtle metallic silver balloons mixed in, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-vintage-car.png", size: "1344x768", outDir: OUT_OBJECTS, prompt: "3D render of a vintage Volkswagen Beetle style car with a glossy pink body and cream white roof, two-tone color scheme, stylized cartoon style, three-quarter front view, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-wedding-cake.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of an elegant multi-tiered wedding cake, white and pale blue frosting, decorated with pink roses and small blue gem accents, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-meringues.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of three small swirled meringue cookies with white and pale blue swirls, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-gift-boxes.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a scattered cluster of small square gift boxes wrapped in pastel pink and white paper with pink and light blue ribbons, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-lollipop.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of a single elegant swirled pink and white lollipop candy with a small pink ribbon bow on the stick, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-gold-rings.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of two gold wedding bands interlocking, polished shiny metallic gold material, soft studio lighting, isolated on pure black background, dramatic spotlight, high quality" },
  { file: "obj-cherry-tree.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of a small stylized cherry blossom tree with a brown trunk and dense pink blossoms, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-cylindrical-containers.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a small cluster of cylindrical containers and spools in pink and translucent white materials, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-round-table-vase.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of a small round white table with a vase of pink paper flowers and a small blue ring on top, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-polaroid-strip.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of a vertical strip of blank white polaroid photo frames tied with pink ribbons, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-pink-heart.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a small simple glossy pink heart shape, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-pink-hearts-scattered.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of several small pink heart shapes scattered around, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-decorative-plate.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a round white decorative plate with painted pink flowers, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-boat-petals.png", size: "1344x768", outDir: OUT_OBJECTS, prompt: "3D render of a small wooden rowboat with a pink interior floating on stylized blue water with pink paper petals drifting around, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-pink-flowers.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of a cluster of pink paper flowers with green paper leaves, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-cake-meringues.png", size: "768x1344", outDir: OUT_OBJECTS, prompt: "3D render of a multi-tiered wedding cake with pink roses and three small swirled meringues floating above, stylized cartoon style, isolated on pure white background, soft drop shadow, high quality" },
  { file: "obj-invitation-card.png", size: "1024x1024", outDir: OUT_OBJECTS, prompt: "3D render of an elegant white invitation card with an ornate thin pink border with decorative swirls in the corners, isolated on pure white background, soft drop shadow, high quality" },
];

async function runOne(zai: any, job: Job, attempt = 1): Promise<boolean> {
  const out = path.join(job.outDir, job.file);
  if (fs.existsSync(out) && fs.statSync(out).size > 1024) {
    console.log("SKIP", job.file);
    return true;
  }
  try {
    const res = await zai.images.generations.create({
      prompt: job.prompt,
      size: job.size as any,
    });
    const b64 = res.data?.[0]?.base64;
    if (!b64) throw new Error("no base64");
    fs.writeFileSync(out, Buffer.from(b64, "base64"));
    console.log("OK", job.file, fs.statSync(out).size, "bytes");
    // delay between successful requests to avoid 429
    await new Promise((r) => setTimeout(r, 4000));
    return true;
  } catch (e: any) {
    console.error("FAIL", job.file, "attempt", attempt, e?.message || e);
    if (attempt < 8) {
      // backoff: 10s, 20s, 40s, 80s, 160s, 320s, 640s
      const wait = 10000 * Math.pow(2, attempt - 1);
      console.log(`  retry in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      return runOne(zai, job, attempt + 1);
    }
    return false;
  }
}

async function runBatch(zai: any, jobs: Job[], concurrency = 1): Promise<void> {
  let idx = 0;
  let failed = 0;
  const results: Promise<void>[] = [];
  async function worker() {
    while (true) {
      const myIdx = idx++;
      if (myIdx >= jobs.length) return;
      const ok = await runOne(zai, jobs[myIdx]);
      if (!ok) failed++;
    }
  }
  for (let i = 0; i < concurrency; i++) results.push(worker());
  await Promise.all(results);
  console.log(`batch done; failed=${failed}`);
}

(async () => {
  const zai = await ZAI.create();
  console.log("SDK ready");
  // Run sequentially with 1 worker to avoid 429. Each image takes ~30-40s with delay.
  await runBatch(zai, photos, 1);
  await runBatch(zai, objects, 1);
  console.log("ALL DONE");
})();
