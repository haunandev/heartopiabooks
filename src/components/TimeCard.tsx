import { motion } from "framer-motion";
import { Time } from "../types";
import { Edit, Trash2, Clock } from "lucide-react";
import { Card, CardContent } from "./Card";

interface TimeCardProps {
  time: Time;
  onEdit: () => void;
  onDelete: () => void;
}

export function TimeCard({ time, onEdit, onDelete }: TimeCardProps) {
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
            <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {time.image ? (
                <img
                  src={time.image}
                  alt={time.name}
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
                        '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <Clock className="w-8 h-8 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {time.name}
                </h3>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={onEdit}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={onDelete}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Description */}
              {time.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {time.description}
                </p>
              )}

              {/* ID Badge */}
              <div className="mt-3">
                <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                  ID: {time.id}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
