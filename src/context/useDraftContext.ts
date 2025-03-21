import { useContext } from 'react';
import DraftContext, { IDraftContext } from './DraftContext';

/**
 * Custom hook for accessing the DraftContext
 * 
 * @returns The draft context values and methods
 * @throws Error if used outside of a DraftProvider
 */
export const useDraftContext = (): IDraftContext => {
  const context = useContext(DraftContext);
  
  if (context === undefined) {
    throw new Error('useDraftContext must be used within a DraftProvider');
  }
  
  return context;
};

export default useDraftContext;