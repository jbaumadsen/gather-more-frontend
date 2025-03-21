import { useContext } from 'react';
import SeasonContext, { ISeasonContext } from './SeasonContext';

/**
 * Custom hook for accessing the SeasonContext
 * 
 * @returns The season context values and methods
 * @throws Error if used outside of a SeasonProvider
 */
export const useSeasonContext = (): ISeasonContext => {
  const context = useContext(SeasonContext);
  
  if (context === undefined) {
    throw new Error('useSeasonContext must be used within a SeasonProvider');
  }
  
  return context;
};

export default useSeasonContext;