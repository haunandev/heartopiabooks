import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Leaf,
  Utensils,
  Sprout,
  Bug,
  Fish as FishIcon,
  MapPin,
  TrendingUp,
  Package,
  History,
  Info,
} from "lucide-react";
import { GameData } from "../types";
import { Card } from "./Card";

interface DashboardProps {
  gameData: GameData;
  activityCount: number;
}

export function Dashboard({ gameData, activityCount }: DashboardProps) {
  const stats = useMemo(() => {
    const ingredientCount = gameData.ingredients?.length || 0;
    const foodCount = gameData.foods?.length || 0;
    const seedCount = gameData.seeds?.length || 0;
    const insectCount = gameData.insects?.length || 0;
    const fishCount = gameData.fish?.length || 0;
    const locationCount = gameData.locations?.length || 0;

    // Calculate ingredient sources
    const seedSource =
      gameData.ingredients?.filter((i) => i.source === "seed").length || 0;
    const wildSource =
      gameData.ingredients?.filter((i) => i.source === "wild").length || 0;
    const buySource =
      gameData.ingredients?.filter((i) => i.source === "buy").length || 0;

    // Calculate star distribution for foods
    const foodStarDistribution = [1, 2, 3, 4, 5].map((star) => {
      const count =
        gameData.foods?.filter((f) => {
          const maxStar = f.sell_price["5s"]
            ? 5
            : f.sell_price["4s"]
              ? 4
              : f.sell_price["3s"]
                ? 3
                : f.sell_price["2s"]
                  ? 2
                  : 1;
          return maxStar === star;
        }).length || 0;
      return { star: `${star}⭐`, count };
    });

    return {
      total:
        ingredientCount +
        foodCount +
        seedCount +
        insectCount +
        fishCount +
        locationCount,
      ingredientCount,
      foodCount,
      seedCount,
      insectCount,
      fishCount,
      locationCount,
      seedSource,
      wildSource,
      buySource,
      foodStarDistribution,
    };
  }, [gameData]);

  const categoryData = [
    { name: "Ingredients", value: stats.ingredientCount, color: "#10b981" },
    { name: "Foods", value: stats.foodCount, color: "#f97316" },
    { name: "Seeds", value: stats.seedCount, color: "#84cc16" },
    { name: "Insects", value: stats.insectCount, color: "#06b6d4" },
    { name: "Fish", value: stats.fishCount, color: "#3b82f6" },
    { name: "Locations", value: stats.locationCount, color: "#ef4444" },
  ];

  const sourceData = [
    { name: "Seed", value: stats.seedSource, color: "#10b981" },
    { name: "Wild", value: stats.wildSource, color: "#f59e0b" },
    { name: "Buy", value: stats.buySource, color: "#3b82f6" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <p className="text-red-50">
          Welcome to Heartopia Books - Your complete game data management system
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4" />
            <span>Version 1.1.0 • Last Updated: January 29, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2">
            <Package className="w-4 h-4" />
            <span>📦 Data Source: </span>
            <a
              href="https://drive.google.com/drive/folders/1UXyNQ2RTXIqq9tcim-e6eC5Ngge0kdQs?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-100 transition-colors font-medium"
            >
              Download Latest Updates (.json)
            </a>
          </div>
        </div>
      </div>

      {/* About System */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            About This System
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Heartopia Books</strong> is a comprehensive data
              management system for the Heartopia game. This application helps
              you manage and track various game resources including ingredients,
              foods, seeds, insects, fish, and locations.
            </p>
            <p className="text-sm">
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-2">
              <li>Complete CRUD operations for all data categories</li>
              <li>Search and filter functionality</li>
              <li>Card and Table view modes</li>
              <li>Activity logging with individual deletion</li>
              <li>Data export/import for backup and sharing</li>
              <li>Responsive design for mobile and desktop</li>
              <li>Offline support with localStorage</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">
                {stats.ingredientCount}
              </span>
            </div>
            <p className="text-sm font-medium text-green-800">Ingredients</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Utensils className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-700">
                {stats.foodCount}
              </span>
            </div>
            <p className="text-sm font-medium text-orange-800">Foods</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Sprout className="w-8 h-8 text-lime-600" />
              <span className="text-2xl font-bold text-lime-700">
                {stats.seedCount}
              </span>
            </div>
            <p className="text-sm font-medium text-lime-800">Seeds</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Bug className="w-8 h-8 text-cyan-600" />
              <span className="text-2xl font-bold text-cyan-700">
                {stats.insectCount}
              </span>
            </div>
            <p className="text-sm font-medium text-cyan-800">Insects</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <FishIcon className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-700">
                {stats.fishCount}
              </span>
            </div>
            <p className="text-sm font-medium text-blue-800">Fish</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-red-700">
                {stats.locationCount}
              </span>
            </div>
            <p className="text-sm font-medium text-red-800">Locations</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <History className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {activityCount}
              </span>
            </div>
            <p className="text-sm font-medium text-purple-800">Activities</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-gray-600" />
              <span className="text-2xl font-bold text-gray-700">
                {stats.total}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800">Total Items</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Data Distribution by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Ingredient Sources */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ingredient Sources
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Food Star Distribution */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Food Star Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.foodStarDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="star" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f97316" name="Foods" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="bg-green-50 border-green-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Latest Updates (v1.1.0)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Rating System (S-D)
                  </p>
                  <p className="text-gray-600">
                    Foods, insects, and fish now have quality ratings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">Sell Calculator</p>
                  <p className="text-gray-600">
                    Calculate total sell price with quantity and star ratings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">SEO Optimization</p>
                  <p className="text-gray-600">
                    Enhanced search engine visibility and meta tags
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">Data Source Link</p>
                  <p className="text-gray-600">
                    Quick access to latest .json updates in dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              💡 Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <p className="text-gray-700">
                  Use the <strong>Data Sync</strong> button to export, import,
                  or reset data
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <p className="text-gray-700">
                  Switch between <strong>Card</strong> and{" "}
                  <strong>Table</strong> views for different layouts
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <p className="text-gray-700">
                  All data is stored locally in your browser - no server needed
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <p className="text-gray-700"></p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
