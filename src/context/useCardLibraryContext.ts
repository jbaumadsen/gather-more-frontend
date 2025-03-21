// contexts/cardLibrary/useCardLibrary.ts
import { useContext } from 'react';
import CardLibraryContext from './CardLibraryContext';

export const useCardLibrary = () => {
  const context = useContext(CardLibraryContext);
  
  if (context === undefined) {
    throw new Error('useCardLibrary must be used within a CardLibraryProvider');
  }
  
  return context;
};

export default useCardLibrary;