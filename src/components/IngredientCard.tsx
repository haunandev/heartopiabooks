import { Ingredient, Seed } from "../types";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { Leaf, ShoppingCart, Sprout, Edit, Trash2, Star } from "lucide-react";
import { motion } from "framer-motion";

interface IngredientCardProps {
  ingredient: Ingredient;
  seeds: Seed[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export function IngredientCard({
  ingredient,
  seeds,
  onEdit,
  onDelete,
}: IngredientCardProps) {
  const sourceIcons = {
    seed: <Sprout className="w-4 h-4" />,
    wild: <Leaf className="w-4 h-4" />,
    buy: <ShoppingCart className="w-4 h-4" />,
  };

  const sourceColors = {
    seed: "bg-green-100 text-green-700",
    wild: "bg-amber-100 text-amber-700",
    buy: "bg-blue-100 text-blue-700",
  };

  // Find matching seed for seed-type ingredients
  const matchingSeed =
    ingredient.source === "seed"
      ? seeds.find((seed) => seed.name === `${ingredient.name} Seed`)
      : null;

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
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {ingredient.image ? (
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.querySelector("svg") === null) {
                      const icon = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg",
                      );
                      icon.setAttribute("class", "w-8 h-8 text-white");
                      icon.setAttribute("viewBox", "0 0 24 24");
                      icon.setAttribute("fill", "none");
                      icon.setAttribute("stroke", "currentColor");
                      icon.setAttribute("stroke-width", "2");
                      icon.innerHTML =
                        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <Leaf className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900 truncate">
                  {ingredient.name}
                </h4>
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

              <div className="mt-2 space-y-1">
                {/* Sell price for seed type with stars */}
                {ingredient.source === "seed" &&
                  ingredient.sell_price_stars && (
                    <div className="space-y-1">
                      {ingredient.sell_price_stars["1s"] && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-gray-600">Sell:</span>
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(ingredient.sell_price_stars["1s"])} 💰
                          </span>
                        </div>
                      )}
                      {ingredient.sell_price_stars["2s"] && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(ingredient.sell_price_stars["2s"])} 💰
                          </span>
                        </div>
                      )}
                      {ingredient.sell_price_stars["3s"] && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3].map((i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(ingredient.sell_price_stars["3s"])} 💰
                          </span>
                        </div>
                      )}
                      {ingredient.sell_price_stars["4s"] && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4].map((i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(ingredient.sell_price_stars["4s"])} 💰
                          </span>
                        </div>
                      )}
                      {ingredient.sell_price_stars["5s"] && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-green-600">
                            {formatPrice(ingredient.sell_price_stars["5s"])} 💰
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                {/* Sell price for wild/buy type */}
                {ingredient.source !== "seed" &&
                  ingredient.sell_price !== null && (
                    <div className="text-sm">
                      <span className="text-gray-600">Sell: </span>
                      <span className="font-semibold text-green-600">
                        {formatPrice(ingredient.sell_price)} 💰
                      </span>
                    </div>
                  )}

                {ingredient.buy_price !== null && (
                  <div className="text-sm">
                    <span className="text-gray-600">Buy: </span>
                    <span className="font-semibold text-red-600">
                      {formatPrice(ingredient.buy_price)} 💰
                    </span>
                  </div>
                )}

                {matchingSeed && (
                  <div className="text-sm">
                    <span className="text-gray-600">Seed: </span>
                    <span className="font-semibold text-blue-600">
                      {formatPrice(matchingSeed.price)} 💰
                    </span>
                  </div>
                )}

                {matchingSeed &&
                  ingredient.source === "seed" &&
                  ingredient.sell_price_stars?.["1s"] && (
                    <div className="text-sm pt-1 border-t border-gray-200 mt-2">
                      <span className="text-gray-600">Profit (1★): </span>
                      <span className="font-semibold text-purple-600">
                        +
                        {formatPrice(
                          ingredient.sell_price_stars["1s"] -
                            matchingSeed.price,
                        )}{" "}
                        💰
                      </span>
                      <span className="text-xs text-purple-600 ml-1">
                        (
                        {Math.round(
                          ((ingredient.sell_price_stars["1s"] -
                            matchingSeed.price) /
                            matchingSeed.price) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                  )}
              </div>

              <div
                className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sourceColors[ingredient.source]}`}
              >
                {sourceIcons[ingredient.source]}
                <span className="capitalize">{ingredient.source}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
