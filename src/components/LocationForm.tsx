import { useState } from "react";
import { Location } from "../types";
import { Button } from "./Button";

interface LocationFormProps {
  location: Location | null;
  onSave: (location: Location) => void;
  onCancel: () => void;
}

export function LocationForm({
  location,
  onSave,
  onCancel,
}: LocationFormProps) {
  const [formData, setFormData] = useState<Location>(
    location || {
      id: "",
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
          Location ID
        </label>
        <input
          type="text"
          value={formData.id}
          onChange={(e) =>
            setFormData({
              ...formData,
              id: e.target.value.toLowerCase().replace(/\s+/g, "-"),
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          placeholder="e.g., mountain, forest"
          required
          disabled={!!location} // Disable editing ID for existing locations
        />
        <p className="text-xs text-gray-500 mt-1">
          {location
            ? "ID cannot be changed"
            : "Use lowercase with dashes (e.g., 'dark-forest')"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          placeholder="e.g., Mountain, Dark Forest"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          placeholder="https://example.com/image.jpg"
        />
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
