import { motion } from "framer-motion";
import { Fish, Location, Weather } from "../types";
import {
  Edit,
  Trash2,
  Fish as FishIcon,
  MapPin,
  Star,
  CloudRain,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { calculateCreatureRating, getRatingColor } from "../lib/rating";

interface FishCardProps {
  fish: Fish;
  locations: Location[];
  weather: Weather[];
  onEdit: () => void;
  onDelete: () => void;
}

export function FishCard({
  fish,
  locations,
  weather,
  onEdit,
  onDelete,
}: FishCardProps) {
  const getLocationNames = () => {
    return fish.locations
      .map((locId) => locations.find((l) => l.id === locId)?.name)
      .filter(Boolean);
  };

  const locationNames = getLocationNames();

  const starCount = fish.sell_price["5s"]
    ? 5
    : fish.sell_price["4s"]
      ? 4
      : fish.sell_price["3s"]
        ? 3
        : fish.sell_price["2s"]
          ? 2
          : 1;

  const rating = calculateCreatureRating(fish);

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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {fish.image ? (
                <img
                  src={fish.image}
                  alt={fish.name}
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
                        '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5M16 17.93a9.77 9.77 0 0 1 0-11.86M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <FishIcon className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {fish.name}
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
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      <MapPin className="w-3 h-3" />
                      {name}
                    </span>
                  ))}
                </div>
              )}

              {/* Weather */}
              {fish.weather && fish.weather.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {fish.weather.map((weatherName) => (
                    <span
                      key={weatherName}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      <CloudRain className="w-3 h-3" />
                      {weatherName}
                    </span>
                  ))}
                </div>
              )}

              {/* Prices */}
              <div className="mt-2 space-y-1">
                {Object.entries(fish.sell_price).map(([star, price]) => (
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
