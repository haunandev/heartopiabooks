import { Seed, Hobby, Time } from "../types";
import { Card, CardContent } from "./Card";
import { formatPrice } from "../lib/utils";
import { formatGrowthTime } from "../lib/timeFormat";
import { Edit, Trash2, Sprout, Clock, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SeedCardProps {
  seed: Seed;
  hobbies?: Hobby[];
  times?: Time[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export function SeedCard({
  seed,
  hobbies,
  times,
  onEdit,
  onDelete,
}: SeedCardProps) {
  const hobby = hobbies?.find((h) => h.name === seed.hobby_name);
  const time = times?.find((t) => t.id.toString() === seed.time);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-200 bg-[#faf8f5]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Image with fallback */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {seed.image ? (
                <img
                  src={seed.image}
                  alt={seed.name}
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
                        '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <Sprout className="w-8 h-8 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900">{seed.name}</h4>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.();
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-1 space-y-2">
                {hobby && (
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-gray-700">{hobby.name}</span>
                    {seed.hobby_level ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Lv. {seed.hobby_level}
                      </span>
                    ) : null}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Buy Price:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatPrice(seed.price)} 💰
                  </span>
                </div>

                {seed.sell_price !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sell Price:</span>
                    <span className="text-md font-semibold text-amber-600">
                      {formatPrice(seed.sell_price)} 💰
                    </span>
                  </div>
                )}

                {seed.growth_time !== undefined && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {formatGrowthTime(seed.growth_time)}
                    </span>
                  </div>
                )}

                {time && (
                  <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                    🕐 {time.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
