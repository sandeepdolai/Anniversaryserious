"use client";

import { SceneShell } from "./SceneShell";
import { EditableText } from "./EditableText";
import { Editable3DObject } from "./Editable3DObject";
import { Petals } from "./Petals";
import { PhotoCard } from "./PhotoCard";
import { EditModeToggle } from "./EditModeToggle";
import { WeddingFooter } from "./Footer";
import { ASSET } from "@/lib/wedding-data";
import { HeroScene } from "./scenes/HeroScene";
import { InvitationScene } from "./scenes/InvitationScene";
import { CollageScene, type SceneObj, type ScenePhoto } from "./scenes/CollageScene";
import { DateLocationScene } from "./scenes/DateLocationScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { motion } from "framer-motion";

function quoteOverlay(lines: string[]) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
      <div className="text-center">
        {lines.map((l, i) => (
          <p key={i} className="font-serif-d italic text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

export function WeddingSite() {
  return (
    <div className="wedding-scroll min-h-screen flex flex-col bg-white text-foreground">
      <EditModeToggle />

      <main className="flex-1 flex flex-col">
        {/* Scene 1: Hero quote */}
        <HeroScene />

        {/* Scene 2: Invitation card */}
        <InvitationScene />

        {/* Scene 3: Cherry blossom tree + collage (A moment to remember) */}
        <CollageScene
          sceneId="sc-moment"
          bg="wedding-bg"
          petals
          petalCount={14}
          layout="right-photos"
          photos={[
            {
              key: "sc-moment-photo1",
              src: ASSET.photos("photo-dancing-overhead.jpg"),
              alt: "Bride and groom dancing on a circular patterned floor",
            },
            {
              key: "sc-moment-photo2",
              src: ASSET.photos("photo-snowy-embrace.jpg"),
              alt: "Couple embracing in snowy landscape",
            },
            {
              key: "sc-moment-photo3",
              src: ASSET.photos("photo-forest-backlit.jpg"),
              alt: "Couple backlit in a misty forest",
            },
          ]}
          quoteLines={["A moment", "to remember"]}
          objects={[
            {
              key: "sc-moment-obj1",
              src: ASSET.objects("obj-cherry-tree.png"),
              alt: "Cherry blossom tree",
              className: "absolute left-[-10%] sm:left-[-5%] top-[5%] w-56 sm:w-72 md:w-96 anim-sway",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -3,
            },
            {
              key: "sc-moment-obj2",
              src: ASSET.objects("obj-pink-hearts-scattered.png"),
              alt: "Pink hearts scattered",
              className: "absolute right-[2%] bottom-[8%] w-32 sm:w-44 md:w-52 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
            {
              key: "sc-moment-obj3",
              src: ASSET.objects("obj-decorative-plate.png"),
              alt: "Decorative plate",
              className: "absolute left-[10%] bottom-[5%] w-28 sm:w-36 md:w-44 anim-float",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 4: Bicycle + bride portrait (best thing to hold onto) */}
        <CollageScene
          sceneId="sc-hold"
          bg="wedding-bg-soft"
          petals
          petalCount={12}
          layout="left-photos"
          photos={[
            {
              key: "sc-hold-photo1",
              src: ASSET.photos("photo-bride-portrait.jpg"),
              alt: "Bride portrait",
            },
            {
              key: "sc-hold-photo2",
              src: ASSET.photos("photo-colorful-bouquet.jpg"),
              alt: "Colorful wedding bouquet",
            },
            {
              key: "sc-hold-photo3",
              src: ASSET.photos("photo-ring-on-finger.jpg"),
              alt: "Groom placing ring on bride's finger",
            },
          ]}
          quoteLines={["The best thing to hold onto in life", "is each other"]}
          objects={[
            {
              key: "sc-hold-obj1",
              src: ASSET.objects("obj-bicycle-ribbons.png"),
              alt: "Bicycle with pink ribbons",
              className: "absolute right-[-5%] sm:right-[-2%] top-[10%] w-64 sm:w-80 md:w-96 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 4,
            },
            {
              key: "sc-hold-obj2",
              src: ASSET.objects("obj-pink-flowers.png"),
              alt: "Pink paper flowers",
              className: "absolute left-[5%] bottom-[6%] w-24 sm:w-32 md:w-40 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 5: Table setting + round table (Save the date 20 Feb 2021) */}
        <CollageScene
          sceneId="sc-savedate"
          bg="wedding-bg-cool"
          petals
          petalCount={14}
          layout="left-photos"
          photos={[
            {
              key: "sc-savedate-photo1",
              src: ASSET.photos("photo-table-setting.jpg"),
              alt: "Elegant table setting with wine glasses and a red cocktail",
            },
            {
              key: "sc-savedate-photo2",
              src: ASSET.photos("photo-rings-dark.jpg"),
              alt: "Two gold wedding rings on a dark surface",
            },
            {
              key: "sc-savedate-photo3",
              src: ASSET.photos("photo-buttoning-shirt.jpg"),
              alt: "Close-up of hands buttoning a white dress shirt",
            },
          ]}
          quoteLines={["Save the date", "20 February 2021"]}
          objects={[
            {
              key: "sc-savedate-obj1",
              src: ASSET.objects("obj-round-table-vase.png"),
              alt: "Round table with vase of pink flowers",
              className: "absolute right-[5%] top-[12%] w-56 sm:w-72 md:w-96 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -3,
            },
            {
              key: "sc-savedate-obj2",
              src: ASSET.objects("obj-pink-hearts-scattered.png"),
              alt: "Pink hearts scattered",
              className: "absolute left-[5%] bottom-[8%] w-28 sm:w-40 md:w-48 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 6: Rowboat (At 12:00 in the afternoon) */}
        <CollageScene
          sceneId="sc-time"
          bg="wedding-bg"
          petals
          petalCount={16}
          layout="right-photos"
          photos={[
            {
              key: "sc-time-photo1",
              src: ASSET.photos("photo-rings-on-doors.jpg"),
              alt: "Three wedding rings on colorful doors",
            },
            {
              key: "sc-time-photo2",
              src: ASSET.photos("photo-bow-tie.jpg"),
              alt: "Groom adjusting bow tie",
            },
            {
              key: "sc-time-photo3",
              src: ASSET.photos("photo-table-setting.jpg"),
              alt: "Table setting",
            },
          ]}
          quoteLines={["At 12:00 in the afternoon"]}
          objects={[
            {
              key: "sc-time-obj1",
              src: ASSET.objects("obj-rowboat.png"),
              alt: "Rowboat with pink interior",
              className: "absolute left-[-5%] top-[15%] w-64 sm:w-80 md:w-96 anim-float-slow",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 6,
            },
            {
              key: "sc-time-obj2",
              src: ASSET.objects("obj-petals-cluster.png"),
              alt: "Pink petals cluster",
              className: "absolute right-[5%] bottom-[6%] w-24 sm:w-32 md:w-40 anim-float",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 7: Polaroid film strip (Boston College Club, Boston, MA) */}
        <CollageScene
          sceneId="sc-venue"
          bg="wedding-bg-soft"
          petals
          petalCount={14}
          layout="left-photos"
          photos={[
            {
              key: "sc-venue-photo1",
              src: ASSET.photos("photo-candles-petals.jpg"),
              alt: "Floating candles on purple flower petals",
            },
            {
              key: "sc-venue-photo2",
              src: ASSET.photos("photo-couple-on-grass.jpg"),
              alt: "Bride and groom sitting on grass",
            },
            {
              key: "sc-venue-photo3",
              src: ASSET.photos("photo-colorful-bouquet.jpg"),
              alt: "Bouquet close-up",
            },
          ]}
          quoteLines={["Boston College Club", "Boston, MA"]}
          objects={[
            {
              key: "sc-venue-obj1",
              src: ASSET.objects("obj-polaroid-strip.png"),
              alt: "Polaroid film strip with pink ribbons",
              className: "absolute right-[8%] top-[8%] w-40 sm:w-56 md:w-72 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 5,
            },
            {
              key: "sc-venue-obj2",
              src: ASSET.objects("obj-pink-flowers.png"),
              alt: "Pink paper flowers",
              className: "absolute left-[5%] bottom-[6%] w-24 sm:w-32 md:w-40 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 8: Cherry blossom branch sweeping + best thing (You are the best thing that ever happened to me) */}
        <SceneShell
          sceneId="sc-best"
          bg="wedding-bg"
          petals
          petalCount={20}
          className="min-h-[100svh] flex items-center py-16 sm:py-20"
          contentClassName="relative text-center"
        >
          <div className="relative w-full max-w-4xl mx-auto py-10">
            {/* Sweeping branch */}
            <motion.div
              initial={{ opacity: 0, x: -80, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-6 sm:-left-12 md:-left-20 top-0 w-72 sm:w-96 md:w-[520px]"
            >
              <Editable3DObject
                objectKey="sc-best-branch"
                src={ASSET.objects("obj-cherry-blossom-branch.png")}
                alt="Cherry blossom branch"
                className="relative w-full anim-sway"
                imgClassName="w-full h-auto drop-shadow-2xl"
                rotate={-8}
              />
            </motion.div>

            {/* Falling petals from branch */}
            <Editable3DObject
              objectKey="sc-best-petals-1"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink petals"
              className="absolute left-[20%] top-[40%] w-16 sm:w-24 md:w-32 anim-float"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="sc-best-petals-2"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink petals"
              className="absolute left-[35%] top-[60%] w-14 sm:w-20 md:w-28 anim-float-2"
              imgClassName="w-full h-auto drop-shadow-xl"
            />
            <Editable3DObject
              objectKey="sc-best-petals-3"
              src={ASSET.objects("obj-petals-cluster.png")}
              alt="Pink petals"
              className="absolute left-[8%] top-[70%] w-12 sm:w-16 md:w-20 anim-float-slow"
              imgClassName="w-full h-auto drop-shadow-xl"
            />

            {/* Photos on right */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 ml-auto max-w-md sm:max-w-lg md:max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="col-span-2"
              >
                <PhotoCard
                  imageKey="sc-best-photo1"
                  src={ASSET.photos("photo-bride-groom-field.jpg")}
                  alt="Bride and groom in a green field"
                  rotate={2}
                  className="w-full"
                  frameClassName="aspect-[5/4] bg-pink-50/40"
                  objectFit="cover"
                  overlay={quoteOverlay(["You are the best thing", "that ever happened to me"])}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <PhotoCard
                  imageKey="sc-best-photo2"
                  src={ASSET.photos("photo-ring-on-finger.jpg")}
                  alt="Ring on bride's finger"
                  rotate={-3}
                  className="w-full"
                  frameClassName="aspect-[4/3] bg-pink-50/40"
                  objectFit="cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 sm:mt-12"
              >
                <PhotoCard
                  imageKey="sc-best-photo3"
                  src={ASSET.photos("photo-aerial-garden.jpg")}
                  alt="Aerial garden view"
                  rotate={3}
                  className="w-full"
                  frameClassName="aspect-[4/3] bg-pink-50/40"
                  objectFit="cover"
                />
              </motion.div>
            </div>
          </div>
        </SceneShell>

        {/* Scene 9: Open gift box + B&W bride (If you would be loved, love and be lovable) */}
        <CollageScene
          sceneId="sc-lovable"
          bg="wedding-bg-soft"
          petals
          petalCount={18}
          layout="left-photos"
          photos={[
            {
              key: "sc-lovable-photo1",
              src: ASSET.photos("photo-bride-bw-window.jpg"),
              alt: "Black and white bride in lace dress by a window",
            },
            {
              key: "sc-lovable-photo2",
              src: ASSET.photos("photo-couple-backlit-intimate.jpg"),
              alt: "Couple embracing intimately",
            },
            {
              key: "sc-lovable-photo3",
              src: ASSET.photos("photo-yellow-roses-rings.jpg"),
              alt: "Yellow roses with two gold wedding rings",
            },
          ]}
          quoteLines={["If you would be loved,", "love and be lovable."]}
          objects={[
            {
              key: "sc-lovable-obj1",
              src: ASSET.objects("obj-gift-box-bow.png"),
              alt: "Open gift box with pink bow and gold rings inside",
              className: "absolute right-[2%] top-[12%] w-56 sm:w-72 md:w-96 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -4,
            },
            {
              key: "sc-lovable-obj2",
              src: ASSET.objects("obj-pink-hearts-scattered.png"),
              alt: "Pink hearts scattered",
              className: "absolute left-[2%] bottom-[4%] w-28 sm:w-36 md:w-44 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 10: Bouquet + formal portrait (Wish us a happy life) */}
        <CollageScene
          sceneId="sc-wish"
          bg="wedding-bg-cool"
          petals
          petalCount={14}
          layout="right-photos"
          photos={[
            {
              key: "sc-wish-photo1",
              src: ASSET.photos("photo-couple-on-grass.jpg"),
              alt: "Bride and groom sitting on grass",
            },
            {
              key: "sc-wish-photo2",
              src: ASSET.photos("photo-couple-backlit-intimate.jpg"),
              alt: "Couple backlit intimate",
            },
            {
              key: "sc-wish-photo3",
              src: ASSET.photos("photo-bride-veil-detail.jpg"),
              alt: "Bride veil detail",
            },
          ]}
          quoteLines={["Wish us a happy life."]}
          objects={[
            {
              key: "sc-wish-obj1",
              src: ASSET.objects("obj-bouquet-ribbons.png"),
              alt: "Wedding bouquet with flowing pink ribbons",
              className: "absolute left-[-5%] top-[8%] w-56 sm:w-72 md:w-96 anim-sway",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -3,
            },
            {
              key: "sc-wish-obj2",
              src: ASSET.objects("obj-pink-bow.png"),
              alt: "Pink ribbon bow",
              className: "absolute right-[10%] bottom-[10%] w-32 sm:w-44 md:w-56 anim-float",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 11: Large pink bow + cooking (Once upon a time) */}
        <CollageScene
          sceneId="sc-once"
          bg="wedding-bg"
          petals
          petalCount={16}
          layout="left-photos"
          photos={[
            {
              key: "sc-once-photo1",
              src: ASSET.photos("photo-cooking-kitchen.jpg"),
              alt: "Couple cooking together in kitchen",
            },
            {
              key: "sc-once-photo2",
              src: ASSET.photos("photo-yellow-roses-rings.jpg"),
              alt: "Yellow roses with gold wedding rings",
            },
            {
              key: "sc-once-photo3",
              src: ASSET.photos("photo-ring-box-woven.jpg"),
              alt: "Open ring box on woven mat",
            },
          ]}
          quoteLines={["Once upon a time"]}
          objects={[
            {
              key: "sc-once-obj1",
              src: ASSET.objects("obj-pink-bow.png"),
              alt: "Large pink ribbon bow",
              className: "absolute right-[-5%] top-[8%] w-72 sm:w-96 md:w-[520px] anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 8,
            },
            {
              key: "sc-once-obj2",
              src: ASSET.objects("obj-petals-cluster.png"),
              alt: "Pink petals cluster",
              className: "absolute left-[8%] bottom-[5%] w-24 sm:w-32 md:w-40 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 12: Balloons + Eiffel kiss (The Sweetness of sharing) */}
        <CollageScene
          sceneId="sc-sweet"
          bg="wedding-bg-soft"
          petals
          petalCount={14}
          layout="left-photos"
          photos={[
            {
              key: "sc-sweet-photo1",
              src: ASSET.photos("photo-eiffel-kiss.jpg"),
              alt: "Groom dipping bride for a kiss in front of the Eiffel Tower",
            },
            {
              key: "sc-sweet-photo2",
              src: ASSET.photos("photo-couple-laughing.jpg"),
              alt: "Couple laughing close-up",
            },
            {
              key: "sc-sweet-photo3",
              src: ASSET.photos("photo-walking-hands.jpg"),
              alt: "Couple walking hand-in-hand",
            },
          ]}
          quoteLines={["The Sweetness of sharing"]}
          objects={[
            {
              key: "sc-sweet-obj1",
              src: ASSET.objects("obj-balloons-cluster.png"),
              alt: "Cluster of pastel balloons",
              className: "absolute right-[2%] top-[8%] w-72 sm:w-96 md:w-[520px] anim-float-slow",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -4,
            },
            {
              key: "sc-sweet-obj2",
              src: ASSET.objects("obj-pink-hearts-scattered.png"),
              alt: "Pink hearts scattered",
              className: "absolute left-[5%] bottom-[6%] w-24 sm:w-32 md:w-40 anim-float",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 13: Lollipop + beach walk (A Wonderful beginning) */}
        <CollageScene
          sceneId="sc-wonderful"
          bg="wedding-bg-cool"
          petals
          petalCount={14}
          layout="right-photos"
          photos={[
            {
              key: "sc-wonderful-photo1",
              src: ASSET.photos("photo-beach-walking.jpg"),
              alt: "Bride and groom walking on a beach at sunset",
            },
            {
              key: "sc-wonderful-photo2",
              src: ASSET.photos("photo-planner-clipboard.jpg"),
              alt: "Wedding planner with clipboard",
            },
            {
              key: "sc-wonderful-photo3",
              src: ASSET.photos("photo-dj-turntable.jpg"),
              alt: "DJ turntable close-up",
            },
          ]}
          quoteLines={["A Wonderful beginning"]}
          objects={[
            {
              key: "sc-wonderful-obj1",
              src: ASSET.objects("obj-lollipop.png"),
              alt: "Swirled pink and white lollipop with ribbon",
              className: "absolute left-[-5%] top-[8%] w-56 sm:w-72 md:w-96 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 6,
            },
            {
              key: "sc-wonderful-obj2",
              src: ASSET.objects("obj-cylindrical-containers.png"),
              alt: "Cylindrical containers",
              className: "absolute right-[8%] bottom-[5%] w-32 sm:w-44 md:w-56 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 14: Wedding cake + hands on bouquet (Hand in hand together / This love will be forever) */}
        <CollageScene
          sceneId="sc-hand"
          bg="wedding-bg"
          petals
          petalCount={14}
          layout="left-photos"
          photos={[
            {
              key: "sc-hand-photo1",
              src: ASSET.photos("photo-hands-bouquet.jpg"),
              alt: "Couple's hands stacked on a bouquet",
            },
            {
              key: "sc-hand-photo2",
              src: ASSET.photos("photo-jewelry-heart.jpg"),
              alt: "Jewelry arranged as a heart",
            },
            {
              key: "sc-hand-photo3",
              src: ASSET.photos("photo-couple-white-suits.jpg"),
              alt: "Couple holding hands, both in white",
            },
          ]}
          quoteLines={["Hand in hand together", "This love will be forever"]}
          objects={[
            {
              key: "sc-hand-obj1",
              src: ASSET.objects("obj-wedding-cake.png"),
              alt: "Multi-tiered wedding cake with pink roses",
              className: "absolute right-[2%] top-[8%] w-56 sm:w-72 md:w-96 anim-float-slow",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: -3,
            },
            {
              key: "sc-hand-obj2",
              src: ASSET.objects("obj-meringues.png"),
              alt: "Three meringue cookies",
              className: "absolute right-[30%] top-[2%] w-24 sm:w-32 md:w-44 anim-float",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 15: Gift boxes + church ceremony (Your presence will be Extremely important for us) */}
        <CollageScene
          sceneId="sc-presence"
          bg="wedding-bg-soft"
          petals
          petalCount={16}
          layout="right-photos"
          photos={[
            {
              key: "sc-presence-photo1",
              src: ASSET.photos("photo-church-ceremony.jpg"),
              alt: "Wedding ceremony in a historic church",
            },
            {
              key: "sc-presence-photo2",
              src: ASSET.photos("photo-banquet-hall.jpg"),
              alt: "Elegant banquet hall",
            },
            {
              key: "sc-presence-photo3",
              src: ASSET.photos("photo-aerial-garden.jpg"),
              alt: "Aerial green garden view",
            },
          ]}
          quoteLines={["Your presence will be", "Extremely important for us"]}
          objects={[
            {
              key: "sc-presence-obj1",
              src: ASSET.objects("obj-gift-boxes.png"),
              alt: "Scattered gift boxes with pink ribbons",
              className: "absolute left-[-5%] top-[15%] w-64 sm:w-80 md:w-96 anim-float",
              imgClassName: "w-full h-auto drop-shadow-2xl",
              rotate: 5,
            },
            {
              key: "sc-presence-obj2",
              src: ASSET.objects("obj-pink-hearts-scattered.png"),
              alt: "Pink hearts scattered",
              className: "absolute right-[5%] bottom-[5%] w-24 sm:w-32 md:w-40 anim-float-2",
              imgClassName: "w-full h-auto drop-shadow-xl",
            },
          ]}
        />

        {/* Scene 16: Date & Location scene (vintage car) */}
        <DateLocationScene
          sceneId="sc-date"
          bg="wedding-bg-cool"
          petals
          petalCount={18}
          photo={{
            key: "sc-date-photo",
            src: ASSET.photos("photo-sepia-embrace.jpg"),
            alt: "Sepia couple embracing near stone building",
          }}
          objectKey="sc-date-car"
          objectSrc={ASSET.objects("obj-vintage-car.png")}
          objectAlt="Vintage pink and cream Volkswagen Beetle with balloons"
          day="20 February 2021"
          time="At 12:00 in the afternoon"
          place="Boston College Club"
          city="Boston, MA"
          keys={{
            day: "sc-date-day",
            time: "sc-date-time",
            place: "sc-date-place",
            city: "sc-date-city",
          }}
        />

        {/* Scene 17: Closing - gold rings + We Are Getting Married */}
        <ClosingScene />
      </main>

      <WeddingFooter />
    </div>
  );
}
