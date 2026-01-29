import { useState } from "react";
import { Bird, Location } from "../types";
import { Button } from "./Button";
import { SearchableSelect } from "./SearchableSelect";
import { ImageUpload } from "./ImageUpload";

interface BirdFormProps {
  bird: Bird | null;
  locations: Location[];
  onSave: (bird: Bird) => void;
  onCancel: () => void;
}

export function BirdForm({ bird, locations, onSave, onCancel }: BirdFormProps) {
  const [formData, setFormData] = useState<Bird>(
    bird || {
      id: 0,
      name: "",
      sell_price: { "1s": 0 },
      locations: [],
      image: "",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          required
        />
      </div>

      <ImageUpload
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
        label="Image"
        aspectRatio={1}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Locations
        </label>
        <SearchableSelect
          options={locationOptions}
          value={formData.locations}
          onChange={(value) =>
            setFormData({ ...formData, locations: value as string[] })
          }
          placeholder="Select locations..."
          isMulti
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {["1s", "2s", "3s", "4s", "5s"].map((star) => (
          <div key={star}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {star}
            </label>
            <input
              type="number"
              value={
                formData.sell_price[star as keyof typeof formData.sell_price] ||
                ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sell_price: {
                    ...formData.sell_price,
                    [star]: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              min="0"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          Save
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
