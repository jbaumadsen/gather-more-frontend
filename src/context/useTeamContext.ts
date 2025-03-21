import { useContext } from 'react';
import TeamContext, { ITeamContext } from './TeamContext';

/**
 * Custom hook for accessing the TeamContext
 * 
 * @returns The team context values and methods
 * @throws Error if used outside of a TeamProvider
 */
export const useTeamContext = (): ITeamContext => {
  const context = useContext(TeamContext);
  
  if (context === undefined) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  
  return context;
};

export default useTeamContext;