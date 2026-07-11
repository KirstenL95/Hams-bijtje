/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Hive {
  id: string;
  name: string;
  type: "Langstroth" | "Top Bar" | "Warre";
  status: "Active" | "Weak" | "Merged" | "Inactive";
  establishedDate: string;
  queenColor: string; // Year mark color (e.g. Yellow, White, Red, Green, Blue)
  strength: "Excellent" | "Good" | "Fair" | "Poor";
  honeySupers: number;
}

export interface HiveInspection {
  id: string;
  hiveId: string;
  hiveName: string;
  date: string;
  temperature: number; // °F
  temperament: "Calm" | "Moderate" | "Aggressive";
  eggsSpotted: boolean;
  broodPattern: "Excellent" | "Good" | "Spotty" | "None";
  diseaseSigns: string;
  honeySupersCount: number;
  notes: string;
}

export interface HarvestRecord {
  id: string;
  batchNumber: string;
  date: string;
  hiveId: string;
  hiveName: string;
  amountLbs: number;
  honeyType: string; // e.g. Clover, Buckwheat, Wildflower
  moistureContent: number; // % (e.g. 17.5)
  colorGrading: string; // e.g. Extra Light Amber, Light Amber, Dark Amber
  description: string;
}

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  temp: string;
  tag: string; // e.g. MID SUMMER, SPRING BLOOM, WINTERING
  nectarSource: string; // e.g. CLOVER & BASSWOOD
  image: string;
  images?: string[];
  isFeatured?: boolean;
}

export interface HoneyProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  size: string; // e.g. 8 OZ, 16 OZ
  price: number;
  stock: number;
  image: string;
  nectarSources: string[];
  notes: string; // Tasting notes
}

export interface CartItem {
  product: HoneyProduct;
  quantity: number;
}
