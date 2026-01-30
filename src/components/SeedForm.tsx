import { useState, useEffect } from "react";
import { Seed, Hobby, Time } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";

interface SeedFormProps {
  seed?: Seed;
  hobbies: Hobby[];
  times: Time[];
  onSave: (seed: Seed) => void;
  onCancel: () => void;
}

export function SeedForm({
  seed,
  hobbies,
  times,
  onSave,
  onCancel,
}: SeedFormProps) {
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sell Price
          </label>
          <input
            type="number"
            value={formData.sell_price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                sell_price: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            min="0"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Growth Time (minutes)
          </label>
          <input
            type="number"
            value={formData.growth_time || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                growth_time: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            min="0"
            placeholder="e.g., 30, 60, 120"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <select
            value={formData.time || ""}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">None</option>
            {times
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((t) => (
                <option key={t.id} value={t.id.toString()}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hobby
          </label>
          <select
            value={formData.hobby_name || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hobby_name: e.target.value || undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">None</option>
            {hobbies
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((h) => (
                <option key={h.id} value={h.name}>
                  {h.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hobby Level
          </label>
          <input
            type="number"
            min="0"
            value={formData.hobby_level || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hobby_level: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Level"
          />
        </div>
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
