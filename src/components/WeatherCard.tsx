import { CloudRain, Pencil, Trash2 } from "lucide-react";
import { Weather } from "../types";

interface WeatherCardProps {
  weather: Weather;
  onEdit: () => void;
  onDelete: () => void;
}

export function WeatherCard({ weather, onEdit, onDelete }: WeatherCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-cyan-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-300">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Image - small rectangular */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {weather.image ? (
              <img
                src={weather.image}
                alt={weather.name}
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
                      '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v4"/>';
                    parent.appendChild(icon);
                  }
                }}
              />
            ) : (
              <CloudRain className="w-8 h-8 text-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-gray-900 truncate">
                {weather.name}
              </h4>
              <div className="flex gap-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
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

            {/* ID Badge */}
            <div className="mt-2">
              <span className="text-xs font-mono text-blue-700 bg-white/60 px-2 py-1 rounded">
                ID: {weather.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
