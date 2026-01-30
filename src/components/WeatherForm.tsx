import { useState } from "react";
import { Weather } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";

interface WeatherFormProps {
  weather: Weather | null;
  onSave: (weather: Weather) => void;
  onCancel: () => void;
}

export function WeatherForm({ weather, onSave, onCancel }: WeatherFormProps) {
  const [formData, setFormData] = useState<Weather>(
    weather || {
      id: 0,
      name: "",
      image: "",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Weather Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
          placeholder="e.g., Sunny, Rainy, Cloudy"
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
          {weather ? "Update" : "Add"} Weather
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
