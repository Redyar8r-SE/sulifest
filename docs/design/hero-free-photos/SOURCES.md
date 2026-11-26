# Free photos for the home hero

Downloaded on 2026-11-26 from Wikimedia Commons. Every picture here is **public domain** or **CC0**.
That means free to use, also for commercial sites, with no payment. Giving credit is not required, but it is polite.

None of these files come from the Slider Revolution template. That template's pictures are not free and are not used.

Before launch, a person on the team should open each link below once and check that the licence on the page is still the same.

| Layer file (`layers/`) | Made from (`originals/`) | Original title on Wikimedia Commons | Licence | Author | Link |
|---|---|---|---|---|---|
| `moon.webp` | `moon.jpg` | Full Moon on Buddha purnima.jpg | CC0 | Kasyap | https://commons.wikimedia.org/wiki/File:Full_Moon_on_Buddha_purnima.jpg |
| `mountains.webp` | `mountains.jpg` | Teton Range Light Dusting of Spring Snow (52097499112).jpg | Public domain | Grand Teton National Park (US National Park Service) | https://commons.wikimedia.org/wiki/File:Teton_Range_Light_Dusting_of_Spring_Snow_(52097499112).jpg |
| `cloud-1.webp`, `cloud-2.webp`, `cloud-3.webp` | `clouds-a.jpg` | The sky is beautiful with cumulus clouds.jpg | CC0 | Nana Hemaa N.A | https://commons.wikimedia.org/wiki/File:The_sky_is_beautiful_with_cumulus_clouds.jpg |
| `trees.webp` | `trees-a.jpg` | Red spruce silhouetted against sunset sky at Twitchell Lake (NARA 554397) | Public domain | Anne LaBastille (US National Archives) | https://commons.wikimedia.org/wiki/File:RED_SPRUCE_SILHOUETTED_AGAINST_SUNSET_SKY_AT_TWITCHELL_LAKE_NORTHEAST_OF_OLD_FORGE_VILLAGE_-_NARA_-_554397.jpg |
| `sleigh.webp` | `sleigh.png` | Santa Claus and his sleigh, 1924.svg | Public domain | Unknown author, 1924 | https://commons.wikimedia.org/wiki/File:Santa_Claus_and_his_sleigh,_1924.svg |

| `xmas-tree.webp`, `gifts.webp` | `xmas-tree.jpg` | Christmas tree png sticker, transparent (found through Openverse) | CC0 | rawpixel | https://www.rawpixel.com/image/9246467/png-white-background-plant |
| `night-tree.webp` | `night-tree.jpg` | The National Christmas Tree Illuminated at Night with the White House Visible in the Background | Public domain | White House Photo Office (US government, 1969–1974) | https://commons.wikimedia.org/wiki/File:The_National_Christmas_Tree_Illuminated_at_Night_with_the_White_House_Visible_in_the_Background_-_DPLA_-_ed36660fe14a155520a41cd40982eed6.jpg |
| `deer-sprite.webp` | `deer-run.jpg` | Deer, running (Library of Congress 2009630502) | Public domain | Eadweard Muybridge, 1880s | https://commons.wikimedia.org/wiki/File:Deer,_running_LCCN2009630502.jpg |
| `sleigh-only.webp` | `sleigh.png` | Santa Claus and his sleigh, 1924.svg (only the sleigh part) | Public domain | Unknown author, 1924 | https://commons.wikimedia.org/wiki/File:Santa_Claus_and_his_sleigh,_1924.svg |
| `santa-sleigh.webp`, and the antlers in `reindeer-sprite.webp` | `santa-sleigh-original.webp` | Silhouette Santa sleigh clipart, Christmas (found through Openverse) | CC0 | rawpixel | https://www.rawpixel.com/image/6771633/vector-christmas-sticker-public-domain |
| `reindeer-sprite.webp` (the running bodies) | `deer-run.jpg` | Deer, running (Library of Congress 2009630502) | Public domain | Eadweard Muybridge, 1880s | https://commons.wikimedia.org/wiki/File:Deer,_running_LCCN2009630502.jpg |

## Which layers the preview uses now

| Part | Layer |
|---|---|
| Tree in scene 2 | `night-tree.webp` (a real photo). `xmas-tree.webp` is the older illustration and is no longer used. |
| Santa and sleigh | `santa-sleigh.webp` (clear shape with hat, sack and curled runners) |
| Reindeer | Three copies of `reindeer-sprite.webp` (real running deer + big reindeer antlers) |
| Not used any more | `sleigh.webp`, `sleigh-only.webp`, `deer-sprite.webp` (older tries) |
| Gift boxes | `gifts.webp` (still an illustration) |

## How the running reindeer works

`reindeer-sprite.webp` is one long strip with 12 pictures of a real deer running (2772 × 200 px, each picture 231 px wide). Big antlers from the free Santa silhouette were added to every picture.
CSS shows one picture at a time and steps through all 12 in 0.72 seconds (`animation: ... steps(12) infinite`).
The three reindeer start at different times, so their legs do not move together.
No JavaScript is needed.

## What was changed

| Layer | Change |
|---|---|
| Moon | Cut out as a circle, a little brighter |
| Mountains | Sky removed, made grey-blue for a night look, bottom part cropped |
| Clouds | Blue sky removed, three pieces cut, soft edges |
| Trees | Turned into a dark shape (silhouette) |
| Sleigh | The line drawing was filled to make a dark shape and flipped to face right |

Stars and falling snow are not photos. They are drawn with code (CSS).

`test-picture.jpg` shows all layers together.

## Notes for the final site

- These files are for the preview and for testing the animation. The mountains are in the USA, not Goizha. The team may want a real Sulaymaniyah mountain photo later.
- The final site needs smaller files for phones and an AVIF version (see plan 002).
- Scene 2 now uses the free tree and gift boxes. The tree is an illustration, not a photo. The card and the snow ground are still made with code.
- `xmas-tree.jpg` was a preview file with a checkered background. The background was removed, and the gift boxes were also cut out as a separate layer (`gifts.webp`).
