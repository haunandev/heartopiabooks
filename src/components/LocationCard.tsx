import { motion } from "framer-motion";
import { Location } from "../types";
import { Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "./Button";

interface LocationCardProps {
  location: Location;
  onEdit: () => void;
  onDelete: () => void;
}

export function LocationCard({
  location,
  onEdit,
  onDelete,
}: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#faf8f5] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg flex items-center justify-center overflow-hidden">
            {location.image ? (
              <img
                key={location.image}
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-purple-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
                }}
              />
            ) : (
              <MapPin className="w-6 h-6 text-purple-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {location.name}
          </h3>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          ID: <span className="font-mono text-gray-700">{location.id}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
