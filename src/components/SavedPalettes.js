import React from 'react';

export default function SavedPalettes({ savedPalettes, onDelete, onCopy }) {
  if (savedPalettes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500">
        <div className="text-6xl mb-4">🎨</div>
        <p className="text-xl font-semibold mb-2">No saved palettes yet</p>
        <p className="text-sm">Generate a palette and click "Save" to store it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {savedPalettes.map((saved) => (
        <div
          key={saved.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
        >
          <div className="flex h-20">
            {saved.palette.map((color) => (
              <div
                key={color.id}
                className="flex-1 cursor-pointer relative group"
                style={{ backgroundColor: color.hex }}
                onClick={() => onCopy(color.hex)}
                title={`Click to copy ${color.hex}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 transition-opacity">
                  <span className="text-white text-xs font-bold uppercase">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {saved.palette.length} colors
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {new Date(saved.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onDelete(saved.id)}
              className="px-3 py-1.5 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
