import { useState, useEffect } from "react";
import {
  GameData,
  ActivityLog,
  Ingredient,
  Food,
  Seed,
  Insect,
  Fish,
  Location,
} from "../types";
import gameDataJson from "../data/gameData.json";

export function useGameData() {
  const [gameData, setGameData] = useState<GameData>(gameDataJson as GameData);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("heartopiaData");
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Ensure new properties exist
      setGameData({
        ...parsedData,
        insects: parsedData.insects || [],
        fish: parsedData.fish || [],
        locations: parsedData.locations || gameDataJson.locations || [],
      });
    }
    const savedLogs = localStorage.getItem("heartopiaLogs");
    if (savedLogs) {
      setActivityLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save data to localStorage
  const saveData = (data: GameData) => {
    setGameData(data);
    localStorage.setItem("heartopiaData", JSON.stringify(data));
  };

  // Add activity log with detailed information
  const addLog = (
    type: ActivityLog["type"],
    itemType: ActivityLog["itemType"],
    itemName: string,
    details: any,
  ) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      type,
      itemType,
      itemName,
      details,
      timestamp: Date.now(),
    };
    const newLogs = [newLog, ...activityLogs].slice(0, 100);
    setActivityLogs(newLogs);
    localStorage.setItem("heartopiaLogs", JSON.stringify(newLogs));
  };

  // CRUD Operations - Ingredients
  const addIngredient = (ingredient: Ingredient) => {
    const newIngredient = {
      ...ingredient,
      id: Math.max(...gameData.ingredients.map((i) => i.id), 0) + 1,
    };
    saveData({
      ...gameData,
      ingredients: [...gameData.ingredients, newIngredient],
    });
    addLog("add", "ingredient", newIngredient.name, { data: newIngredient });
  };

  const updateIngredient = (
    ingredient: Ingredient,
    oldIngredient: Ingredient,
  ) => {
    saveData({
      ...gameData,
      ingredients: gameData.ingredients.map((i) =>
        i.id === ingredient.id ? ingredient : i,
      ),
    });
    addLog("edit", "ingredient", ingredient.name, {
      before: oldIngredient,
      after: ingredient,
    });
  };

  const deleteIngredient = (id: number) => {
    const ingredient = gameData.ingredients.find((i) => i.id === id);
    if (ingredient) {
      saveData({
        ...gameData,
        ingredients: gameData.ingredients.filter((i) => i.id !== id),
      });
      addLog("delete", "ingredient", ingredient.name, { data: ingredient });
    }
  };

  // CRUD Operations - Foods
  const addFood = (food: Food) => {
    const newFood = {
      ...food,
      id: Math.max(...gameData.foods.map((f) => f.id), 0) + 1,
    };
    saveData({
      ...gameData,
      foods: [...gameData.foods, newFood],
    });
    addLog("add", "food", newFood.name, { data: newFood });
  };

  const updateFood = (food: Food, oldFood: Food) => {
    saveData({
      ...gameData,
      foods: gameData.foods.map((f) => (f.id === food.id ? food : f)),
    });
    addLog("edit", "food", food.name, {
      before: oldFood,
      after: food,
    });
  };

  const deleteFood = (id: number) => {
    const food = gameData.foods.find((f) => f.id === id);
    if (food) {
      saveData({
        ...gameData,
        foods: gameData.foods.filter((f) => f.id !== id),
      });
      addLog("delete", "food", food.name, { data: food });
    }
  };

  // CRUD Operations - Seeds
  const addSeed = (seed: Seed) => {
    const newSeed = {
      ...seed,
      id: Math.max(...gameData.seeds.map((s) => s.id), 0) + 1,
    };
    saveData({
      ...gameData,
      seeds: [...gameData.seeds, newSeed],
    });
    addLog("add", "seed", newSeed.name, { data: newSeed });
  };

  const updateSeed = (seed: Seed, oldSeed: Seed) => {
    saveData({
      ...gameData,
      seeds: gameData.seeds.map((s) => (s.id === seed.id ? seed : s)),
    });
    addLog("edit", "seed", seed.name, {
      before: oldSeed,
      after: seed,
    });
  };

  const deleteSeed = (id: number) => {
    const seed = gameData.seeds.find((s) => s.id === id);
    if (seed) {
      saveData({
        ...gameData,
        seeds: gameData.seeds.filter((s) => s.id !== id),
      });
      addLog("delete", "seed", seed.name, { data: seed });
    }
  };

  // CRUD Operations - Insects
  const addInsect = (insect: Insect) => {
    const insects = gameData.insects || [];
    const newInsect = {
      ...insect,
      id: Math.max(...insects.map((i) => i.id), 0) + 1,
    };
    saveData({
      ...gameData,
      insects: [...insects, newInsect],
    });
    addLog("add", "insect", newInsect.name, { data: newInsect });
  };

  const updateInsect = (insect: Insect, oldInsect: Insect) => {
    const insects = gameData.insects || [];
    saveData({
      ...gameData,
      insects: insects.map((i) => (i.id === insect.id ? insect : i)),
    });
    addLog("edit", "insect", insect.name, {
      before: oldInsect,
      after: insect,
    });
  };

  const deleteInsect = (id: number) => {
    const insects = gameData.insects || [];
    const insect = insects.find((i) => i.id === id);
    if (insect) {
      saveData({
        ...gameData,
        insects: insects.filter((i) => i.id !== id),
      });
      addLog("delete", "insect", insect.name, { data: insect });
    }
  };

  // CRUD Operations - Fish
  const addFish = (fish: Fish) => {
    const fishList = gameData.fish || [];
    const newFish = {
      ...fish,
      id: Math.max(...fishList.map((f) => f.id), 0) + 1,
    };
    saveData({
      ...gameData,
      fish: [...fishList, newFish],
    });
    addLog("add", "fish", newFish.name, { data: newFish });
  };

  const updateFish = (fish: Fish, oldFish: Fish) => {
    const fishList = gameData.fish || [];
    saveData({
      ...gameData,
      fish: fishList.map((f) => (f.id === fish.id ? fish : f)),
    });
    addLog("edit", "fish", fish.name, {
      before: oldFish,
      after: fish,
    });
  };

  const deleteFish = (id: number) => {
    const fishList = gameData.fish || [];
    const fish = fishList.find((f) => f.id === id);
    if (fish) {
      saveData({
        ...gameData,
        fish: fishList.filter((f) => f.id !== id),
      });
      addLog("delete", "fish", fish.name, { data: fish });
    }
  };

  // CRUD Operations - Locations
  const addLocation = (location: Location) => {
    const locations = gameData.locations || [];
    saveData({
      ...gameData,
      locations: [...locations, location],
    });
    addLog("add", "location", location.name, { data: location });
  };

  const updateLocation = (location: Location, oldLocation: Location) => {
    const locations = gameData.locations || [];
    saveData({
      ...gameData,
      locations: locations.map((l) => (l.id === location.id ? location : l)),
    });
    addLog("edit", "location", location.name, {
      before: oldLocation,
      after: location,
    });
  };

  const deleteLocation = (id: string) => {
    const locations = gameData.locations || [];
    const location = locations.find((l) => l.id === id);
    if (location) {
      saveData({
        ...gameData,
        locations: locations.filter((l) => l.id !== id),
      });
      addLog("delete", "location", location.name, { data: location });
    }
  };

  // Data Sync Operations
  const exportData = () => {
    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `heartopia-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addLog("edit", "ingredient", "Data Export", {
      details: "Exported all data to JSON file",
      count: {
        ingredients: gameData.ingredients.length,
        foods: gameData.foods.length,
        seeds: gameData.seeds.length,
        insects: gameData.insects?.length || 0,
        fish: gameData.fish?.length || 0,
        locations: gameData.locations?.length || 0,
      },
    });
  };

  const importData = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);

          // Validate data structure
          if (
            !importedData.ingredients ||
            !importedData.foods ||
            !importedData.seeds
          ) {
            throw new Error("Invalid data format: missing required fields");
          }

          // Merge with existing data structure
          const newData: GameData = {
            ingredients: importedData.ingredients || [],
            foods: importedData.foods || [],
            seeds: importedData.seeds || [],
            insects: importedData.insects || [],
            fish: importedData.fish || [],
            locations: importedData.locations || gameDataJson.locations || [],
          };

          saveData(newData);
          addLog("edit", "ingredient", "Data Import", {
            details: "Imported data from JSON file",
            count: {
              ingredients: newData.ingredients.length,
              foods: newData.foods.length,
              seeds: newData.seeds.length,
              insects: newData.insects.length,
              fish: newData.fish.length,
              locations: newData.locations.length,
            },
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const resetToDefault = () => {
    const defaultData: GameData = {
      ...(gameDataJson as GameData),
      insects: (gameDataJson as any).insects || [],
      fish: (gameDataJson as any).fish || [],
      locations: (gameDataJson as any).locations || [],
    };

    saveData(defaultData);
    addLog("edit", "ingredient", "Data Reset", {
      details: "Reset all data to default from gameData.json",
      count: {
        ingredients: defaultData.ingredients.length,
        foods: defaultData.foods.length,
        seeds: defaultData.seeds.length,
        insects: defaultData.insects.length,
        fish: defaultData.fish.length,
        locations: defaultData.locations.length,
      },
    });
  };

  const clearLogs = () => {
    setActivityLogs([]);
    localStorage.removeItem("heartopiaLogs");
  };

  const deleteLog = (logId: string) => {
    const updatedLogs = activityLogs.filter((log) => log.id !== logId);
    setActivityLogs(updatedLogs);
    localStorage.setItem("heartopiaLogs", JSON.stringify(updatedLogs));
  };

  return {
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
    exportData,
    importData,
    resetToDefault,
    clearLogs,
    deleteLog,
  };
}
