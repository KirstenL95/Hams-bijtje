/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hive, HiveInspection, HarvestRecord, JournalPost, HoneyProduct } from "../types";

import hero from "../assets/images/rectangle2.jpg";
import journalMain from "../assets/images/hive2.jpg";
import productsCover from "../assets/images/rectangle2.jpg";
import beehivesField from "../assets/images/hive.jpg";
import logo from "../assets/images/rectangle2.jpg";

export const IMAGES = {
  hero,
  journalMain,
  productsCover,
  beehivesField,
  logo
};

export const DEFAULT_HIVES: Hive[] = [
  {
    id: "hive-1",
    name: "De Alchemist (Kast A)",
    type: "Langstroth",
    status: "Active",
    establishedDate: "2024-05-12",
    queenColor: "Yellow",
    strength: "Excellent",
    honeySupers: 3
  },
  {
    id: "hive-2",
    name: "Weidekoningin (Kast B)",
    type: "Langstroth",
    status: "Active",
    establishedDate: "2024-06-01",
    queenColor: "Yellow",
    strength: "Good",
    honeySupers: 2
  },
  {
    id: "hive-3",
    name: "Oud Bos (Kast C)",
    type: "Langstroth",
    status: "Active",
    establishedDate: "2025-04-18",
    queenColor: "White",
    strength: "Good",
    honeySupers: 2
  },
  {
    id: "hive-4",
    name: "Rivierbocht (Kast D)",
    type: "Warre",
    status: "Active",
    establishedDate: "2025-05-10",
    queenColor: "White",
    strength: "Fair",
    honeySupers: 1
  }
];

export const DEFAULT_INSPECTIONS: HiveInspection[] = [
  {
    id: "insp-1",
    hiveId: "hive-1",
    hiveName: "De Alchemist (Kast A)",
    date: "2026-07-08",
    temperature: 84,
    temperament: "Calm",
    eggsSpotted: true,
    broodPattern: "Excellent",
    diseaseSigns: "Geen ziektes waargenomen. Actief foerageren.",
    honeySupersCount: 3,
    notes: "Kolonie is enorm sterk! Honingkamers zijn voor 80% gevuld en verzegeld. Zeer kalm karakter tijdens de inspectie."
  },
  {
    id: "insp-2",
    hiveId: "hive-2",
    hiveName: "Weidekoningin (Kast B)",
    date: "2026-07-08",
    temperature: 84,
    temperament: "Calm",
    eggsSpotted: true,
    broodPattern: "Good",
    diseaseSigns: "Geen",
    honeySupersCount: 2,
    notes: "Sterk broedpatroon. Volgende week een derde honingkamer toevoegen om de snelle nectarkomst op te vangen."
  },
  {
    id: "insp-3",
    hiveId: "hive-3",
    hiveName: "Oud Bos (Kast C)",
    date: "2026-07-05",
    temperature: 79,
    temperament: "Moderate",
    eggsSpotted: true,
    broodPattern: "Good",
    diseaseSigns: "Geen",
    honeySupersCount: 2,
    notes: "Verse eitjes en larven aanwezig. De bijen zijn licht defensief vanwege de bewolkte lucht."
  },
  {
    id: "insp-4",
    hiveId: "hive-4",
    hiveName: "Rivierbocht (Kast D)",
    date: "2026-07-03",
    temperature: 81,
    temperament: "Calm",
    eggsSpotted: true,
    broodPattern: "Spotty",
    diseaseSigns: "Geen",
    honeySupersCount: 1,
    notes: "Warré kast vordert gestaag. Broedpatroon is nog wat onregelmatig. Wordt nauwgezet gemonitord."
  }
];

