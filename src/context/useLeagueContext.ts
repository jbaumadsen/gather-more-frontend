import { useContext } from 'react';
import LeagueContext, { ILeagueContext } from './LeagueContext';

/**
 * Custom hook for accessing the LeagueContext
 * 
 * @returns The league context values and methods
 * @throws Error if used outside of a LeagueProvider
 */
export const useLeagueContext = (): ILeagueContext => {
  const context = useContext(LeagueContext);
  
  if (context === undefined) {
    throw new Error('useLeagueContext must be used within a LeagueProvider');
  }
  
  return context;
};

export default useLeagueContext;