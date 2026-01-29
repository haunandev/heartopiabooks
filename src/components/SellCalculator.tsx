import { useState, useMemo } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Calculator, X, Plus, Trash2, ShoppingCart } from "lucide-react";
import { GameData } from "../types";
import { formatPrice } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface SellCalculatorProps {
  gameData: GameData;
}

interface CartItem {
  id: string;
  category: "ingredients" | "foods" | "insects" | "fish" | "birds";
  name: string;
  quantity: number;
  starRating: string;
  sellPrice: number;
  cost: number;
}

export function SellCalculator({ gameData }: SellCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "ingredients" | "foods" | "insects" | "fish" | "birds"
  >("ingredients");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [starRating, setStarRating] = useState<string>("1s");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate cost for foods
  const calculateFoodCost = (foodName: string): number => {
    const food = gameData.foods?.find((f) => f.name === foodName);
    if (!food) return 0;

    let totalCost = 0;
    food.ingredients.forEach((foodIng) => {
      const ingredient = gameData.ingredients?.find(
        (ing) => ing.name === foodIng.name,
      );
      if (ingredient) {
        let price = 0;
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

  const getItemPrice = (
    category: typeof selectedCategory,
    itemName: string,
    star: string,
  ) => {
    if (category === "ingredients") {
      const item = gameData.ingredients?.find((i) => i.name === itemName);
      if (item) {
        return (
          item.sell_price_stars?.[star as keyof typeof item.sell_price_stars] ||
          item.sell_price ||
          0
        );
      }
    } else if (category === "foods") {
      const item = gameData.foods?.find((f) => f.name === itemName);
      if (item) {
        return item.sell_price[star as keyof typeof item.sell_price] || 0;
      }
    } else if (category === "insects") {
      const item = gameData.insects?.find((i) => i.name === itemName);
      if (item) {
        return item.sell_price[star as keyof typeof item.sell_price] || 0;
      }
    } else if (category === "fish") {
      const item = gameData.fish?.find((f) => f.name === itemName);
      if (item) {
        return item.sell_price[star as keyof typeof item.sell_price] || 0;
      }
    } else if (category === "birds") {
      const item = gameData.birds?.find((b) => b.name === itemName);
      if (item) {
        return item.sell_price[star as keyof typeof item.sell_price] || 0;
      }
    }
    return 0;
  };

  const getItemCost = (
    category: typeof selectedCategory,
    itemName: string,
  ): number => {
    if (category === "ingredients") {
      const item = gameData.ingredients?.find((i) => i.name === itemName);
      return item?.buy_price || 0;
    } else if (category === "foods") {
      return calculateFoodCost(itemName);
    }
    // Insects, fish, and birds have no cost (caught/found)
    return 0;
  };

  const addToCart = () => {
    if (!selectedItem) return;

    const sellPrice = getItemPrice(selectedCategory, selectedItem, starRating);
    const cost = getItemCost(selectedCategory, selectedItem);

    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random()}`,
      category: selectedCategory,
      name: selectedItem,
      quantity,
      starRating,
      sellPrice,
      cost,
    };

    setCart([...cart, newItem]);
    setSelectedItem("");
    setQuantity(1);
    setStarRating("1s");
    setSearchTerm("");
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const totalCost = cart.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0,
    );
    const totalSell = cart.reduce(
      (sum, item) => sum + item.sellPrice * item.quantity,
      0,
    );
    const totalProfit = totalSell - totalCost;
    const profitPercentage =
      totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    return { totalCost, totalSell, totalProfit, profitPercentage };
  };

  const getAvailableStars = () => {
    if (!selectedItem) return [];

    if (selectedCategory === "ingredients") {
      const item = gameData.ingredients?.find((i) => i.name === selectedItem);
      if (item?.sell_price_stars) {
        return Object.keys(item.sell_price_stars);
      }
    } else if (selectedCategory === "foods") {
      const item = gameData.foods?.find((f) => f.name === selectedItem);
      if (item) {
        return Object.keys(item.sell_price).filter(
          (key) =>
            (item.sell_price[key as keyof typeof item.sell_price] || 0) > 0,
        );
      }
    } else if (selectedCategory === "insects") {
      const item = gameData.insects?.find((i) => i.name === selectedItem);
      if (item) {
        return Object.keys(item.sell_price).filter(
          (key) =>
            (item.sell_price[key as keyof typeof item.sell_price] || 0) > 0,
        );
      }
    } else if (selectedCategory === "fish") {
      const item = gameData.fish?.find((f) => f.name === selectedItem);
      if (item) {
        return Object.keys(item.sell_price).filter(
          (key) =>
            (item.sell_price[key as keyof typeof item.sell_price] || 0) > 0,
        );
      }
    } else if (selectedCategory === "birds") {
      const item = gameData.birds?.find((b) => b.name === selectedItem);
      if (item) {
        return Object.keys(item.sell_price).filter(
          (key) =>
            (item.sell_price[key as keyof typeof item.sell_price] || 0) > 0,
        );
      }
    }
    return [];
  };

  const getItems = () => {
    switch (selectedCategory) {
      case "ingredients":
        return gameData.ingredients?.map((i) => i.name) || [];
      case "foods":
        return gameData.foods?.map((f) => f.name) || [];
      case "insects":
        return gameData.insects?.map((i) => i.name) || [];
      case "fish":
        return gameData.fish?.map((f) => f.name) || [];
      case "birds":
        return gameData.birds?.map((b) => b.name) || [];
      default:
        return [];
    }
  };

  const filteredItems = useMemo(() => {
    const items = getItems();
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, selectedCategory, gameData]);

  const handleCategoryChange = (category: typeof selectedCategory) => {
    setSelectedCategory(category);
    setSelectedItem("");
    setStarRating("1s");
    setSearchTerm("");
  };

  const totals = calculateTotals();

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Sell Calculator
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-black/60 z-[9999]"
            />

            {/* Calculator Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.2, y: 0, x: "50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.2, y: 0, x: "50%" }}
              className="fixed top-1/2 left-1/2 z-[10000] w-full max-w-2xl max-h-[90vh]"
            >
              <Card className="bg-white shadow-2xl max-h-[90vh] overflow-hidden">
                <div className="overflow-y-auto max-h-[90vh]">
                  <div className="py-6 px-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-red-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Sell Calculator
                        </h2>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Add Item Form */}
                    <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(
                            [
                              "ingredients",
                              "foods",
                              "insects",
                              "fish",
                              "birds",
                            ] as const
                          ).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleCategoryChange(cat)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === cat
                                  ? "bg-red-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Item Selection with Search */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Item
                        </label>
                        <input
                          type="text"
                          list={`items-${selectedCategory}`}
                          value={searchTerm || selectedItem}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSelectedItem(e.target.value);
                            setStarRating("1s");
                          }}
                          placeholder="Type to search..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <datalist id={`items-${selectedCategory}`}>
                          {filteredItems.map((item) => (
                            <option key={item} value={item} />
                          ))}
                        </datalist>
                      </div>

                      {/* Star Rating & Quantity */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Star Rating */}
                        {selectedItem && getAvailableStars().length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Star Rating
                            </label>
                            <select
                              value={starRating}
                              onChange={(e) => setStarRating(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                              {getAvailableStars().map((star) => (
                                <option key={star} value={star}>
                                  {star.replace("s", "⭐")}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Quantity */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(
                                Math.max(1, parseInt(e.target.value) || 1),
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Add Button */}
                      <Button
                        onClick={addToCart}
                        disabled={!selectedItem}
                        className="w-full"
                        variant="primary"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>

                    {/* Cart Items */}
                    {cart.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <ShoppingCart className="w-5 h-5 text-gray-700" />
                          <h3 className="font-semibold text-gray-900">
                            Cart ({cart.length} items)
                          </h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900 truncate">
                                    {item.name}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                                    {item.starRating.replace("s", "⭐")}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    ×{item.quantity}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                                  {item.cost > 0 && (
                                    <span>
                                      Cost:{" "}
                                      {formatPrice(item.cost * item.quantity)}
                                    </span>
                                  )}
                                  <span className="text-green-600 font-medium">
                                    Sell:{" "}
                                    {formatPrice(
                                      item.sellPrice * item.quantity,
                                    )}{" "}
                                    💰
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Totals */}
                    {cart.length > 0 && (
                      <div className="pt-4 border-t-2 border-gray-300 space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-red-50 p-3 rounded-lg">
                            <div className="text-gray-600 mb-1">Total Cost</div>
                            <div className="text-lg font-bold text-red-700">
                              {formatPrice(totals.totalCost)} 💰
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-gray-600 mb-1">Total Sell</div>
                            <div className="text-lg font-bold text-green-700">
                              {formatPrice(totals.totalSell)} 💰
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 font-medium">
                              Total Profit
                            </span>
                            <span className="text-2xl font-bold text-blue-700">
                              {formatPrice(totals.totalProfit)} 💰
                            </span>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-sm font-semibold ${
                                totals.profitPercentage >= 100
                                  ? "text-green-600"
                                  : totals.profitPercentage >= 50
                                    ? "text-yellow-600"
                                    : "text-orange-600"
                              }`}
                            >
                              {totals.profitPercentage.toFixed(1)}% profit
                              margin
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {cart.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Add items to calculate total profit</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
