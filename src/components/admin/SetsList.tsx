// components/sets/SetsList.tsx
import React from 'react';
import SetActionsButtons from './SetActionsButtons';
import ImportProgressBar from './ImportProgressBar';
import { Set } from '../../types/set.types';
import { Card } from '../../types/card.types';

interface SetsListProps {
  sets: Set[];
  cardsData: Card[] | null;
  isDataLoaded: boolean;
  isImporting: boolean;
  importingSetId: string | null;
  importProgress: { current: number, total: number } | null;
  onImportStatusChange: (isImporting: boolean, setId: string | null, error: string | null) => void;
  onImportProgressUpdate: (current: number, total: number) => void;
}

const SetsList: React.FC<SetsListProps> = ({ 
  sets, 
  cardsData, 
  isDataLoaded,
  isImporting,
  importingSetId,
  importProgress,
  onImportStatusChange,
  onImportProgressUpdate
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Code</th>
            <th className="px-4 py-2 border-b text-left">Primary</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sets && sets.length > 0 && sets.map((set) => (
            <tr key={set._id} className={set.isPrimarySet ? "bg-blue-50" : ""}>
              <td className="px-4 py-2 border-b">
                {set.name}
                {set.isPrimarySet && (
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">Primary</span>
                )}
              </td>
              <td className="px-4 py-2 border-b">{set.setCode}</td>
              <td className="px-4 py-2 border-b">
                {set.isImported ? (
                  <span className="text-green-600 font-medium">Imported</span>
                ) : (
                  <span className="text-red-600 font-medium">Not imported</span>
                )}
              </td>
              <td className="px-4 py-2 border-b">
                {set.isPrimarySet ? (
                  <span className="text-green-600 font-medium">Primary</span>
                ) : (
                  <span className="text-red-600 font-medium">-</span>
                )}
              </td>
              <td className="px-4 py-2 border-b">
                <SetActionsButtons 
                  set={set}
                  cardsData={cardsData}
                  isDataLoaded={isDataLoaded}
                  isImporting={isImporting && importingSetId === set._id}
                  onImportStatusChange={(importing, error) => 
                    onImportStatusChange(importing, importing ? set._id : null, error)
                  }
                  onImportProgressUpdate={onImportProgressUpdate}
                />
                
                {isImporting && importingSetId === set._id && importProgress && (
                  <ImportProgressBar 
                    current={importProgress.current} 
                    total={importProgress.total} 
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetsList;