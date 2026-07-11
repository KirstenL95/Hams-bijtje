/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hive, HiveInspection, HarvestRecord, JournalPost, HoneyProduct } from "../types";

import bij_closeup from "../assets/images/bij_closeup.jpg";
import bijen_aan_kast from "../assets/images/bijen_aan_kast.jpg";
import bloemenweide from "../assets/images/bloemenweide.jpg";
import hoornaarval_voorkant from "../assets/images/hoornaarval_voorkant.jpg";
import hoornaarval_zijkant from "../assets/images/hoornaarval_zijkant.jpg";
import inspectie_kast from "../assets/images/inspectie_kast.jpg";
import kasten_close_up from "../assets/images/kasten_close_up.jpg";
import logo_lentehoning from "../assets/images/logo_lentehoning.jpg";
import logo_rechthoek from "../assets/images/logo_rechthoek.png";
import logo_rond from "../assets/images/logo_rond.jpg";
import logo_zomerhoning from "../assets/images/logo_zomerhoning.jpg";
import weide_met_bloemen from "../assets/images/weide_met_bloemen.jpg";

const allImages:{[key:string]:object} = import.meta.glob(['../assets/images/*.jpeg', '../assets/images/*.jpg', '../assets/images/*.png'], { eager: true});



export const IMAGES:{[key:string]:string} = {
};

for(const [key, value] of Object.entries(allImages)){
  IMAGES[key.split('/').pop()!.split(".")[0]] = value.default;
}



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

import journal_entries from "./journal.json";

export const DEFAULT_JOURNAL: JournalPost[] = journal_entries.journal_entries;

import products from "./products.json";

export const DEFAULT_PRODUCTS: HoneyProduct[] = products.products;
