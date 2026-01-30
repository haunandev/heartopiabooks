import { useState, useEffect } from "react";
import { NPC, Location } from "../types";
import { Button } from "./Button";
import { ImageUpload } from "./ImageUpload";
import { SearchableSelect } from "./SearchableSelect";

interface NPCFormProps {
  npc?: NPC;
  locations: Location[];
  onSave: (npc: NPC) => void;
  onCancel: () => void;
}

export function NPCForm({ npc, locations, onSave, onCancel }: NPCFormProps) {
  const [formData, setFormData] = useState<NPC>({
    id: 0,
    name: "",
    location: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (npc) {
      setFormData(npc);
    }
  }, [npc]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const locationOptions = locations
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((loc) => ({
      value: loc.id,
      label: loc.name,
    }));

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          NPC Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location *
        </label>
        <SearchableSelect
          options={locationOptions}
          value={formData.location}
          onChange={(value) =>
            setFormData({ ...formData, location: value as string })
          }
          placeholder="Select location"
          isMulti={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px]"
          placeholder="Character biography..."
        />
      </div>

      <div>
        <ImageUpload
          value={formData.image || ""}
          onChange={(url) => setFormData({ ...formData, image: url })}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save NPC</Button>
      </div>
    </form>
  );
}
