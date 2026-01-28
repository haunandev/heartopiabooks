import { Food, Ingredient } from "../types";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { Star, Edit, Trash2, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

interface FoodCardProps {
  food: Food;
  ingredients: Ingredient[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FoodCard({
  food,
  ingredients,
  onEdit,
  onDelete,
}: FoodCardProps) {
  // Calculate total cost from ingredients using 1-star price for seed types
  const calculateCost = () => {
    let totalCost = 0;
    food.ingredients.forEach((foodIng) => {
      const ingredient = ingredients.find((ing) => ing.name === foodIng.name);
      if (ingredient) {
        let price = 0;
        // Use 1-star price for seed type ingredients, otherwise use buy_price or sell_price
        if (
          ingredient.source === "seed" &&
          ingredient.sell_price_stars?.["1s"]
        ) {
          price = ingredient.sell_price_stars["1s"];
        } else {
          price = ingredient.buy_price || ingredient.sell_price || 0;
        }
        totalCost += price * foodIng.quantity;
      }
    });
    return totalCost;
  };

  const totalCost = calculateCost();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Image with fallback */}
            <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-red-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <ChefHat className="w-10 h-10 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900">{food.name}</h4>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-2 flex flex-wrap gap-1">
                {food.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {ing.name} ×{ing.quantity}
                  </span>
                ))}
              </div>

              {/* Cost */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-semibold text-red-600">
                    {formatPrice(totalCost)} 💰
                  </span>
                </div>
              </div>

              {/* Prices with Profit */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-green-600">
                      {formatPrice(food.sell_price["1s"])} 💰
                    </span>
                  </div>
                  <span className="text-xs font-medium text-blue-600">
                    +{formatPrice(food.sell_price["1s"] - totalCost)} (
                    {Math.round(
                      ((food.sell_price["1s"] - totalCost) / totalCost) * 100,
                    )}
                    %)
                  </span>
                </div>

                {food.sell_price["2s"] && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatPrice(food.sell_price["2s"])} 💰
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      +{formatPrice(food.sell_price["2s"] - totalCost)} (
                      {Math.round(
                        ((food.sell_price["2s"] - totalCost) / totalCost) * 100,
                      )}
                      %)
                    </span>
                  </div>
                )}

                {food.sell_price["3s"] && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatPrice(food.sell_price["3s"])} 💰
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      +{formatPrice(food.sell_price["3s"] - totalCost)} (
                      {Math.round(
                        ((food.sell_price["3s"] - totalCost) / totalCost) * 100,
                      )}
                      %)
                    </span>
                  </div>
                )}

                {food.sell_price["4s"] && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatPrice(food.sell_price["4s"])} 💰
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      +{formatPrice(food.sell_price["4s"] - totalCost)} (
                      {Math.round(
                        ((food.sell_price["4s"] - totalCost) / totalCost) * 100,
                      )}
                      %)
                    </span>
                  </div>
                )}

                {food.sell_price["5s"] && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatPrice(food.sell_price["5s"])} 💰
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      +{formatPrice(food.sell_price["5s"] - totalCost)} (
                      {Math.round(
                        ((food.sell_price["5s"] - totalCost) / totalCost) * 100,
                      )}
                      %)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
