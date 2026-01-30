import { useState, useEffect } from "react";
import { Time } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";

interface TimeFormProps {
  time?: Time;
  onSave: (time: Time) => void;
  onCancel: () => void;
}

export function TimeForm({ time, onSave, onCancel }: TimeFormProps) {
  const [formData, setFormData] = useState<Time>({
    id: 0,
    image: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (time) {
      setFormData(time);
    }
  }, [time]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent min-h-[80px]"
          placeholder="Time description..."
        />
      </div>

      <div>
        <ImageUpload
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Time</Button>
      </div>
    </form>
  );
}
