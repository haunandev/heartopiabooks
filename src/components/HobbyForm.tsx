import { useState, useEffect } from "react";
import { Hobby, NPC } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";
import { SearchableSelect } from "./SearchableSelect";

interface HobbyFormProps {
  hobby?: Hobby;
  npcs: NPC[];
  onSave: (hobby: Hobby) => void;
  onCancel: () => void;
}

export function HobbyForm({ hobby, npcs, onSave, onCancel }: HobbyFormProps) {
  const [formData, setFormData] = useState<Hobby>({
    id: 0,
    image: "",
    name: "",
    npc_name: "",
    max_level: 1,
  });

  useEffect(() => {
    if (hobby) {
      setFormData(hobby);
    }
  }, [hobby]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const npcOptions = npcs
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((npc) => ({
      value: npc.name,
      label: npc.name,
    }));

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hobby Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          NPC Character *
        </label>
        <SearchableSelect
          options={npcOptions}
          value={formData.npc_name}
          onChange={(value) =>
            setFormData({ ...formData, npc_name: value as string })
          }
          placeholder="Select NPC"
          isMulti={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Level *
        </label>
        <input
          type="number"
          min="1"
          value={formData.max_level}
          onChange={(e) =>
            setFormData({ ...formData, max_level: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          required
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
        <Button type="submit">Save Hobby</Button>
      </div>
    </form>
  );
}
