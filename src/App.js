import React, { useState, useEffect, useCallback } from 'react';
import ColorCard from './components/ColorCard';
import SavedPalettes from './components/SavedPalettes';
import ExportModal from './components/ExportModal';
import Toast from './components/Toast';
import { generatePalette } from './utils/colorUtils';

let toastCounter = 0;

export default function App() {
  const [palette, setPalette] = useState([]);
  const [colorCount, setColorCount] = useState(5);
  const [savedPalettes, setSavedPalettes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cpg-saved')) || [];
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('cpg-theme') || 'light');
  const [showSaved, setShowSaved] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Apply theme to html element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('cpg-theme', theme);
  }, [theme]);

  // Persist saved palettes
  useEffect(() => {
    localStorage.setItem('cpg-saved', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  // Generate initial palette
  useEffect(() => {
    setPalette(generatePalette(colorCount, []));
    // eslint-disable-next-line
  }, []);

  const regenerate = useCallback(() => {
    setPalette((prev) => generatePalette(colorCount, prev));
  }, [colorCount]);

  // Spacebar listener
  useEffect(() => {
    if (showSaved) return;
    const handler = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showSaved, regenerate]);

  // When color count changes, regenerate keeping locks
  useEffect(() => {
    setPalette((prev) => generatePalette(colorCount, prev));
    // eslint-disable-next-line
  }, [colorCount]);

  function addToast(message) {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message }]);
  }

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function handleCopyHex(hex) {
    navigator.clipboard.writeText(hex).then(() => addToast('Copied HEX value!'));
  }

  function handleLockToggle(id) {
    setPalette((prev) =>
      prev.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  }

  function handleSave() {
    const entry = {
      id: `saved-${Date.now()}`,
      palette: palette.map((c) => ({ ...c })),
      timestamp: Date.now(),
    };
    setSavedPalettes((prev) => [entry, ...prev]);
    addToast('Palette saved!');
  }

  function handleDeleteSaved(id) {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
  }

  function handleExportCopy(content, label) {
    navigator.clipboard.writeText(content).then(() => addToast(`Copied ${label}!`));
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              Color Palette Generator
            </h1>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setShowSaved(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !showSaved
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Generator
            </button>
            <button
              onClick={() => setShowSaved(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showSaved
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Saved{savedPalettes.length > 0 ? ` (${savedPalettes.length})` : ''}
            </button>
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle dark/light mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {showSaved ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Saved Palettes
            </h2>
            <SavedPalettes
              savedPalettes={savedPalettes}
              onDelete={handleDeleteSaved}
              onCopy={handleCopyHex}
            />
          </>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Colors: {colorCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={colorCount}
                    onChange={(e) => setColorCount(Number(e.target.value))}
                    className="w-28 accent-indigo-600"
                  />
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">
                  Press <kbd className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 font-mono">Space</kbd> to regenerate
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExport(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={regenerate}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Palette */}
            <div className="flex gap-3 h-80 md:h-96">
              {palette.map((color) => (
                <ColorCard
                  key={color.id}
                  color={color}
                  onLockToggle={handleLockToggle}
                  onCopy={handleCopyHex}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showExport && (
        <ExportModal
          palette={palette}
          onClose={() => setShowExport(false)}
          onCopy={handleExportCopy}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
