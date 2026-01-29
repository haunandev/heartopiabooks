import { useState, useEffect } from "react";
import { Ingredient } from "../types";
import { Button } from "./Button";
import { Star } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

interface IngredientFormProps {
  ingredient?: Ingredient;
  onSave: (ingredient: Ingredient) => void;
  onCancel: () => void;
}

export function IngredientForm({
  ingredient,
  onSave,
  onCancel,
}: IngredientFormProps) {
  const [formData, setFormData] = useState<Ingredient>({
    id: 0,
    name: "",
    sell_price: null,
    buy_price: null,
    source: "seed",
    image: "default.png",
  });

  useEffect(() => {
    if (ingredient) {
      setFormData(ingredient);
    }
  }, [ingredient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sell Price (non-seed types) */}
        {formData.source !== "seed" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sell Price
            </label>
            <input
              type="number"
              value={formData.sell_price ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        )}

        <div className={formData.source === "seed" ? "col-span-2" : ""}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buy Price
          </label>
          <input
            type="number"
            value={formData.buy_price ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                buy_price: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Star Sell Prices (seed type only) */}
      {formData.source === "seed" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sell Price per Star
          </label>

          {[1, 2, 3, 4, 5].map((star) => {
            const key = `${star}s` as "1s" | "2s" | "3s" | "4s" | "5s";
            return (
              <div key={star} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-24">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <input
                  type="number"
                  value={formData.sell_price_stars?.[key] ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sell_price_stars: {
                        ...formData.sell_price_stars,
                        [key]: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={`${star} star price`}
                />
              </div>
            );
          })}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source *
        </label>
        <select
          value={formData.source}
          onChange={(e) =>
            setFormData({
              ...formData,
              source: e.target.value as "seed" | "wild" | "buy",
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        >
          <option value="seed">Seed</option>
          <option value="wild">Wild</option>
          <option value="buy">Buy</option>
        </select>
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Image"
        aspectRatio={1}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {ingredient ? "Update" : "Add"} Ingredient
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
