import { useState, useRef } from "react";
import {
  Download,
  Upload,
  RotateCcw,
  Database,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./Button";

interface DataSyncProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DataSync({
  onExport,
  onImport,
  onReset,
  isOpen,
  onClose,
}: DataSyncProps) {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setError(null);

    try {
      await onImport(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import data");
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    onReset();
    setShowResetConfirm(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Data Sync</h2>
              <p className="text-sm text-gray-500">
                Export, Import, or Reset your data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  Import Failed
                </p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Export Data */}
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Export Data
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download current data as JSON file for backup or sharing
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onExport();
                    setTimeout(() => onClose(), 500);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON
                </Button>
              </div>
            </div>
          </div>

          {/* Import Data */}
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Import Data
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Upload JSON file to replace current data (will overwrite all
                  data)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={importing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {importing ? "Importing..." : "Choose File"}
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Reset to Default */}
          {!showResetConfirm ? (
            <div className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Reset to Default
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Restore original data from gameData.json (will delete all
                    changes)
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResetConfirm(true)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Data
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">
                    Confirm Reset
                  </h3>
                  <p className="text-sm text-red-700">
                    This will permanently delete all your changes and restore
                    the default data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, Reset Data
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
