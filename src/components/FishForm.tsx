import { useState } from "react";
import { Fish, Location } from "../types";
import { Button } from "./Button";
import { SearchableSelect } from "./SearchableSelect";

interface FishFormProps {
  fish: Fish | null;
  locations: Location[];
  onSave: (fish: Fish) => void;
  onCancel: () => void;
}

export function FishForm({ fish, locations, onSave, onCancel }: FishFormProps) {
  const [formData, setFormData] = useState<Fish>(
    fish || {
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
        />
      </div>

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
