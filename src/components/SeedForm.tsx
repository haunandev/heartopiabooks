import { useState, useEffect } from "react";
import { Seed } from "../types";
import { Button } from "./Button";

interface SeedFormProps {
  seed?: Seed;
  onSave: (seed: Seed) => void;
  onCancel: () => void;
}

export function SeedForm({ seed, onSave, onCancel }: SeedFormProps) {
  const [formData, setFormData] = useState<Seed>({
    id: 0,
    name: "",
    price: 0,
    image: "default.png",
  });

  useEffect(() => {
    if (seed) {
      setFormData(seed);
    }
  }, [seed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seed Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
          placeholder="e.g., Tomato Seed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price *
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://example.com/image.png"
        />
        {formData.image && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
            </label>
            <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {seed ? "Update" : "Add"} Seed
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
