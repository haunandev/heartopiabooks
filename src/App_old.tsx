import { useState } from "react";
import { Leaf, ChefHat, Package, Search, Heart } from "lucide-react";
import { GameData } from "./types";
import { IngredientCard } from "./components/IngredientCard";
import { FoodCard } from "./components/FoodCard";
import { SeedCard } from "./components/SeedCard";
import { Button } from "./components/Button";
import gameDataJson from "./data/gameData.json";
import "./index.css";

type TabType = "ingredients" | "foods" | "seeds";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("ingredients");
  const [searchQuery, setSearchQuery] = useState("");
  const gameData: GameData = gameDataJson as GameData;

  const filterData = (data: any[], query: string) => {
    if (!query) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const filteredIngredients = filterData(gameData.ingredients, searchQuery);
  const filteredFoods = filterData(gameData.foods, searchQuery);
  const filteredSeeds = filterData(gameData.seeds, searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Heartopia Books
                </h1>
                <p className="text-sm text-gray-600">Game Data Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
          <Button
            variant={activeTab === "ingredients" ? "primary" : "ghost"}
            onClick={() => setActiveTab("ingredients")}
            className="flex-1"
          >
            <Leaf className="w-5 h-5" />
            Ingredients ({gameData.ingredients.length})
          </Button>
          <Button
            variant={activeTab === "foods" ? "primary" : "ghost"}
            onClick={() => setActiveTab("foods")}
            className="flex-1"
          >
            <ChefHat className="w-5 h-5" />
            Foods ({gameData.foods.length})
          </Button>
          <Button
            variant={activeTab === "seeds" ? "primary" : "ghost"}
            onClick={() => setActiveTab("seeds")}
            className="flex-1"
          >
            <Package className="w-5 h-5" />
            Seeds ({gameData.seeds.length})
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "ingredients" &&
            filteredIngredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                ingredient={ingredient}
                seeds={gameData.seeds}
              />
            ))}

          {activeTab === "foods" &&
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                ingredients={gameData.ingredients}
              />
            ))}

          {activeTab === "seeds" &&
            filteredSeeds.map((seed) => <SeedCard key={seed.id} seed={seed} />)}
        </div>

        {/* Empty State */}
        {((activeTab === "ingredients" && filteredIngredients.length === 0) ||
          (activeTab === "foods" && filteredFoods.length === 0) ||
          (activeTab === "seeds" && filteredSeeds.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg">No results found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Made with ❤️ for Heartopia Game • Built with Tauri + React +
            TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
