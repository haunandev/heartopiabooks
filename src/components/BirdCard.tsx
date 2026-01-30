import { motion } from "framer-motion";
import { Bird, Location, Weather, Hobby, Time } from "../types";
import {
  Edit,
  Trash2,
  Bird as BirdIcon,
  MapPin,
  Star,
  CloudRain,
  Heart,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { calculateCreatureRating, getRatingColor } from "../lib/rating";

interface BirdCardProps {
  bird: Bird;
  locations: Location[];
  weather: Weather[];
  hobbies?: Hobby[];
  times?: Time[];
  onEdit: () => void;
  onDelete: () => void;
}

export function BirdCard({
  bird,
  locations,
  onEdit,
  onDelete,
  hobbies,
  times,
}: BirdCardProps) {
  const getLocationNames = () => {
    return bird.locations
      .map((locId) => locations.find((l) => l.id === locId)?.name)
      .filter(Boolean);
  };

  const locationNames = getLocationNames();

  const starCount = bird.sell_price["5s"]
    ? 5
    : bird.sell_price["4s"]
      ? 4
      : bird.sell_price["3s"]
        ? 3
        : bird.sell_price["2s"]
          ? 2
          : 1;

  const rating = calculateCreatureRating(bird);
  const hobby = hobbies?.find((h) => h.name === bird.hobby_name);
  const birdTimes = (bird.time as string[] | undefined)
    ?.map((timeId: string) => times?.find((t) => t.id.toString() === timeId))
    .filter(Boolean) as Time[];

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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {bird.image ? (
                <img
                  src={bird.image}
                  alt={bird.name}
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
                        '<path d="M16 7h.01M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <BirdIcon className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {bird.name}
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

              {/* Hobby Info */}
              {hobby && (
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-gray-700">{hobby.name}</span>
                  {bird.hobby_level && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      Lv. {bird.hobby_level}
                    </span>
                  )}
                </div>
              )}

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

              {/* Time Periods */}
              {birdTimes && birdTimes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {birdTimes.map((time) => (
                    <span
                      key={time!.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full"
                    >
                      <Clock className="w-3 h-3" />
                      {time!.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Weather */}
              {bird.weather && bird.weather.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {bird.weather.map((weatherName) => (
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
                {Object.entries(bird.sell_price).map(([star, price]) => (
                  <div key={star} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {star ? star.replace("s", "⭐") : "⭐"}:
                    </span>
                    <span className="font-semibold text-green-600">
                      {formatPrice(price || null)} 💰
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
