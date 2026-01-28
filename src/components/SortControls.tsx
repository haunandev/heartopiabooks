import { SortOption } from "../types";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./Button";

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showStarSort?: boolean;
  showProfitSort?: boolean;
}

export function SortControls({
  sortBy,
  onSortChange,
  showStarSort = false,
  showProfitSort = false,
}: SortControlsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Sort:</span>

      {/* Name Sort */}
      <Button
        size="sm"
        variant={sortBy.startsWith("name") ? "primary" : "ghost"}
        onClick={() =>
          onSortChange(sortBy === "name-asc" ? "name-desc" : "name-asc")
        }
      >
        Name
        {sortBy === "name-asc" && <ArrowUp className="w-3 h-3 ml-1" />}
        {sortBy === "name-desc" && <ArrowDown className="w-3 h-3 ml-1" />}
        {!sortBy.startsWith("name") && <ArrowUpDown className="w-3 h-3 ml-1" />}
      </Button>

      {/* Price Sort */}
      <Button
        size="sm"
        variant={sortBy.startsWith("price") ? "primary" : "ghost"}
        onClick={() =>
          onSortChange(sortBy === "price-asc" ? "price-desc" : "price-asc")
        }
      >
        Price
        {sortBy === "price-asc" && <ArrowUp className="w-3 h-3 ml-1" />}
        {sortBy === "price-desc" && <ArrowDown className="w-3 h-3 ml-1" />}
        {!sortBy.startsWith("price") && (
          <ArrowUpDown className="w-3 h-3 ml-1" />
        )}
      </Button>

      {/* Star Sort (for foods, insects, fish) */}
      {showStarSort && (
        <Button
          size="sm"
          variant={sortBy.startsWith("star") ? "primary" : "ghost"}
          onClick={() =>
            onSortChange(sortBy === "star-asc" ? "star-desc" : "star-asc")
          }
        >
          Stars
          {sortBy === "star-asc" && <ArrowUp className="w-3 h-3 ml-1" />}
          {sortBy === "star-desc" && <ArrowDown className="w-3 h-3 ml-1" />}
          {!sortBy.startsWith("star") && (
            <ArrowUpDown className="w-3 h-3 ml-1" />
          )}
        </Button>
      )}

      {/* Profit Sort (for foods) */}
      {showProfitSort && (
        <Button
          size="sm"
          variant={sortBy.startsWith("profit") ? "primary" : "ghost"}
          onClick={() =>
            onSortChange(sortBy === "profit-asc" ? "profit-desc" : "profit-asc")
          }
        >
          Profit
          {sortBy === "profit-asc" && <ArrowUp className="w-3 h-3 ml-1" />}
          {sortBy === "profit-desc" && <ArrowDown className="w-3 h-3 ml-1" />}
          {!sortBy.startsWith("profit") && (
            <ArrowUpDown className="w-3 h-3 ml-1" />
          )}
        </Button>
      )}
    </div>
  );
}
