import { motion, AnimatePresence } from "framer-motion";
import { ActivityLog as ActivityLogType } from "../types";
import {
  X,
  History,
  Plus,
  Edit,
  Trash2,
  Package,
  Leaf,
  ChefHat,
  Bug,
  Fish as FishIcon,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface ActivityLogProps {
  logs: ActivityLogType[];
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityLog({ logs, isOpen, onClose }: ActivityLogProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderDetails = (log: ActivityLogType) => {
    if (log.type === "add" || log.type === "delete") {
      const data = log.details.data;
      return (
        <div className="mt-2 space-y-1 text-xs">
          {Object.entries(data).map(([key, value]) => {
            if (key === "id") return null;
            return (
              <div key={key} className="flex gap-2">
                <span className="font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="text-gray-800 flex-1">
                  {typeof value === "object" && value !== null
                    ? JSON.stringify(value, null, 2)
                    : String(value || "-")}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    if (log.type === "edit") {
      const { before, after } = log.details;
      const changedFields = Object.keys(after).filter((key) => {
        if (key === "id") return false;
        return JSON.stringify(before[key]) !== JSON.stringify(after[key]);
      });

      return (
        <div className="mt-2 space-y-2 text-xs">
          {changedFields.map((key) => (
            <div key={key} className="border-l-2 border-blue-300 pl-2">
              <div className="font-medium text-gray-600 capitalize mb-1">
                {key.replace(/_/g, " ")}
              </div>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-red-600 font-medium">Before:</span>
                  <span className="text-gray-700">
                    {typeof before[key] === "object" && before[key] !== null
                      ? JSON.stringify(before[key])
                      : String(before[key] || "-")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-600 font-medium">After:</span>
                  <span className="text-gray-700">
                    {typeof after[key] === "object" && after[key] !== null
                      ? JSON.stringify(after[key])
                      : String(after[key] || "-")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const getActivityIcon = (type: ActivityLogType["type"]) => {
    switch (type) {
      case "add":
        return <Plus className="w-4 h-4 text-green-600" />;
      case "edit":
        return <Edit className="w-4 h-4 text-blue-600" />;
      case "delete":
        return <Trash2 className="w-4 h-4 text-red-600" />;
    }
  };

  const getItemIcon = (itemType: ActivityLogType["itemType"]) => {
    switch (itemType) {
      case "ingredient":
        return <Leaf className="w-4 h-4" />;
      case "food":
        return <ChefHat className="w-4 h-4" />;
      case "seed":
        return <Package className="w-4 h-4" />;
      case "insect":
        return <Bug className="w-4 h-4" />;
      case "fish":
        return <FishIcon className="w-4 h-4" />;
      case "location":
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityLogType["type"]) => {
    switch (type) {
      case "add":
        return "bg-green-50 border-green-200";
      case "edit":
        return "bg-blue-50 border-blue-200";
      case "delete":
        return "bg-red-50 border-red-200";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Activity Log
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Log List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {logs.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No activity yet</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {logs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-lg border ${getActivityColor(log.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex gap-1 mt-0.5">
                          {getActivityIcon(log.type)}
                          {getItemIcon(log.itemType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 capitalize">
                                {log.type} {log.itemType}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {log.itemName}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                setExpandedLog(
                                  expandedLog === log.id ? null : log.id,
                                )
                              }
                              className="p-1 hover:bg-white/50 rounded transition-colors"
                            >
                              {expandedLog === log.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(log.timestamp)}
                          </p>

                          {/* Details Section */}
                          <AnimatePresence>
                            {expandedLog === log.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                {renderDetails(log)}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {logs.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  {logs.length} {logs.length === 1 ? "activity" : "activities"}{" "}
                  recorded
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
