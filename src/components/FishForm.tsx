import { useState } from "react";
import { Fish, Location, Weather, Hobby, Time } from "../types";
import { Button } from "./Button";
import { SearchableSelect } from "./SearchableSelect";
import { ImageUpload } from "./ImageUpload";

interface FishFormProps {
  fish: Fish | null;
  locations: Location[];
  weather: Weather[];
  hobbies: Hobby[];
  times: Time[];
  onSave: (fish: Fish) => void;
  onCancel: () => void;
}

export function FishForm({
  fish,
  locations,
  weather,
  hobbies,
  times,
  onSave,
  onCancel,
}: FishFormProps) {
  const [formData, setFormData] = useState<Fish>(
    fish || {
      id: 0,
      name: "",
      sell_price: { "1s": 0 },
      locations: [],
      weather: [],
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

  const weatherOptions = weather.map((w) => ({
    value: w.name,
    label: w.name,
  }));

  const timeOptions = times.map((t) => ({
    value: t.id.toString(),
    label: t.name,
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Weather
        </label>
        <SearchableSelect
          options={weatherOptions}
          value={formData.weather}
          onChange={(value) =>
            setFormData({ ...formData, weather: value as string[] })
          }
          placeholder="Select weather..."
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shadow Size
        </label>
        <select
          value={formData.shadow || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              shadow: e.target.value as
                | "S"
                | "M"
                | "L"
                | "Golden"
                | "Blue"
                | undefined,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Select shadow size</option>
          <option value="S">S - Small</option>
          <option value="M">M - Medium</option>
          <option value="L">L - Large</option>
          <option value="Golden">Golden</option>
          <option value="Blue">Blue</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <SearchableSelect
          options={timeOptions}
          value={formData.time || []}
          onChange={(value) => {
            const timeArray = value as string[];
            setFormData({
              ...formData,
              time: timeArray.length > 0 ? timeArray : undefined,
            });
          }}
          placeholder="Select time periods"
          isMulti={true}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
