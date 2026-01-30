import { motion } from "framer-motion";
import { Hobby } from "../types";
import { Edit, Trash2, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./Card";

interface HobbyCardProps {
  hobby: Hobby;
  onEdit: () => void;
  onDelete: () => void;
}

export function HobbyCard({ hobby, onEdit, onDelete }: HobbyCardProps) {
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
            <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {hobby.image ? (
                <img
                  src={hobby.image}
                  alt={hobby.name}
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
                        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <Heart className="w-8 h-8 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {hobby.name}
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

              {/* NPC Name */}
              {hobby.npc_name && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <span>NPC: {hobby.npc_name}</span>
                </div>
              )}

              {/* Max Level */}
              <div className="flex items-center gap-1 text-sm text-pink-600 mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>Max Level: {hobby.max_level}</span>
              </div>

              {/* ID Badge */}
              <div className="mt-3">
                <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full">
                  ID: {hobby.id}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
