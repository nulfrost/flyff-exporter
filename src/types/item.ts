import { Job } from "./job";
import { Language } from "./root";

export interface Item {
  id: number;
  name: Language;
  description: Language;
  icon: string;
  class: Job;
  level: number;
  element: string;
  minDefense: number;
  maxDefense: number;
  category: string;
  subcategory: string;
  rarity: string;
  sex: string;
  stack: number;
  buyPrice: number;
  sellPrice: number;
  consumable: boolean;
  premium: boolean;
  shining: boolean;
  tradable: boolean;
  deletable: boolean;
  durationRealTime: boolean;
  transy: number;
  spawns: any[];
}
