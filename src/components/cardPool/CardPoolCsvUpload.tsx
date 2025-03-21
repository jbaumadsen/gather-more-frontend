import React, { useState } from 'react';
import Papa from 'papaparse';
import useCardPoolContext from '../../context/useCardPoolContext';
import useCardLibraryContext from '../../context/useCardLibraryContext';

interface CSVCardEntry {
  name: string;
  set: string;
  quantity?: string;
  // Allow for other potential columns without explicitly defining them
  [key: string]: string | undefined;
}

const CardPoolCsvUpload: React.FC = () => {
  const { cards } = useCardLibraryContext();

  const { 
    currentCardPool,
    isLoading: isCardPoolLoading,
    addCardsToPool
  } = useCardPoolContext();

  const [fileName, setFileName] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [results, setResults] = useState<{
    added: number;
    skipped: number;
    notFound: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!currentCardPool) {
      setError('Please select a card pool first');
      return;
    }

    setFileName(file.name);
    setProcessing(true);
    setResults(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvText = e.target?.result as string;
        
        Papa.parse<CSVCardEntry>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toLowerCase(),
          complete: (result) => {
            processCards(result.data).catch(err => {
              setError(`Error processing cards: ${err instanceof Error ? err.message : String(err)}`);
              setProcessing(false);
            });
          },
          error: (error: Error) => {
            setError(`Failed to parse CSV: ${error.message}`);
            setProcessing(false);
          }
        });
      } catch (err) {
        setError(`Error reading file: ${err instanceof Error ? err.message : String(err)}`);
        setProcessing(false);
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
      setProcessing(false);
    };
    
    reader.readAsText(file);
  };

  const processCards = async (cardEntries: CSVCardEntry[]) => {
    if (!currentCardPool) {
      setError('No card pool selected');
      setProcessing(false);
      return;
    }
    console.log("cardEntries", cardEntries);

    const added: string[] = [];
    const notFound: string[] = [];

    cardEntries.forEach(entry => {
      // Skip entries with missing name or set
      if (!entry.name || !entry.set) {
        notFound.push(`Invalid entry (missing name or set)`);
        return;
      }
      
      // Default to 1 if quantity is missing or invalid
      let quantity = 1;
      
      // Only try to parse quantity if it exists and is not empty
      if (entry.quantity && entry.quantity.trim() !== '') {
        const parsedQuantity = parseInt(entry.quantity.trim(), 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
          quantity = parsedQuantity;
        }
      }
      
      const matchingCards = cards.filter(card => {
        // Ensure card and its properties exist before comparing
        if (!card || !card.name || !card.set) return false;
        
        return card.name.toLowerCase() === entry.name.toLowerCase() && 
          card.set.toLowerCase() === entry.set.toLowerCase();
      });

      if (matchingCards.length === 0) {
        notFound.push(`${entry.name}-${entry.set}`);
        return;
      }

      // Add cards to pool (respecting quantity)
      for (let i = 0; i < quantity; i++) {
        const card = matchingCards[0];
        added.push(card.multiverseId);
      }
    });

    console.log("Multiverse IDs in CardPoolCsvUpload ln 125", added);
    // Update card pool with new cards using the service
    if (added.length > 0) {
      try {
        await addCardsToPool(added);
      } catch (err) {
        setError(`Failed to update card pool: ${err instanceof Error ? err.message : String(err)}`);
        setProcessing(false);
      }
    }

    setResults({
      added: added.length,
      skipped: cardEntries.length - added.length - notFound.length,
      notFound
    });
    setProcessing(false);
  };

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-medium mb-2">Import Cards from CSV</h3>
      <p className="text-sm text-gray-600 mb-3">
        Upload a CSV file with columns: name, set (quantity is optional)
      </p>
      
      <div className="flex items-center mb-3">
        <label className={`py-2 px-4 rounded-md cursor-pointer ${
          currentCardPool && !isCardPoolLoading && !processing
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}>
          Select CSV File
          <input 
            type="file" 
            className="hidden" 
            accept=".csv" 
            onChange={handleFileUpload} 
            disabled={!currentCardPool || isCardPoolLoading || processing}
          />
        </label>
        <span className="ml-3 text-gray-600">
          {fileName ? fileName : 'No file selected'}
        </span>
      </div>
      
      {(processing || isCardPoolLoading) && (
        <div className="flex items-center mt-2">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Processing...</p>
        </div>
      )}
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {results && (
        <div className="mt-3 p-3 bg-green-50 rounded-md border border-green-100">
          <p className="font-medium text-green-800">
            Import complete: Added {results.added} cards to your collection
          </p>
          
          {results.skipped > 0 && (
            <p className="text-sm text-amber-600 mt-1">
              Skipped {results.skipped} cards (already in collection)
            </p>
          )}
          
          {results.notFound.length > 0 && (
            <details className="mt-2">
              <summary className="text-sm text-red-600 cursor-pointer">
                {results.notFound.length} cards not found
              </summary>
              <ul className="mt-2 text-sm text-red-700 max-h-40 overflow-y-auto">
                {results.notFound.map((card, index) => (
                  <li key={index}>{card}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        <p>Supported CSV formats:</p>
        <pre className="mt-1 p-2 bg-gray-100 rounded">
          # Standard format with headers
          name,set,quantity
          Lightning Bolt,M10,4
          Birds of Paradise,M12,2
          
          # Simple format without headers
          Lightning Bolt,M10
          Birds of Paradise,M12
          
          # Tab-delimited files
          name[tab]set
          Lightning Bolt[tab]M10
          
          # Other common formats
          Card Name,Set Code
          Card,Edition,Count
        </pre>
      </div>
    </div>
  );
};

export default CardPoolCsvUpload;