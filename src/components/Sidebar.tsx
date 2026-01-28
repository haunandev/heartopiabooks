import {
  Leaf,
  Utensils,
  Sprout,
  Bug,
  Fish,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

type TabType =
  | "ingredients"
  | "foods"
  | "seeds"
  | "insects"
  | "fish"
  | "locations";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    ingredients: number;
    foods: number;
    seeds: number;
    insects: number;
    fish: number;
    locations: number;
  };
}

export function Sidebar({ activeTab, onTabChange, counts }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const tabs = [
    {
      id: "ingredients" as TabType,
      label: "Ingredients",
      icon: Leaf,
      count: counts.ingredients,
    },
    {
      id: "foods" as TabType,
      label: "Foods",
      icon: Utensils,
      count: counts.foods,
    },
    {
      id: "seeds" as TabType,
      label: "Seeds",
      icon: Sprout,
      count: counts.seeds,
    },
    {
      id: "insects" as TabType,
      label: "Insects",
      icon: Bug,
      count: counts.insects,
    },
    { id: "fish" as TabType, label: "Fish", icon: Fish, count: counts.fish },
    {
      id: "locations" as TabType,
      label: "Locations",
      icon: MapPin,
      count: counts.locations,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]
          w-64 bg-white shadow-lg z-30
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
      >
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Data Categories
          </h2>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors text-left
                    ${
                      isActive
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-400"}`}
                  />
                  <span className="flex-1">{tab.label}</span>
                  <span
                    className={`
                      px-2 py-0.5 text-xs rounded-full font-medium
                      ${
                        isActive
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
