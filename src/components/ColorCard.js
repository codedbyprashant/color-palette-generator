import React from 'react';
import { hexToRgb, hexToHsl, rgbToString, hslToString } from '../utils/colorUtils';

export default function ColorCard({ color, onLockToggle, onCopy }) {
  const rgb = hexToRgb(color.hex);
  const hsl = hexToHsl(color.hex);
  const isLight = hsl.l > 55;

  const textClass = isLight ? 'text-gray-800' : 'text-white';
  const subTextClass = isLight ? 'text-gray-600' : 'text-gray-200';
  const btnBg = isLight
    ? 'bg-black bg-opacity-10 hover:bg-opacity-20'
    : 'bg-white bg-opacity-10 hover:bg-opacity-20';

  return (
    <div
      className="flex-1 min-w-0 relative flex flex-col justify-end rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
      style={{ backgroundColor: color.hex, minHeight: '320px' }}
      onClick={() => onCopy(color.hex)}
      title="Click to copy HEX"
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent opacity-20 pointer-events-none" />

      {/* Lock button */}
      <button
        className={`absolute top-3 right-3 p-2 rounded-full ${btnBg} transition-all z-10`}
        onClick={(e) => {
          e.stopPropagation();
          onLockToggle(color.id);
        }}
        title={color.locked ? 'Unlock color' : 'Lock color'}
      >
        <span className="text-lg leading-none">{color.locked ? '🔒' : '🔓'}</span>
      </button>

      {/* Copy hint */}
      <div
        className={`absolute top-3 left-3 px-2 py-1 rounded-full ${btnBg} ${textClass} text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10`}
      >
        Copy
      </div>

      {/* Color info */}
      <div className="relative z-10 p-4">
        <p className={`text-lg font-bold uppercase tracking-wider ${textClass}`}>{color.hex}</p>
        <p className={`text-xs mt-1 font-mono ${subTextClass}`}>{rgbToString(rgb)}</p>
        <p className={`text-xs mt-0.5 font-mono ${subTextClass}`}>{hslToString(hsl)}</p>
      </div>
    </div>
  );
}
