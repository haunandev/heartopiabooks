import { motion } from "framer-motion";
import { Insect, Location } from "../types";
import { Edit, Trash2, Bug, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { calculateCreatureRating, getRatingColor } from "../lib/rating";

interface InsectCardProps {
  insect: Insect;
  locations: Location[];
  onEdit: () => void;
  onDelete: () => void;
}

export function InsectCard({
  insect,
  locations,
  onEdit,
  onDelete,
}: InsectCardProps) {
  const getLocationNames = () => {
    return insect.locations
      .map((locId) => locations.find((l) => l.id === locId)?.name)
      .filter(Boolean);
  };

  const locationNames = getLocationNames();

  const starCount = insect.sell_price["5s"]
    ? 5
    : insect.sell_price["4s"]
      ? 4
      : insect.sell_price["3s"]
        ? 3
        : insect.sell_price["2s"]
          ? 2
          : 1;

  const rating = calculateCreatureRating(insect);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-200 h-full bg-[#faf8f5]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Image with fallback */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {insect.image ? (
                <img
                  src={insect.image}
                  alt={insect.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.querySelector("svg") === null) {
                      const icon = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg",
                      );
                      icon.setAttribute("class", "w-8 h-8 text-white");
                      icon.setAttribute("viewBox", "0 0 24 24");
                      icon.setAttribute("fill", "none");
                      icon.setAttribute("stroke", "currentColor");
                      icon.setAttribute("stroke-width", "2");
                      icon.innerHTML =
                        '<path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6Zm0-10a2 2 0 1 0 0-4M7 10 5.5 7.5M17 10l1.5-2.5"/>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <Bug className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {insect.name}
                  </h4>
                  <span
                    className={`${getRatingColor(rating)} px-2 py-0.5 rounded text-xs font-bold shadow-sm`}
                  >
                    {rating}
                  </span>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < starCount
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Locations */}
              {locationNames.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {locationNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      <MapPin className="w-3 h-3" />
                      {name}
                    </span>
                  ))}
                </div>
              )}

              {/* Prices */}
              <div className="mt-2 space-y-1">
                {Object.entries(insect.sell_price).map(([star, price]) => (
                  <div key={star} className="flex justify-between text-sm">
                    <span className="text-gray-600">{star}:</span>
                    <span className="font-semibold text-green-600">
                      {formatPrice(price)} 💰
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
