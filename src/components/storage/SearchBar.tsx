import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange 
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
      </div>

      {/* Filter Button */}
      <Button variant="outline" size="default">
        <Filter className="w-4 h-4" />
        Filter
      </Button>

      {/* View Toggle */}
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
        <button
          onClick={() => onViewModeChange('list')}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded transition-colors",
            viewMode === 'list' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded transition-colors",
            viewMode === 'grid' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