export const DEFAULT_HARVESTS: HarvestRecord[] = [
  {
    id: "harv-1",
    batchNumber: "B2026-W01",
    date: "2026-07-09",
    hiveId: "hive-1",
    hiveName: "De Alchemist (Kast A)",
    amountLbs: 20,
    honeyType: "Bloemenhoning",
    moistureContent: 17.2,
    colorGrading: "Extra Licht Amber",
    description: "Eerste extractie van het seizoen. Hoge dichtheid van klaver en wilde frambozenpollen. Prachtig bloemig aroma."
  },
  {
    id: "harv-2",
    batchNumber: "B2026-C01",
    date: "2026-07-09",
    hiveId: "hive-2",
    hiveName: "Weidekoningin (Kast B)",
    amountLbs: 17,
    honeyType: "Klaverhoning",
    moistureContent: 17.5,
    colorGrading: "Wit",
    description: "Klassieke zachte klaverhoning. Ongelooflijk helder en dik met zuivere kruidige tonen."
  },
  {
    id: "harv-3",
    batchNumber: "B2025-B02",
    date: "2025-08-15",
    hiveId: "hive-3",
    hiveName: "Oud Bos (Kast C)",
    amountLbs: 24,
    honeyType: "Boekweithoning",
    moistureContent: 18.1,
    colorGrading: "Donker Amber",
    description: "Laat-zomerse oogst. Rijke, moutige smaak, bijna zoals melasse. Diepe donkere kleur, zeer rijk aan antioxidanten."
  },
  {
    id: "harv-4",
    batchNumber: "B2025-W04",
    date: "2025-07-22",
    hiveId: "hive-1",
    hiveName: "De Alchemist (Kast A)",
    amountLbs: 22,
    honeyType: "Bloemenhoning",
    moistureContent: 17.4,
    colorGrading: "Licht Amber",
    description: "Midden-zomerse bloemenhoning. Complexe mix van guldenroede, klaver en wilde asters."
  },
  {
    id: "harv-5",
    batchNumber: "B2025-C02",
    date: "2025-07-10",
    hiveId: "hive-2",
    hiveName: "Weidekoningin (Kast B)",
    amountLbs: 19,
    honeyType: "Klaverhoning",
    moistureContent: 16.9,
    colorGrading: "Wit",
    description: "Zeer zuivere klaverhoning. Langzaam en koud geslingerd."
  }
];

export const DEFAULT_JOURNAL: JournalPost[] = [
  {
    id: "post-1",
    title: "Start-up imkerij: bijenhal",
    excerpt: "De imkerij is gelegen in een groene omgeving tussen gras en bloemenweide",
    content: `Hams bijtje.`,
    date: "Jul 10, 2026",
    temp: "31°C",
    tag: "ZOMER",
    nectarSource: "CLOVER & BASSWOOD",
    image: IMAGES.journalMain,
    isFeatured: true
  },
  {
    id: "post-2",
    title: "Inspectie bijen",
    excerpt: "Gezondheid van de kast en zwermdrift in de kast wordt nagekeken.",
    content: `Lifting the lids after a long Vermont winter is always filled with nervous anticipation. Winter is a crucible for any apiary, and colony survival depends on a tight cluster, proper moisture management, and sufficient winter honey reserves.

Today, as temperatures crossed a beautiful 56°F under a clear blue sky, I stepped into the apiary. Outside Hive B, workers were already darting into the sunshine, carrying small pellets of bright yellow pollen on their hind legs. A spectacular sight! This means the queen is laying and active brood rearing has begun.

I cracked open the inner cover of Hive B. A warm, healthy odor of beeswax, honey, and propolis wafted into the air. Sliding out a center frame, I spotted the Queen — marked with a brilliant yellow dot on her thorax, indicating her lineage. She was surrounded by a court of attentive workers, moving deliberately across the comb.

Nearby cells were filled with pearly white, C-shaped larvae floating in royal jelly, surrounded by an outer ring of pollen (bee bread) and capped honey. The winter cluster had done its job. We survived the winter with zero colony losses. The season has officially begun.`,
    date: "Apr 28, 2026",
    temp: "31°C",
    tag: "LENTE",
    nectarSource: "DANDELION & WILLOW",
    image: IMAGES.beehivesField
  },
  {
    id: "post-3",
    title: "The Goldenrod Rush and Winter Preparation",
    excerpt: "Autumn in the apiary is characterized by a frantic, bittersweet energy. The goldenrod is blooming, and it is our last honey flow.",
    content: `Autumn in the apiary is characterized by a frantic, bittersweet energy. The fields have turned a brilliant, blazing yellow as wild goldenrod and asters carpet the hillsides. This is our final major nectar flow of the year — a critical period where the bees gather the remaining fuel they need to survive the brutal cold ahead.

If you walk near the hives today, you'll notice a distinct, slightly pungent odor — often compared to wet socks or strong cheese. This is the characteristic smell of goldenrod nectar curing in the comb. The bees are actively fanning, driving off excess water weight until the moisture content drops below 18.6%, making it shelf-stable for the winter months.

During today's inspection, I began preparing the hives for winter. I installed entrance reducers to keep out cold winds and curious field mice looking for a warm home. I also verified their food stores. A single Langstroth colony needs at least 70–80 lbs of capped honey to survive a northern winter. Hive A is well-stocked, but I will need to feed Hive D with thick sugar syrup (a 2:1 ratio) to help them build up their winter cluster reserves.`,
    date: "Sep 14, 2025",
    temp: "68°F",
    tag: "HERFST",
    nectarSource: "GOLDENROD & ASTER",
    image: "/src/assets/images/hive2.jpg" // Reuse jars
  },
  {
    id: "post-4",
    title: "Understanding Colony Democracy and Swarm Intelligence",
    excerpt: "How do 50,000 individual insects make a single, life-or-death decision? Deep inside the hive lies a lesson in collective wisdom.",
    content: `How do 50,000 individual insects make a single, life-or-death decision? Swarming is the natural reproduction of a honeybee colony. When a hive becomes overcrowded, the old queen and roughly half the workers depart in a spectacular cloud, leaving behind several queen cells to hatch and carry on the old colony.

But before they establish a new home, they gather in a temporary cluster on a nearby tree branch. From there, hundreds of scout bees fly out in all directions, scanning the landscape for suitable cavities — hollow trees, old barns, or empty boxes.

When a scout finds a potential home, she returns to the swarm and performs a 'waggle dance' on the surface of the bee cluster. The intensity of her dance reflects the quality of the site. Other scouts observe her, fly out to inspect the site themselves, and if they agree, return to perform the same dance. 

Once a critical quorum of scouts is reached at a single site, a signal ripples through the cluster. The swarm takes flight, moving with absolute unity to their new home. It is a flawless exercise in decentralized decision-making — one that human organizations could learn a great deal from.`,
    date: "Jun 15, 2025",
    temp: "74°F",
    tag: "WINTER",
    nectarSource: "APPLE BLOSSOM",
    image: "/src/assets/images/hive2.jpg" // Reuse beekeeper
  }
];

