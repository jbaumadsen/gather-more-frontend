import React from 'react';

interface ColorFilterProps {
  selectedColors: Set<string>;
  toggleColor: (color: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ selectedColors, toggleColor }) => {
  const colors = [
    { id: 'W', label: 'White', symbol: '☀️', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { id: 'U', label: 'Blue', symbol: '💧', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    { id: 'B', label: 'Black', symbol: '💀', bgColor: 'bg-gray-700', textColor: 'text-white' },
    { id: 'R', label: 'Red', symbol: '🔥', bgColor: 'bg-red-100', textColor: 'text-red-800' },
    { id: 'G', label: 'Green', symbol: '🌿', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    { id: 'M', label: 'Multi', symbol: '🌈', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
    { id: 'C', label: 'Colorless', symbol: '💎', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
  ];

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Color
      </label>
      <div className="flex flex-wrap gap-2">
        {colors.map(color => (
          <button
            key={color.id}
            className={`px-3 py-1 rounded-md transition-all ${
              selectedColors.has(color.id) 
                ? `${color.bgColor} ${color.textColor} border-2 border-blue-500` 
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => toggleColor(color.id)}
            aria-pressed={selectedColors.has(color.id)}
          >
            <span>{color.symbol} {color.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;