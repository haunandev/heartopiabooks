import { Search, Filter, Plus } from "lucide-react";
import { Button } from "./Button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onAddNew: () => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  onAddNew,
}: SearchBarProps) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
        />
      </div>
      <Button
        variant={showFilters ? "primary" : "secondary"}
        onClick={onToggleFilters}
      >
        <Filter className="w-5 h-5" />
        Filters
      </Button>
      <Button variant="primary" onClick={onAddNew}>
        <Plus className="w-5 h-5" />
        Add New
      </Button>
    </div>
  );
}
