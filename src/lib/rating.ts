import { Food, Insect, Fish, Ingredient } from "../types";

// Rating thresholds
const FOOD_RATING_THRESHOLDS = {
  S: 200, // Profit % > 200%
  A: 150, // Profit % > 150%
  B: 100, // Profit % > 100%
  C: 50, // Profit % > 50%
  D: 0, // Profit % > 0%
};

const FISH_INSECT_RATING_THRESHOLDS = {
  S: 500, // Max price > 500
  A: 300, // Max price > 300
  B: 200, // Max price > 200
  C: 100, // Max price > 100
  D: 0, // Max price > 0
};

export type Rating = "S" | "A" | "B" | "C" | "D" | "-";

/**
 * Calculate rating for food based on profit margin
 * @param food Food item
 * @param ingredients List of ingredients for cost calculation
 * @returns Rating (S, A, B, C, D) or "-" if invalid
 */
export function calculateFoodRating(
  food: Food,
  ingredients: Ingredient[],
): Rating {
  const cost = calculateFoodCost(food, ingredients);
  const sellPrice = food.sell_price["1s"] || 0;

  if (cost === 0 || sellPrice === 0) return "-";

  const profit = sellPrice - cost;
  const profitPercent = (profit / cost) * 100;

  if (profitPercent >= FOOD_RATING_THRESHOLDS.S) return "S";
  if (profitPercent >= FOOD_RATING_THRESHOLDS.A) return "A";
  if (profitPercent >= FOOD_RATING_THRESHOLDS.B) return "B";
  if (profitPercent >= FOOD_RATING_THRESHOLDS.C) return "C";
  return "D";
}

/**
 * Calculate food cost based on ingredients
 */
export function calculateFoodCost(
  food: Food,
  ingredients: Ingredient[],
): number {
  let totalCost = 0;
  food.ingredients.forEach((foodIng) => {
    const ingredient = ingredients.find((ing) => ing.name === foodIng.name);
    if (ingredient) {
      let price = 0;
      if (ingredient.source === "seed" && ingredient.sell_price_stars?.["1s"]) {
        price = ingredient.sell_price_stars["1s"];
      } else {
        price = ingredient.buy_price || ingredient.sell_price || 0;
      }
      totalCost += price * foodIng.quantity;
    }
  });
  return totalCost;
}

/**
 * Calculate rating for insects/fish based on 1-star sell price
 * @param item Insect or Fish item
 * @returns Rating (S, A, B, C, D) or "-" if invalid
 */
export function calculateCreatureRating(item: Insect | Fish): Rating {
  const price = item.sell_price["1s"] || 0;
  if (price === 0) return "-";

  if (price >= FISH_INSECT_RATING_THRESHOLDS.S) return "S";
  if (price >= FISH_INSECT_RATING_THRESHOLDS.A) return "A";
  if (price >= FISH_INSECT_RATING_THRESHOLDS.B) return "B";
  if (price >= FISH_INSECT_RATING_THRESHOLDS.C) return "C";
  return "D";
}

/**
 * Get rating color class for styling
 */
export function getRatingColor(rating: Rating): string {
  switch (rating) {
    case "S":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
    case "A":
      return "bg-green-500 text-white";
    case "B":
      return "bg-blue-500 text-white";
    case "C":
      return "bg-yellow-500 text-white";
    case "D":
      return "bg-gray-400 text-white";
    default:
      return "bg-gray-200 text-gray-600";
  }
}

/**
 * Get rating description
 */
export function getRatingDescription(rating: Rating): string {
  switch (rating) {
    case "S":
      return "Exceptional";
    case "A":
      return "Excellent";
    case "B":
      return "Good";
    case "C":
      return "Average";
    case "D":
      return "Below Average";
    default:
      return "Not Rated";
  }
}
