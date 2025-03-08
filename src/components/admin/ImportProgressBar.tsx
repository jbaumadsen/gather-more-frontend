// components/sets/ImportProgressBar.tsx
import React from 'react';

interface ImportProgressBarProps {
  current: number;
  total: number;
}

const ImportProgressBar: React.FC<ImportProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="mt-2">
      <div className="w-full bg-blue-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs mt-1 text-center">
        {current}/{total}
      </p>
    </div>
  );
};

export default ImportProgressBar;