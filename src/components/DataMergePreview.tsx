import { useState, useMemo } from "react";
import {
  X,
  AlertTriangle,
  Check,
  GitMerge,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { GameData } from "../types";
import { Button } from "./Button";

interface DataMergePreviewProps {
  currentData: GameData;
  newData: GameData;
  onConfirm: (mergedData: GameData) => void;
  onCancel: () => void;
}

interface ItemChange {
  id: string;
  category: keyof GameData;
  type: "added" | "updated";
  item: any;
  oldItem?: any;
}

interface ChangesSummary {
  category: keyof GameData;
  added: number;
  updated: number;
  unchanged: number;
}

export function DataMergePreview({
  currentData,
  newData,
  onConfirm,
  onCancel,
}: DataMergePreviewProps) {
  const [mergeMode, setMergeMode] = useState<"replace" | "merge">("merge");
  const [selectedChanges, setSelectedChanges] = useState<Set<string>>(
    new Set(),
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  // Helper function to generate location ID from name
  const generateLocationId = (
    name: string,
    existingIds: Set<string>,
  ): string => {
    // Convert to lowercase and replace spaces with hyphens
    let baseId = name.toLowerCase().replace(/\s+/g, "-");

    // If ID doesn't exist, return it
    if (!existingIds.has(baseId)) {
      return baseId;
    }

    // If ID exists, add suffix number
    let counter = 1;
    let newId = `${baseId}-${counter}`;
    while (existingIds.has(newId)) {
      counter++;
      newId = `${baseId}-${counter}`;
    }

    return newId;
  };

  // Calculate all individual changes
  const allChanges = useMemo((): ItemChange[] => {
    const changes: ItemChange[] = [];
    const categories: (keyof GameData)[] = [
      "ingredients",
      "foods",
      "seeds",
      "insects",
      "fish",
      "birds",
      "locations",
      "weather",
    ];

    categories.forEach((category) => {
      const current = currentData[category] || [];
      const incoming = newData[category] || [];

      // Create a map of existing items by NAME only (not ID)
      const currentMap = new Map();
      current.forEach((item: any) => {
        currentMap.set(item.name, item);
      });

      // Check each incoming item
      incoming.forEach((item: any) => {
        const changeId = `${category}-${item.name}`;

        if (currentMap.has(item.name)) {
          // Item exists - check if there are actual changes
          const oldItem = currentMap.get(item.name);
          const hasChanges = JSON.stringify(oldItem) !== JSON.stringify(item);

          // Only add to changes if there are actual differences
          if (hasChanges) {
            changes.push({
              id: changeId,
              category,
              type: "updated",
              item,
              oldItem,
            });
          }
        } else {
          // New item (name doesn't exist in current data)
          changes.push({
            id: changeId,
            category,
            type: "added",
            item,
          });
        }
      });
    });

    return changes;
  }, [currentData, newData]);

  // Initialize selected changes (all selected by default)
  useMemo(() => {
    const allIds = new Set(allChanges.map((c) => c.id));
    setSelectedChanges(allIds);
  }, [allChanges]);

  const calculateChanges = (): ChangesSummary[] => {
    const categories: (keyof GameData)[] = [
      "ingredients",
      "foods",
      "seeds",
      "insects",
      "fish",
      "birds",
      "locations",
      "weather",
    ];

    return categories.map((category) => {
      const current = currentData[category] || [];
      const incoming = newData[category] || [];

      const categoryChanges = allChanges.filter((c) => c.category === category);
      const added = categoryChanges.filter((c) => c.type === "added").length;
      const updated = categoryChanges.filter(
        (c) => c.type === "updated",
      ).length;

      const incomingNames = new Set(incoming.map((item: any) => item.name));
      const unchanged = current.filter(
        (item: any) => !incomingNames.has(item.name),
      ).length;

      return {
        category,
        added,
        updated: mergeMode === "merge" ? updated : 0,
        unchanged: mergeMode === "merge" ? unchanged : 0,
      };
    });
  };

  const performMerge = (): GameData => {
    if (mergeMode === "replace") {
      return newData;
    }

    // Merge mode: combine existing and new data, but only apply selected changes
    const merged: GameData = {
      ingredients: [],
      foods: [],
      seeds: [],
      insects: [],
      fish: [],
      birds: [],
      locations: [],
      weather: [],
    };

    const categories: (keyof GameData)[] = [
      "ingredients",
      "foods",
      "seeds",
      "insects",
      "fish",
      "birds",
      "locations",
      "weather",
    ];

    categories.forEach((category) => {
      const current = currentData[category] || [];
      const incoming = newData[category] || [];

      // For locations, track used IDs to generate slug-based IDs
      const usedLocationIds = new Set<string>();
      if (category === "locations") {
        current.forEach((item: any) => {
          if (item.id) {
            usedLocationIds.add(item.id.toString());
          }
        });
      }

      // Find the highest existing ID in current data (for non-location categories)
      const maxId = current.reduce((max: number, item: any) => {
        return Math.max(max, item.id || 0);
      }, 0);
      let nextId = maxId + 1;

      // Create a map of existing items by name
      const itemMap = new Map();
      current.forEach((item: any) => {
        itemMap.set(item.name, item);
      });

      // Apply only selected changes
      incoming.forEach((item: any) => {
        const changeId = `${category}-${item.name}`;

        // Only apply if this change is selected
        if (selectedChanges.has(changeId)) {
          if (itemMap.has(item.name)) {
            // Update existing item - keep the old ID
            const existingItem = itemMap.get(item.name);
            itemMap.set(item.name, { ...item, id: existingItem.id });
          } else {
            // New item - assign new unique ID
            let newId: string | number;

            if (category === "locations") {
              // For locations, generate slug-based ID from name
              newId = generateLocationId(item.name, usedLocationIds);
              usedLocationIds.add(newId);
            } else {
              // For other categories, use numeric ID
              newId = nextId++;
            }

            itemMap.set(item.name, { ...item, id: newId });
          }
        }
      });

      // Convert back to array
      merged[category] = Array.from(itemMap.values()) as any;
    });

    return merged;
  };

  const handleConfirm = () => {
    const mergedData = performMerge();
    onConfirm(mergedData);
  };

  const toggleChange = (changeId: string) => {
    const newSelected = new Set(selectedChanges);
    if (newSelected.has(changeId)) {
      newSelected.delete(changeId);
    } else {
      newSelected.add(changeId);
    }
    setSelectedChanges(newSelected);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllInCategory = (category: keyof GameData, checked: boolean) => {
    const categoryChanges = allChanges.filter((c) => c.category === category);
    const newSelected = new Set(selectedChanges);

    categoryChanges.forEach((change) => {
      if (checked) {
        newSelected.add(change.id);
      } else {
        newSelected.delete(change.id);
      }
    });

    setSelectedChanges(newSelected);
  };

  const getItemDisplayName = (item: any): string => {
    return item.name || item.id || "Unknown";
  };

  const getItemDifferences = (
    oldItem: any,
    newItem: any,
  ): { key: string; oldValue: any; newValue: any }[] => {
    const differences: { key: string; oldValue: any; newValue: any }[] = [];
    const allKeys = new Set([
      ...Object.keys(oldItem || {}),
      ...Object.keys(newItem || {}),
    ]);

    allKeys.forEach((key) => {
      const oldValue = oldItem?.[key];
      const newValue = newItem?.[key];

      // Skip if values are the same
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        differences.push({ key, oldValue, newValue });
      }
    });

    return differences;
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const changes = calculateChanges();
  const totalChanges = changes.reduce((sum, c) => sum + c.added + c.updated, 0);
  const selectedCount = selectedChanges.size;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GitMerge className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Data Import Preview
              </h2>
              <p className="text-sm text-gray-500">
                Review changes before applying
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Import Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMergeMode("merge")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  mergeMode === "merge"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitMerge
                    className={`w-5 h-5 ${
                      mergeMode === "merge"
                        ? "text-purple-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="font-semibold text-gray-900">
                    Merge Data
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Add new items and update existing ones. Keep items not in the
                  import file.
                </p>
              </button>

              <button
                onClick={() => setMergeMode("replace")}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  mergeMode === "replace"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      mergeMode === "replace" ? "text-red-600" : "text-gray-400"
                    }`}
                  />
                  <span className="font-semibold text-gray-900">
                    Replace All
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Replace all data with import file. Current data will be lost.
                </p>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  {mergeMode === "merge"
                    ? `Found ${totalChanges} changes (${selectedCount} selected)`
                    : "This will replace ALL your current data"}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  {mergeMode === "merge"
                    ? "Select which changes to apply using checkboxes"
                    : "Make sure to backup your current data first"}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Changes by Category */}
          {mergeMode === "merge" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Detailed Changes
              </h3>
              <div className="space-y-3">
                {changes.map((change) => {
                  const categoryChanges = allChanges.filter(
                    (c) => c.category === change.category,
                  );

                  if (categoryChanges.length === 0) return null;

                  const isExpanded = expandedCategories.has(change.category);
                  const categorySelected = categoryChanges.every((c) =>
                    selectedChanges.has(c.id),
                  );
                  const categorySomeSelected = categoryChanges.some((c) =>
                    selectedChanges.has(c.id),
                  );

                  return (
                    <div
                      key={change.category}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* Category Header */}
                      <div className="bg-gray-50 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={categorySelected}
                            ref={(el) => {
                              if (el) {
                                el.indeterminate =
                                  !categorySelected && categorySomeSelected;
                              }
                            }}
                            onChange={(e) =>
                              toggleAllInCategory(
                                change.category,
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => toggleCategory(change.category)}
                            className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <span className="font-medium text-gray-900 capitalize">
                              {change.category}
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          {change.added > 0 && (
                            <span className="text-green-600 font-medium">
                              +{change.added} new
                            </span>
                          )}
                          {change.updated > 0 && (
                            <span className="text-blue-600 font-medium">
                              {change.updated} updated
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Category Items */}
                      {isExpanded && (
                        <div className="bg-white divide-y divide-gray-100">
                          {categoryChanges.map((itemChange) => (
                            <div
                              key={itemChange.id}
                              className="p-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedChanges.has(itemChange.id)}
                                  onChange={() => toggleChange(itemChange.id)}
                                  className="w-4 h-4 mt-1 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900">
                                      {getItemDisplayName(itemChange.item)}
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        itemChange.type === "added"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-blue-100 text-blue-700"
                                      }`}
                                    >
                                      {itemChange.type === "added"
                                        ? "New"
                                        : "Update"}
                                    </span>
                                  </div>

                                  {/* New Item Details */}
                                  {itemChange.type === "added" && (
                                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200 text-xs">
                                      <div className="font-medium text-green-800 mb-1">
                                        New Item Preview:
                                      </div>
                                      <div className="space-y-0.5 text-gray-700 max-h-32 overflow-y-auto">
                                        {Object.entries(itemChange.item).map(
                                          ([key, value]) => {
                                            if (key === "id") return null;
                                            return (
                                              <div
                                                key={key}
                                                className="flex gap-2"
                                              >
                                                <span className="font-medium min-w-[80px]">
                                                  {key}:
                                                </span>
                                                <span className="text-gray-600 break-all flex-1">
                                                  {formatValue(value)}
                                                </span>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Updated Item Differences */}
                                  {itemChange.type === "updated" &&
                                    itemChange.oldItem && (
                                      <div className="mt-2 space-y-2">
                                        {getItemDifferences(
                                          itemChange.oldItem,
                                          itemChange.item,
                                        ).map((diff) => (
                                          <div
                                            key={diff.key}
                                            className="p-2 bg-gray-50 rounded border border-gray-200 text-xs"
                                          >
                                            <div className="font-medium text-gray-900 mb-1">
                                              {diff.key}:
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                              <div className="p-2 bg-red-50 border border-red-200 rounded">
                                                <div className="text-red-700 font-medium mb-1">
                                                  Old:
                                                </div>
                                                <div className="text-red-600 break-all max-h-20 overflow-y-auto">
                                                  {formatValue(diff.oldValue)}
                                                </div>
                                              </div>
                                              <div className="p-2 bg-green-50 border border-green-200 rounded">
                                                <div className="text-green-700 font-medium mb-1">
                                                  New:
                                                </div>
                                                <div className="text-green-600 break-all max-h-20 overflow-y-auto">
                                                  {formatValue(diff.newValue)}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Replace Mode Summary */}
          {mergeMode === "replace" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Changes by Category
              </h3>
              <div className="space-y-2">
                {changes.map((change) => {
                  const hasChanges =
                    change.added > 0 ||
                    change.updated > 0 ||
                    (mergeMode === "replace" && change.unchanged > 0);

                  if (!hasChanges) return null;

                  return (
                    <div
                      key={change.category}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="font-medium text-gray-900 capitalize">
                        {change.category}
                      </span>
                      <span className="text-red-600 font-medium text-sm">
                        Replace all
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={mergeMode === "merge" && selectedCount === 0}
              className={
                mergeMode === "replace"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }
            >
              <Check className="w-4 h-4 mr-2" />
              {mergeMode === "merge"
                ? `Apply ${selectedCount} Change${selectedCount !== 1 ? "s" : ""}`
                : "Confirm Replace All"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