export const DEFAULT_PRODUCTS: HoneyProduct[] = [
  {
    id: "prod-1",
    name: "Lentehoning",
    subtitle: "Helder, verfijnd en tijdloos zoet.",
    description: "Geoogst uit onze kasten genesteld in de geurige witte klavervelden rond Ham. Deze honing is bijzonder licht van kleur en heeft een klassiek, delicaat zoet profiel. Perfect voor in de thee of over vers fruit.",
    size: "250g",
    price: 12,
    stock: 24,
    image: "src/assets/images/LenteHoning.jpg",
    nectarSources: ["Witte Klaver", "Rode Klaver"],
    notes: "Fijne, zachte zoetheid met hints van verse weidekruiden en een milde vanille-ondertoon."
  },
  {
    id: "prod-2",
    name: "Zomerhoning",
    subtitle: "Een vloeibaar verslag van seizoen, bodem en zon.",
    description: "Onze kenmerkende honing, met de hand koud geslingerd in kleine batches. Deze rauwe, pure honing weerspiegelt de diverse wilde bloemen die in de vroege zomer bloeien in onze weiden in Ham. Rijk, complex en heerlijk bloemig.",
    size: "250g",
    price: 10,
    stock: 18,
    image: "/src/assets/images/ZomerHoning.jpg",
    nectarSources: ["Klaver", "Guldenroede", "Wilde Aster", "Framboos"],
    notes: "Zachte bloemige tonen met een lichte, boterachtige afdronk en een vleugje bosbessen."
  },
  {
    id: "prod-3",
    name: "Aziatische hoornaar val",
    subtitle: "Help het bestrijden van de aziatische hoornaar, te verkrijgen bij ons.",
    description: "Onze kenmerkende honing, met de hand koud geslingerd in kleine batches. Deze rauwe, pure honing weerspiegelt de diverse wilde bloemen die in de vroege zomer bloeien in onze weiden in Ham. Rijk, complex en heerlijk bloemig.",
    size: "250g",
    price: 10,
    stock: 18,
    image: "/src/assets/images/ZomerHoning.jpg",
    nectarSources: ["Klaver", "Guldenroede", "Wilde Aster", "Framboos"],
    notes: "Zachte bloemige tonen met een lichte, boterachtige afdronk en een vleugje bosbessen."
  }
];
