import React, { useState } from 'react';
import { ScryfallCard, Card } from '../../types/card.types';

interface FileUploadInputProps {
  onFileLoaded: (data: Card[]) => void;
  accept?: string;
  label?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ 
  onFileLoaded, 
  accept = ".json",
  label = "Upload JSON File" 
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ totalCards: number, sets: { code: string, count: number }[] } | null>(null);

  // Helper function to parse type line
  const parseTypeLine = (typeLine: string): { supertypes: string[], types: string[], subtypes: string[] } => {
    const result = {
      supertypes: [] as string[],
      types: [] as string[],
      subtypes: [] as string[]
    };

    // Split by the em dash if present
    const parts = typeLine.split('—').map(p => p.trim());
    
    // First part contains supertypes and types
    if (parts.length > 0) {
      const words = parts[0].split(' ');
      
      // Known supertypes in MTG
      const knownSupertypes = ['Basic', 'Legendary', 'Snow', 'World'];
      
      words.forEach(word => {
        if (knownSupertypes.includes(word)) {
          result.supertypes.push(word);
        } else if (word) {
          result.types.push(word);
        }
      });
    }
    
    // Second part contains subtypes
    if (parts.length > 1) {
      result.subtypes = parts[1].split(' ').filter(Boolean);
    }
    
    return result;
  };

  // Helper function to get image URL
  const getImageUrl = (card: ScryfallCard): string => {
    // Try to get from image_uris
    if (card.image_uris && card.image_uris.normal) {
      return card.image_uris.normal;
    }
    
    // Fallback for cards with multiverse_id
    if (card.multiverse_ids && card.multiverse_ids.length > 0) {
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverse_ids[0]}&type=card`;
    }
    
    // Final fallback
    return "No image found";
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);
    setStats(null);

    try {
      const fileContent = await file.text();
      
      // Try to parse as Scryfall format first
      let jsonData;
      let isScryfall = true;
      
      try {
        jsonData = JSON.parse(fileContent);
        
        // Check if it's an array and contains Scryfall-like objects
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          const firstItem = jsonData[0];
          isScryfall = Boolean(
            firstItem.collector_number && 
            firstItem.type_line && 
            firstItem.set_name
          );
        } else {
          isScryfall = false;
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
        setError('Failed to parse the file as JSON');
        setLoading(false);
        return;
      }
      
      let processedCards: Card[];
      
      if (isScryfall) {
        // Process Scryfall data
        const scryfallCards = jsonData as ScryfallCard[];
        processedCards = scryfallCards.map(card => {
          const typeInfo = card.type_line ? parseTypeLine(card.type_line) : { supertypes: [], types: ['Unknown'], subtypes: [] };
          
          return {
            _id: card.id,
            name: card.name,
            multiverseId: card.multiverse_ids && card.multiverse_ids.length > 0 
              ? card.multiverse_ids[0].toString() 
              : `${card.name}-${card.set}`.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
            manaCost: card.mana_cost || null,
            cmc: card.cmc,
            colors: card.colors || [],
            type: card.type_line,
            supertypes: typeInfo.supertypes,
            types: typeInfo.types.length > 0 ? typeInfo.types : ['Unknown'],
            subtypes: typeInfo.subtypes,
            rarity: capitalizeFirstLetter(card.rarity),
            set: card.set.toUpperCase(),
            setName: card.set_name,
            text: card.oracle_text || '',
            number: card.collector_number,
            power: card.power || null,
            toughness: card.toughness || null,
            imageUrl: getImageUrl(card),
            artist: card.artist,
            flavorText: card.flavor_text,
            watermark: card.watermark,
            layout: card.layout
          } as Card;
        });
      } else {
        // Assume it's already in our format or close to it
        // Just ensure all required fields are present
        processedCards = jsonData.map((card: Card) => {
          
          // Parse type line if types arrays don't exist
          if (card.type && (!card.types || !card.subtypes)) {
            const typeInfo = parseTypeLine(card.type);
            card.supertypes = card.supertypes || typeInfo.supertypes;
            card.types = card.types || (typeInfo.types.length > 0 ? typeInfo.types : ['Unknown']);
            card.subtypes = card.subtypes || typeInfo.subtypes;
          } else {
            card.supertypes = card.supertypes || [];
            card.types = card.types || ['Unknown'];
            card.subtypes = card.subtypes || [];
          }
          
          // Ensure other required fields
          card.colors = card.colors || [];
          card.setName = card.setName || `${card.set} Set`;
          card.number = card.number || card.multiverseId || '0';
          
          // Convert power/toughness to strings if they're numbers
          if (card.power !== null && card.power !== undefined && typeof card.power !== 'string') {
            card.power = String(card.power);
          }
          
          if (card.toughness !== null && card.toughness !== undefined && typeof card.toughness !== 'string') {
            card.toughness = String(card.toughness);
          }
          
          return card as Card;
        });
      }
      
      // Collect statistics for display
      const setMap = new Map<string, number>();
      processedCards.forEach(card => {
        const setCode = card.set.toLowerCase();
        setMap.set(setCode, (setMap.get(setCode) || 0) + 1);
      });
      
      const setStatsArray = Array.from(setMap.entries()).map(([code, count]) => ({ 
        code, 
        count 
      }));
      
      // Sort the stats array
      setStatsArray.sort((a, b) => b.count - a.count);
      
      // Set statistics for display
      setStats({
        totalCards: processedCards.length,
        sets: setStatsArray
      });
      
      // Pass processed data to parent
      onFileLoaded(processedCards);
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Failed to process the file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-medium">{label}</label>
      <div className="flex items-center">
        <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
          Browse...
          <input 
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleFileChange} 
          />
        </label>
        <span className="ml-3 text-gray-600">
          {fileName ? fileName : 'No file selected'}
        </span>
      </div>
      
      {loading && (
        <div className="flex items-center mt-2">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Processing file...</p>
        </div>
      )}
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {stats && (
        <div className="mt-3 p-3 bg-green-50 rounded-md border border-green-100">
          <p className="font-medium text-green-800">Successfully loaded {stats.totalCards} cards</p>
          <p className="text-sm text-green-700 mt-1">Found cards from {stats.sets.length} sets</p>
          <details className="mt-2">
            <summary className="text-sm text-green-600 cursor-pointer">View set breakdown</summary>
            <ul className="mt-2 text-sm text-green-700 max-h-40 overflow-y-auto">
              {stats.sets.map(set => (
                <li key={set.code} className="flex justify-between">
                  <span>{set.code.toUpperCase()}</span>
                  <span>{set.count} cards</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;