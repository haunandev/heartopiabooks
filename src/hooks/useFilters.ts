import { useState } from "react";
import {
  Ingredient,
  Food,
  Seed,
  Insect,
  Fish,
  Bird,
  SortOption,
} from "../types";

type TabType =
  | "ingredients"
  | "foods"
  | "seeds"
  | "insects"
  | "fish"
  | "birds"
  | "locations";

export function useFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [starFilter, setStarFilter] = useState<string>("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const resetFilters = () => {
    setSourceFilter("all");
    setStarFilter("all");
    setPriceRangeFilter("all");
  };

  // Filter and search logic
  const filterData = (data: any[], query: string) => {
    if (!query) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const applyFilters = (data: any[], type: TabType) => {
    let filtered = data;

    // Apply search
    filtered = filterData(filtered, searchQuery);

    // Apply specific filters
    if (type === "ingredients" && sourceFilter !== "all") {
      filtered = filtered.filter((i: Ingredient) => i.source === sourceFilter);
    }

    if (type === "foods" && starFilter !== "all") {
      if (starFilter === "1") {
        filtered = filtered.filter((f: Food) => !f.sell_price["2s"]);
      } else if (starFilter === "2") {
        filtered = filtered.filter(
          (f: Food) => f.sell_price["2s"] && !f.sell_price["3s"],
        );
      } else if (starFilter === "3") {
        filtered = filtered.filter(
          (f: Food) => f.sell_price["3s"] && !f.sell_price["4s"],
        );
      } else if (starFilter === "4") {
        filtered = filtered.filter(
          (f: Food) => f.sell_price["4s"] && !f.sell_price["5s"],
        );
      } else if (starFilter === "5") {
        filtered = filtered.filter((f: Food) => f.sell_price["5s"]);
      }
    }

    if (type === "seeds" && priceRangeFilter !== "all") {
      if (priceRangeFilter === "low") {
        filtered = filtered.filter((s: Seed) => s.price < 50);
      } else if (priceRangeFilter === "medium") {
        filtered = filtered.filter((s: Seed) => s.price >= 50 && s.price < 100);
      } else if (priceRangeFilter === "high") {
        filtered = filtered.filter((s: Seed) => s.price >= 100);
      }
    }

    return filtered;
  };

  // Apply sorting
  const applySorting = (
    data: any[],
    type: TabType,
    ingredients?: Ingredient[],
  ) => {
    const sorted = [...data];

    if (sortBy.startsWith("name")) {
      sorted.sort((a, b) => {
        const compare = a.name.localeCompare(b.name);
        return sortBy === "name-asc" ? compare : -compare;
      });
    } else if (sortBy.startsWith("price")) {
      sorted.sort((a, b) => {
        let priceA = 0;
        let priceB = 0;

        if (type === "ingredients") {
          priceA =
            (a as Ingredient).sell_price_stars?.["1s"] ||
            (a as Ingredient).sell_price ||
            0;
          priceB =
            (b as Ingredient).sell_price_stars?.["1s"] ||
            (b as Ingredient).sell_price ||
            0;
        } else if (type === "foods") {
          priceA = (a as Food).sell_price["1s"];
          priceB = (b as Food).sell_price["1s"];
        } else if (type === "seeds") {
          priceA = (a as Seed).price;
          priceB = (b as Seed).price;
        } else if (type === "insects") {
          priceA = (a as Insect).sell_price["1s"];
          priceB = (b as Insect).sell_price["1s"];
        } else if (type === "fish") {
          priceA = (a as Fish).sell_price["1s"];
          priceB = (b as Fish).sell_price["1s"];
        } else if (type === "birds") {
          priceA = (a as Bird).sell_price["1s"];
          priceB = (b as Bird).sell_price["1s"];
        } else if (type === "locations") {
          // Locations don't have price, return 0
          return 0;
        }

        return sortBy === "price-asc" ? priceA - priceB : priceB - priceA;
      });
    } else if (sortBy.startsWith("star")) {
      sorted.sort((a, b) => {
        let starsA = 1;
        let starsB = 1;

        if (type === "foods") {
          const foodA = a as Food;
          const foodB = b as Food;
          starsA =
            (foodA.sell_price["5s"] ? 5 : 0) ||
            (foodA.sell_price["4s"] ? 4 : 0) ||
            (foodA.sell_price["3s"] ? 3 : 0) ||
            (foodA.sell_price["2s"] ? 2 : 0) ||
            1;
          starsB =
            (foodB.sell_price["5s"] ? 5 : 0) ||
            (foodB.sell_price["4s"] ? 4 : 0) ||
            (foodB.sell_price["3s"] ? 3 : 0) ||
            (foodB.sell_price["2s"] ? 2 : 0) ||
            1;
        } else if (type === "insects") {
          const insectA = a as Insect;
          const insectB = b as Insect;
          starsA =
            (insectA.sell_price["5s"] ? 5 : 0) ||
            (insectA.sell_price["4s"] ? 4 : 0) ||
            (insectA.sell_price["3s"] ? 3 : 0) ||
            (insectA.sell_price["2s"] ? 2 : 0) ||
            1;
          starsB =
            (insectB.sell_price["5s"] ? 5 : 0) ||
            (insectB.sell_price["4s"] ? 4 : 0) ||
            (insectB.sell_price["3s"] ? 3 : 0) ||
            (insectB.sell_price["2s"] ? 2 : 0) ||
            1;
        } else if (type === "fish") {
          const fishA = a as Fish;
          const fishB = b as Fish;
          starsA =
            (fishA.sell_price["5s"] ? 5 : 0) ||
            (fishA.sell_price["4s"] ? 4 : 0) ||
            (fishA.sell_price["3s"] ? 3 : 0) ||
            (fishA.sell_price["2s"] ? 2 : 0) ||
            1;
          starsB =
            (fishB.sell_price["5s"] ? 5 : 0) ||
            (fishB.sell_price["4s"] ? 4 : 0) ||
            (fishB.sell_price["3s"] ? 3 : 0) ||
            (fishB.sell_price["2s"] ? 2 : 0) ||
            1;
        } else if (type === "birds") {
          const birdA = a as Bird;
          const birdB = b as Bird;
          starsA =
            (birdA.sell_price["5s"] ? 5 : 0) ||
            (birdA.sell_price["4s"] ? 4 : 0) ||
            (birdA.sell_price["3s"] ? 3 : 0) ||
            (birdA.sell_price["2s"] ? 2 : 0) ||
            1;
          starsB =
            (birdB.sell_price["5s"] ? 5 : 0) ||
            (birdB.sell_price["4s"] ? 4 : 0) ||
            (birdB.sell_price["3s"] ? 3 : 0) ||
            (birdB.sell_price["2s"] ? 2 : 0) ||
            1;
        }

        return sortBy === "star-asc" ? starsA - starsB : starsB - starsA;
      });
    } else if (sortBy.startsWith("profit") && type === "foods" && ingredients) {
      sorted.sort((a, b) => {
        const foodA = a as Food;
        const foodB = b as Food;

        // Calculate cost for 1-star food
        const costA = foodA.ingredients.reduce((sum, ing) => {
          const ingredient = ingredients.find((i) => i.name === ing.name);
          const price =
            ingredient?.sell_price_stars?.["1s"] || ingredient?.sell_price || 0;
          return sum + price * ing.quantity;
        }, 0);

        const costB = foodB.ingredients.reduce((sum, ing) => {
          const ingredient = ingredients.find((i) => i.name === ing.name);
          const price =
            ingredient?.sell_price_stars?.["1s"] || ingredient?.sell_price || 0;
          return sum + price * ing.quantity;
        }, 0);

        const profitA = foodA.sell_price["1s"] - costA;
        const profitB = foodB.sell_price["1s"] - costB;

        return sortBy === "profit-asc" ? profitA - profitB : profitB - profitA;
      });
    }

    return sorted;
  };

  return {
    searchQuery,
    setSearchQuery,
    sourceFilter,
    setSourceFilter,
    starFilter,
    setStarFilter,
    priceRangeFilter,
    setPriceRangeFilter,
    showFilters,
    setShowFilters,
    sortBy,
    setSortBy,
    resetFilters,
    applyFilters,
    applySorting,
  };
}
