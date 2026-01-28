import { Heart, History, Database } from "lucide-react";
import { Button } from "./Button";

interface AppHeaderProps {
  activityLogCount: number;
  onOpenLog: () => void;
  onOpenSync: () => void;
}

export function AppHeader({
  activityLogCount,
  onOpenLog,
  onOpenSync,
}: AppHeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Heartopia Books
              </h1>
              <p className="text-sm text-gray-600">Game Data Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onOpenSync}>
              <Database className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Data Sync</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onOpenLog}>
              <History className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Activity Log</span>
              {activityLogCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {activityLogCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
