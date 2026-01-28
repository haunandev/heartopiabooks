import {
  Leaf,
  ChefHat,
  Package,
  Bug,
  Fish as FishIcon,
  MapPin,
} from "lucide-react";
import { Button } from "./Button";

type TabType =
  | "ingredients"
  | "foods"
  | "seeds"
  | "insects"
  | "fish"
  | "locations";

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    ingredients: number;
    foods: number;
    seeds: number;
    insects: number;
    fish: number;
    locations: number;
  };
}

export function Tabs({ activeTab, onTabChange, counts }: TabsProps) {
  return (
    <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm overflow-x-auto">
      <Button
        variant={activeTab === "ingredients" ? "primary" : "ghost"}
        onClick={() => onTabChange("ingredients")}
        className="flex-1 min-w-[120px]"
      >
        <Leaf className="w-5 h-5" />
        Ingredients ({counts.ingredients || 0})
      </Button>
      <Button
        variant={activeTab === "foods" ? "primary" : "ghost"}
        onClick={() => onTabChange("foods")}
        className="flex-1 min-w-[120px]"
      >
        <ChefHat className="w-5 h-5" />
        Foods ({counts.foods || 0})
      </Button>
      <Button
        variant={activeTab === "seeds" ? "primary" : "ghost"}
        onClick={() => onTabChange("seeds")}
        className="flex-1 min-w-[120px]"
      >
        <Package className="w-5 h-5" />
        Seeds ({counts.seeds || 0})
      </Button>
      <Button
        variant={activeTab === "insects" ? "primary" : "ghost"}
        onClick={() => onTabChange("insects")}
        className="flex-1 min-w-[120px]"
      >
        <Bug className="w-5 h-5" />
        Insects ({counts.insects || 0})
      </Button>
      <Button
        variant={activeTab === "fish" ? "primary" : "ghost"}
        onClick={() => onTabChange("fish")}
        className="flex-1 min-w-[120px]"
      >
        <FishIcon className="w-5 h-5" />
        Fish ({counts.fish || 0})
      </Button>
      <Button
        variant={activeTab === "locations" ? "primary" : "ghost"}
        onClick={() => onTabChange("locations")}
        className="flex-1 min-w-[120px]"
      >
        <MapPin className="w-5 h-5" />
        Locations ({counts.locations || 0})
      </Button>
    </div>
  );
}
