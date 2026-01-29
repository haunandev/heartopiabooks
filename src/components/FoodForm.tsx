import { useState, useEffect } from "react";
import { Food, FoodIngredient, Ingredient } from "../types";
import { Button } from "./Button";
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

interface FoodFormProps {
  food?: Food;
  ingredients: Ingredient[];
  onSave: (food: Food) => void;
  onCancel: () => void;
}

export function FoodForm({
  food,
  ingredients,
  onSave,
  onCancel,
}: FoodFormProps) {
  const [formData, setFormData] = useState<Food>({
    id: 0,
    name: "",
    ingredients: [],
    sell_price: { "1s": 0 },
    image: "default.png",
  });

  useEffect(() => {
    if (food) {
      setFormData(food);
    }
  }, [food]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: 1 }],
    });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateIngredient = (
    index: number,
    field: keyof FoodIngredient,
    value: any,
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Food Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

      {/* Ingredients List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Ingredients *
          </label>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={addIngredient}
          >
            <Plus className="w-4 h-4" />
            Add Ingredient
          </Button>
        </div>

        <div className="space-y-2">
          {formData.ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={ing.name}
                onChange={(e) =>
                  updateIngredient(index, "name", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select ingredient</option>
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={ing.quantity}
                onChange={(e) =>
                  updateIngredient(index, "quantity", Number(e.target.value))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Qty"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sell Prices */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sell Prices per Star
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              1★ Price *
            </label>
            <input
              type="number"
              value={formData.sell_price["1s"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    "1s": Number(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">2★ Price</label>
            <input
              type="number"
              value={formData.sell_price["2s"] ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    "2s": e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">3★ Price</label>
            <input
              type="number"
              value={formData.sell_price["3s"] ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    "3s": e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">4★ Price</label>
            <input
              type="number"
              value={formData.sell_price["4s"] ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    "4s": e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1">5★ Price</label>
            <input
              type="number"
              value={formData.sell_price["5s"] ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    "5s": e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Image"
        aspectRatio={1}
      />

      <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
        <Button type="submit" variant="primary" className="flex-1">
          {food ? "Update" : "Add"} Food
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
