import React, { useState } from 'react';
import { exportAsJson, exportAsCss, exportAsTailwind } from '../utils/colorUtils';

const TABS = ['JSON', 'CSS', 'Tailwind'];

export default function ExportModal({ palette, onClose, onCopy }) {
  const [activeTab, setActiveTab] = useState('JSON');

  function getContent() {
    if (activeTab === 'JSON') return exportAsJson(palette);
    if (activeTab === 'CSS') return exportAsCss(palette);
    return exportAsTailwind(palette);
  }

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Export Palette</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="p-6">
          <pre className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-60 whitespace-pre-wrap">
            {content}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onCopy(content, activeTab)}
            className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Copy {activeTab}
          </button>
        </div>
      </div>
    </div>
  );
}
