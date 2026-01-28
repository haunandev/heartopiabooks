import { motion } from "framer-motion";
import { Fish, Location } from "../types";
import { Edit, Trash2, Fish as FishIcon, MapPin } from "lucide-react";
import { Button } from "./Button";

interface FishCardProps {
  fish: Fish;
  locations: Location[];
  onEdit: () => void;
  onDelete: () => void;
}

export function FishCard({ fish, locations, onEdit, onDelete }: FishCardProps) {
  const getLocationNames = () => {
    return fish.locations
      .map((locId) => locations.find((l) => l.id === locId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const getStarCount = () => {
    if (fish.sell_price["5s"]) return 5;
    if (fish.sell_price["4s"]) return 4;
    if (fish.sell_price["3s"]) return 3;
    if (fish.sell_price["2s"]) return 2;
    return 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center">
        {fish.image ? (
          <img
            src={fish.image}
            alt={fish.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FishIcon className="w-20 h-20 text-blue-600" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {fish.name}
        </h3>

        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < getStarCount() ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Locations */}
        <div className="mb-3">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{getLocationNames() || "No location"}</span>
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-1 mb-3">
          {Object.entries(fish.sell_price).map(([star, price]) => (
            <div key={star} className="flex justify-between text-sm">
              <span className="text-gray-600">{star}:</span>
              <span className="font-medium text-gray-900">{price}g</span>
            </div>
          ))}
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
