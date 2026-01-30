export interface Ingredient {
  id: number;
  name: string;
  sell_price: number | null; // For wild/buy type (base price)
  sell_price_stars?: {
    // For seed type (per star)
    "1s"?: number;
    "2s"?: number;
    "3s"?: number;
    "4s"?: number;
    "5s"?: number;
  };
  buy_price: number | null;
  source: "seed" | "wild" | "buy";
  locations: string[]; // Array of location IDs
  time?: string; // Time ID
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface FoodIngredient {
  name: string;
  quantity: number;
}

export interface Food {
  id: number;
  name: string;
  ingredients: FoodIngredient[];
  sell_price: {
    "1s": number;
    "2s"?: number;
    "3s"?: number;
    "4s"?: number;
    "5s"?: number;
  };
  time?: string; // Time ID
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface Seed {
  id: number;
  name: string;
  price: number;
  sell_price?: number;
  growth_time?: number; // in minutes
  time?: string; // Time ID
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface Location {
  id: string;
  name: string;
  image: string;
}

export interface Weather {
  id: number;
  name: string;
  image: string;
}

export interface NPC {
  id: number;
  name: string;
  location: string; // Location ID
  bio: string;
  image?: string;
}

export interface Hobby {
  id: number;
  image: string;
  name: string;
  npc_name: string; // NPC name relation
  max_level: number;
}

export interface Time {
  id: number;
  image: string;
  name: string;
  description: string;
}

export interface Insect {
  id: number;
  name: string;
  sell_price: {
    "1s": number;
    "2s"?: number;
    "3s"?: number;
    "4s"?: number;
    "5s"?: number;
  };
  locations: string[]; // Array of location IDs
  weather: string[]; // Array of weather names
  time?: string[]; // Array of time IDs
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface Fish {
  id: number;
  name: string;
  sell_price: {
    "1s": number;
    "2s"?: number;
    "3s"?: number;
    "4s"?: number;
    "5s"?: number;
  };
  locations: string[]; // Array of location IDs
  weather: string[]; // Array of weather names
  shadow?: "S" | "M" | "L" | "Golden" | "Blue";
  time?: string[]; // Array of time IDs
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface Bird {
  id: number;
  name: string;
  sell_price: {
    "1s": number;
    "2s"?: number;
    "3s"?: number;
    "4s"?: number;
    "5s"?: number;
  };
  locations: string[]; // Array of location IDs
  weather: string[]; // Array of weather names
  time?: string[]; // Array of time IDs
  hobby_level?: number;
  hobby_name?: string; // Hobby name relation
  image: string;
}

export interface GameData {
  ingredients: Ingredient[];
  foods: Food[];
  seeds: Seed[];
  insects: Insect[];
  fish: Fish[];
  birds: Bird[];
  locations: Location[];
  weather: Weather[];
  npc: NPC[];
  hobby: Hobby[];
  time: Time[];
}

export type ActivityType = "add" | "edit" | "delete";
export type ItemType =
  | "ingredient"
  | "food"
  | "seed"
  | "insect"
  | "fish"
  | "bird"
  | "location"
  | "weather"
  | "npc"
  | "hobby"
  | "time";

export interface ActivityLog {
  id: string;
  type: ActivityType;
  itemType: ItemType;
  itemName: string;
  details: {
    data?: any; // For add and delete
    before?: any; // For edit
    after?: any; // For edit
  };
  timestamp: number;
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "star-asc"
  | "star-desc"
  | "profit-asc"
  | "profit-desc";
