import React, { createContext, useState, ReactNode } from 'react';
import { Team } from '../types/team.types';
import { Card } from '../types/card.types';
import { mapTeamCards } from '../services/card.service';
import { useCardLibrary } from './useCardLibraryContext';

// Define context interface
export interface ITeamContext {
  currentUserTeam: Team | null;
  setCurrentUserTeam: React.Dispatch<React.SetStateAction<Team | null>>;
  currentTeamCards: Card[];
  setCurrentTeamCards: React.Dispatch<React.SetStateAction<Card[]>>;
  loadTeamForDraft: (team: Team | null) => void;
  getTeamCards: () => void;
  resetTeamState: () => void;
}

// Create the context with a default value of undefined
const TeamContext = createContext<ITeamContext | undefined>(undefined);

// Provider component
interface TeamProviderProps {
  children: ReactNode;
}

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const { cards } = useCardLibrary();

  const [currentUserTeam, setCurrentUserTeam] = useState<Team | null>(null);
  const [currentTeamCards, setCurrentTeamCards] = useState<Card[]>([]);

  // Map team cards based on the current user team and card library
  const getTeamCards = () => {
    if (currentUserTeam && cards.length > 0) {
      const teamCards = mapTeamCards(currentUserTeam.cards, cards)
        .filter((card): card is Card => card !== undefined);
      
      if (teamCards.length > 0) {
        setCurrentTeamCards(teamCards);
      }
    }
  };

  // Load team data for a specific draft
  const loadTeamForDraft = (team: Team | null) => {
    if (!team) {
      resetTeamState();
      return;
    }
    
    setCurrentUserTeam(team);
    // getTeamCards will be called automatically when currentUserTeam changes
  };

  // Reset all team state
  const resetTeamState = () => {
    setCurrentUserTeam(null);
    setCurrentTeamCards([]);
  };

  // The only useEffect we keep is for updating team cards when either 
  // the user team or the card library changes
  React.useEffect(() => {
    getTeamCards();
  }, [currentUserTeam, cards]);

  return (
    <TeamContext.Provider value={{
      currentUserTeam,
      setCurrentUserTeam,
      currentTeamCards,
      setCurrentTeamCards,
      loadTeamForDraft,
      getTeamCards,
      resetTeamState
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;