import { useState, useEffect } from "react";
import { Seed } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";

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

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Image"
        aspectRatio={1}
      />

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
