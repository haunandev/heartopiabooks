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
  Bird,
  MapPin,
  TrendingUp,
  Package,
  History,
  Info,
  Coffee,
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
    const birdCount = gameData.birds?.length || 0;
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
        birdCount +
        locationCount,
      ingredientCount,
      foodCount,
      seedCount,
      insectCount,
      fishCount,
      birdCount,
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
    { name: "Birds", value: stats.birdCount, color: "#9333ea" },
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
            <span>Version 1.2.0 • Last Updated: January 29, 2026</span>
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
          <a
            href="https://buymeacoffee.com/grims"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-lg px-4 py-2 transition-all hover:scale-105 shadow-lg"
          >
            <Coffee className="w-4 h-4" />
            <span>☕ Support Developer</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Backup Warning Alert */}
        <Card className="bg-amber-50 border-amber-300 border-2">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                  ⚠️ Important: Backup Your Data Regularly!
                </h3>
                <div className="space-y-3 text-sm text-amber-800">
                  <p className="font-medium">
                    Your data is stored locally in your browser. Always export
                    your data to prevent data loss!
                  </p>
                  <div className="bg-white/60 rounded-lg p-3 space-y-2">
                    <p className="font-semibold text-amber-900">
                      Why you need to backup:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Browser cache cleared or browser data deleted</li>
                      <li>Switching to a different browser or device</li>
                      <li>Website updates that might affect localStorage</li>
                      <li>Accidental data reset or corruption</li>
                    </ul>
                  </div>
                  <div className="bg-amber-100 border border-amber-300 rounded-lg p-3">
                    <p className="font-semibold text-amber-900 mb-2">
                      📋 How to backup:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>
                        Click the <strong>"Data Sync"</strong> button (top-right
                        of any page)
                      </li>
                      <li>
                        Click <strong>"Export Data"</strong> to download your
                        data as JSON file
                      </li>
                      <li>
                        Save the file to a safe location (Google Drive, Dropbox,
                        etc.)
                      </li>
                      <li>
                        To restore: Use <strong>"Import Data"</strong> or{" "}
                        <strong>"Merge Data"</strong>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3 mt-3">
                    <p className="font-semibold text-green-900 mb-2">
                      🌐 Share Your Data with Community:
                    </p>
                    <p className="mb-2">
                      Upload your exported JSON file to our shared folder to
                      help other players!
                    </p>
                    <a
                      href="https://drive.google.com/drive/folders/1UXyNQ2RTXIqq9tcim-e6eC5Ngge0kdQs?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-3 py-2 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                      </svg>
                      Upload to Google Drive
                    </a>
                  </div>
                  <p className="text-xs text-amber-700 italic mt-2">
                    💡 Tip: Export your data regularly, especially after making
                    important changes. Keep multiple backup copies for safety!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
                you manage and track various game resources including
                ingredients, foods, seeds, insects, fish, and locations.
              </p>
              <p className="text-sm">
                <strong>Key Features:</strong>
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>
                  Complete CRUD operations for all data categories (including
                  Birds)
                </li>
                <li>Search and filter functionality</li>
                <li>Card and Table view modes</li>
                <li>Rating system (S-D) for foods, insects, fish, and birds</li>
                <li>Multi-item sell calculator with profit analysis</li>
                <li>
                  Data merge preview with detailed diff and selective import
                </li>
                <li>Image upload to Cloudinary with crop functionality</li>
                <li>Activity logging with individual deletion</li>
                <li>Data export/import/merge for backup and sharing</li>
                <li>SEO optimized for web deployment</li>
                <li>Responsive design for mobile and desktop</li>
                <li>Offline support with localStorage</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

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

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Bird className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-700">
                {stats.birdCount}
              </span>
            </div>
            <p className="text-sm font-medium text-purple-800">Birds</p>
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

        {/* Recent Updates - v1.2.0 */}
        <Card className="bg-purple-50 border-purple-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Latest Updates (v1.2.0)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Birds Data Category
                  </p>
                  <p className="text-gray-600">
                    New category for managing bird data with same features as
                    fish
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Data Merge Preview
                  </p>
                  <p className="text-gray-600">
                    Preview changes before applying with detailed diff and
                    checkbox selection per item
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Cloudinary Image Upload
                  </p>
                  <p className="text-gray-600">
                    Upload images with crop functionality or paste URL manually
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Enhanced Image Preview
                  </p>
                  <p className="text-gray-600">
                    Real-time image updates in cards without page refresh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Previous Updates - v1.1.0 */}
        <Card className="bg-green-50 border-green-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Previous Updates (v1.1.0)
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
