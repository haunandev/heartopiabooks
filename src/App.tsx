import { useState } from "react";
import { Search, X, LayoutGrid, Table } from "lucide-react";
import { IngredientCard } from "./components/IngredientCard";
import { FoodCard } from "./components/FoodCard";
import { SeedCard } from "./components/SeedCard";
import { InsectCard } from "./components/InsectCard";
import { FishCard } from "./components/FishCard";
import { LocationCard } from "./components/LocationCard";
import { DataTable } from "./components/DataTable";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { IngredientForm } from "./components/IngredientForm";
import { FoodForm } from "./components/FoodForm";
import { SeedForm } from "./components/SeedForm";
import { InsectForm } from "./components/InsectForm";
import { FishForm } from "./components/FishForm";
import { LocationForm } from "./components/LocationForm";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { ActivityLog } from "./components/ActivityLog";
import { SortControls } from "./components/SortControls";
import { AppHeader } from "./components/AppHeader";
import { Tabs } from "./components/Tabs";
import { SearchBar } from "./components/SearchBar";
import { AnimatePresence } from "framer-motion";
import { useGameData } from "./hooks/useGameData";
import { useFilters } from "./hooks/useFilters";
import "./index.css";

type TabType =
  | "ingredients"
  | "foods"
  | "seeds"
  | "insects"
  | "fish"
  | "locations";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("ingredients");
  const [viewMode, setViewMode] = useState<"card" | "table">(() => {
    const saved = localStorage.getItem("viewMode");
    return (saved as "card" | "table") || "card";
  });

  // Use custom hooks
  const {
    gameData,
    activityLogs,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addFood,
    updateFood,
    deleteFood,
    addSeed,
    updateSeed,
    deleteSeed,
    addInsect,
    updateInsect,
    deleteInsect,
    addFish,
    updateFish,
    deleteFish,
    addLocation,
    updateLocation,
    deleteLocation,
  } = useGameData();

  const {
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
  } = useFilters();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Confirm Dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");

  // Activity Log states
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Handlers for CRUD operations with modal management
  const handleAddIngredient = (ingredient: any) => {
    addIngredient(ingredient);
    setIsModalOpen(false);
  };

  const handleUpdateIngredient = (ingredient: any) => {
    updateIngredient(ingredient, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteIngredient = (id: number) => {
    setConfirmMessage("Are you sure you want to delete this ingredient?");
    setConfirmAction(() => () => {
      deleteIngredient(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  const handleAddFood = (food: any) => {
    addFood(food);
    setIsModalOpen(false);
  };

  const handleUpdateFood = (food: any) => {
    updateFood(food, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteFood = (id: number) => {
    setConfirmMessage("Are you sure you want to delete this food?");
    setConfirmAction(() => () => {
      deleteFood(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  const handleAddSeed = (seed: any) => {
    addSeed(seed);
    setIsModalOpen(false);
  };

  const handleUpdateSeed = (seed: any) => {
    updateSeed(seed, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteSeed = (id: number) => {
    setConfirmMessage("Are you sure you want to delete this seed?");
    setConfirmAction(() => () => {
      deleteSeed(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  const handleAddInsect = (insect: any) => {
    addInsect(insect);
    setIsModalOpen(false);
  };

  const handleUpdateInsect = (insect: any) => {
    updateInsect(insect, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteInsect = (id: number) => {
    setConfirmMessage("Are you sure you want to delete this insect?");
    setConfirmAction(() => () => {
      deleteInsect(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  const handleAddFish = (fish: any) => {
    addFish(fish);
    setIsModalOpen(false);
  };

  const handleUpdateFish = (fish: any) => {
    updateFish(fish, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteFish = (id: number) => {
    setConfirmMessage("Are you sure you want to delete this fish?");
    setConfirmAction(() => () => {
      deleteFish(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  const handleAddLocation = (location: any) => {
    addLocation(location);
    setIsModalOpen(false);
  };

  const handleUpdateLocation = (location: any) => {
    updateLocation(location, editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteLocation = (id: string) => {
    setConfirmMessage("Are you sure you want to delete this location?");
    setConfirmAction(() => () => {
      deleteLocation(id);
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  // Apply filters and sorting
  const filteredIngredients = applySorting(
    applyFilters(gameData.ingredients || [], "ingredients"),
    "ingredients",
  );
  const filteredFoods = applySorting(
    applyFilters(gameData.foods || [], "foods"),
    "foods",
    gameData.ingredients, // Pass ingredients for profit calculation
  );
  const filteredSeeds = applySorting(
    applyFilters(gameData.seeds || [], "seeds"),
    "seeds",
  );
  const filteredInsects = applySorting(
    applyFilters(gameData.insects || [], "insects"),
    "insects",
  );
  const filteredFish = applySorting(
    applyFilters(gameData.fish || [], "fish"),
    "fish",
  );
  const filteredLocations = applySorting(
    applyFilters(gameData.locations || [], "locations"),
    "locations",
  );
  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      {/* Header */}
      <AppHeader
        activityLogCount={activityLogs.length}
        onOpenLog={() => setIsLogOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            resetFilters();
          }}
          counts={{
            ingredients: gameData.ingredients?.length || 0,
            foods: gameData.foods?.length || 0,
            seeds: gameData.seeds?.length || 0,
            insects: gameData.insects?.length || 0,
            fish: gameData.fish?.length || 0,
            locations: gameData.locations?.length || 0,
          }}
        />

        {/* Search and Action Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onAddNew={openAddModal}
        />

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => {
                setViewMode("card");
                localStorage.setItem("viewMode", "card");
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === "card"
                  ? "bg-red-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setViewMode("table");
                localStorage.setItem("viewMode", "table");
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-red-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => {
                  resetFilters();
                  setShowFilters(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Ingredient Filters */}
            {activeTab === "ingredients" && (
              <>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={sourceFilter === "all" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSourceFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={sourceFilter === "seed" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSourceFilter("seed")}
                  >
                    Seed
                  </Button>
                  <Button
                    variant={sourceFilter === "wild" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSourceFilter("wild")}
                  >
                    Wild
                  </Button>
                  <Button
                    variant={sourceFilter === "buy" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSourceFilter("buy")}
                  >
                    Buy
                  </Button>
                </div>
                <div className="border-t border-gray-200 my-3" />
                <SortControls sortBy={sortBy} onSortChange={setSortBy} />
              </>
            )}

            {/* Food Filters */}
            {activeTab === "foods" && (
              <>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={starFilter === "all" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("all")}
                  >
                    All Stars
                  </Button>
                  <Button
                    variant={starFilter === "1" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("1")}
                  >
                    1★ Only
                  </Button>
                  <Button
                    variant={starFilter === "2" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("2")}
                  >
                    2★ Max
                  </Button>
                  <Button
                    variant={starFilter === "3" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("3")}
                  >
                    3★ Max
                  </Button>
                  <Button
                    variant={starFilter === "4" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("4")}
                  >
                    4★ Max
                  </Button>
                  <Button
                    variant={starFilter === "5" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setStarFilter("5")}
                  >
                    5★ Available
                  </Button>
                </div>
                <div className="border-t border-gray-200 my-3" />
                <SortControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  showStarSort
                  showProfitSort
                />
              </>
            )}

            {/* Seed Filters */}
            {activeTab === "seeds" && (
              <>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={priceRangeFilter === "all" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setPriceRangeFilter("all")}
                  >
                    All Prices
                  </Button>
                  <Button
                    variant={priceRangeFilter === "low" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setPriceRangeFilter("low")}
                  >
                    &lt; 50
                  </Button>
                  <Button
                    variant={
                      priceRangeFilter === "medium" ? "primary" : "ghost"
                    }
                    size="sm"
                    onClick={() => setPriceRangeFilter("medium")}
                  >
                    50 - 99
                  </Button>
                  <Button
                    variant={priceRangeFilter === "high" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setPriceRangeFilter("high")}
                  >
                    ≥ 100
                  </Button>
                </div>
                <div className="border-t border-gray-200 my-3" />
                <SortControls sortBy={sortBy} onSortChange={setSortBy} />
              </>
            )}

            {/* Insect/Fish Filters */}
            {(activeTab === "insects" || activeTab === "fish") && (
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                showStarSort
              />
            )}

            {/* Location Filters */}
            {activeTab === "locations" && (
              <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            )}
          </div>
        )}

        {/* Content Grid */}
        {viewMode === "card" ? (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === "ingredients" &&
                filteredIngredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
                    seeds={gameData.seeds}
                    onEdit={() => openEditModal(ingredient)}
                    onDelete={() => handleDeleteIngredient(ingredient.id)}
                  />
                ))}

              {activeTab === "foods" &&
                filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    ingredients={gameData.ingredients}
                    onEdit={() => openEditModal(food)}
                    onDelete={() => handleDeleteFood(food.id)}
                  />
                ))}

              {activeTab === "seeds" &&
                filteredSeeds.map((seed) => (
                  <SeedCard
                    key={seed.id}
                    seed={seed}
                    onEdit={() => openEditModal(seed)}
                    onDelete={() => handleDeleteSeed(seed.id)}
                  />
                ))}

              {activeTab === "insects" &&
                filteredInsects.map((insect) => (
                  <InsectCard
                    key={insect.id}
                    insect={insect}
                    locations={gameData.locations || []}
                    onEdit={() => openEditModal(insect)}
                    onDelete={() => handleDeleteInsect(insect.id)}
                  />
                ))}

              {activeTab === "fish" &&
                filteredFish.map((fish) => (
                  <FishCard
                    key={fish.id}
                    fish={fish}
                    locations={gameData.locations || []}
                    onEdit={() => openEditModal(fish)}
                    onDelete={() => handleDeleteFish(fish.id)}
                  />
                ))}

              {activeTab === "locations" &&
                filteredLocations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onEdit={() => openEditModal(location)}
                    onDelete={() => handleDeleteLocation(location.id)}
                  />
                ))}
            </div>
          </AnimatePresence>
        ) : (
          <>
            {activeTab === "ingredients" && (
              <DataTable
                data={filteredIngredients}
                type="ingredients"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteIngredient(item.id)}
              />
            )}

            {activeTab === "foods" && (
              <DataTable
                data={filteredFoods}
                type="foods"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteFood(item.id)}
                ingredients={gameData.ingredients}
              />
            )}

            {activeTab === "seeds" && (
              <DataTable
                data={filteredSeeds}
                type="seeds"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteSeed(item.id)}
              />
            )}

            {activeTab === "insects" && (
              <DataTable
                data={filteredInsects}
                type="insects"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteInsect(item.id)}
                locations={gameData.locations}
              />
            )}

            {activeTab === "fish" && (
              <DataTable
                data={filteredFish}
                type="fish"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteFish(item.id)}
                locations={gameData.locations}
              />
            )}

            {activeTab === "locations" && (
              <DataTable
                data={filteredLocations}
                type="locations"
                onEdit={openEditModal}
                onDelete={(item: any) => handleDeleteLocation(item.id)}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {((activeTab === "ingredients" && filteredIngredients.length === 0) ||
          (activeTab === "foods" && filteredFoods.length === 0) ||
          (activeTab === "seeds" && filteredSeeds.length === 0) ||
          (activeTab === "insects" && filteredInsects.length === 0) ||
          (activeTab === "fish" && filteredFish.length === 0) ||
          (activeTab === "locations" && filteredLocations.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg">No results found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try a different search term or adjust filters
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
          {/* creator */}
          <p className="text-center text-gray-500 text-xs mt-1">
            by{" "}
            <a href="https://github.com/haunandev/heartopiabooks">HaunanDev</a>
          </p>
        </div>
      </footer>

      {/* Modals */}
      {activeTab === "ingredients" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Ingredient" : "Add New Ingredient"}
        >
          <IngredientForm
            ingredient={editingItem}
            onSave={editingItem ? handleUpdateIngredient : handleAddIngredient}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {activeTab === "foods" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Food" : "Add New Food"}
          size="lg"
        >
          <FoodForm
            food={editingItem}
            ingredients={gameData.ingredients}
            onSave={editingItem ? handleUpdateFood : handleAddFood}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {activeTab === "seeds" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Seed" : "Add New Seed"}
        >
          <SeedForm
            seed={editingItem}
            onSave={editingItem ? handleUpdateSeed : handleAddSeed}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {activeTab === "insects" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Insect" : "Add New Insect"}
        >
          <InsectForm
            insect={editingItem}
            locations={gameData.locations || []}
            onSave={editingItem ? handleUpdateInsect : handleAddInsect}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {activeTab === "fish" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Fish" : "Add New Fish"}
        >
          <FishForm
            fish={editingItem}
            locations={gameData.locations || []}
            onSave={editingItem ? handleUpdateFish : handleAddFish}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {activeTab === "locations" && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Location" : "Add New Location"}
        >
          <LocationForm
            location={editingItem}
            onSave={editingItem ? handleUpdateLocation : handleAddLocation}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Delete"
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setIsConfirmOpen(false)}
      />

      {/* Activity Log */}
      <ActivityLog
        logs={activityLogs}
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
      />
    </div>
  );
}

export default App;
