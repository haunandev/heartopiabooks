import { motion } from "framer-motion";
import { NPC, Location } from "../types";
import { Edit, Trash2, User, MapPin } from "lucide-react";
import { Card, CardContent } from "./Card";

interface NPCCardProps {
  npc: NPC;
  locations: Location[];
  onEdit: () => void;
  onDelete: () => void;
}

export function NPCCard({ npc, locations, onEdit, onDelete }: NPCCardProps) {
  const location = locations.find((l) => l.id === npc.location);

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
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Image with fallback */}
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {npc.image ? (
                  <img
                    src={npc.image}
                    alt={npc.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent && parent.querySelector("svg") === null) {
                        const icon = document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          "svg",
                        );
                        icon.setAttribute("class", "w-6 h-6 text-indigo-700");
                        icon.setAttribute("viewBox", "0 0 24 24");
                        icon.setAttribute("fill", "none");
                        icon.setAttribute("stroke", "currentColor");
                        icon.setAttribute("stroke-width", "2");
                        icon.innerHTML =
                          '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
                        parent.appendChild(icon);
                      }
                    }}
                  />
                ) : (
                  <User className="w-6 h-6 text-indigo-700" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {npc.name}
                </h3>

                {/* Location */}
                {location && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{location.name}</span>
                  </div>
                )}

                {/* Bio */}
                {npc.bio && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {npc.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
