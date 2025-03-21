import React, { createContext, useState, ReactNode } from 'react';
import { Draft } from '../types/draft.types';
import { Team } from '../types/team.types';
import { Card } from '../types/card.types';
import { fetchDraftData } from '../services/draft.service';
import { fetchBoosterPackCards } from '../services/boosterPack.service';
import { useTeamContext } from './useTeamContext';

// Define context interface
export interface IDraftContext {
  currentDraft: Draft | null;
  setCurrentDraft: React.Dispatch<React.SetStateAction<Draft | null>>;
  currentDraftTeams: Team[];
  setCurrentDraftTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  currentBoosterPackCards: Card[];
  setCurrentBoosterPackCards: React.Dispatch<React.SetStateAction<Card[]>>;
  getDraftData: (draftId: string) => Promise<void>;
  getBoosterPackCards: (packId: string) => Promise<Card[]>;
  resetDraftState: () => void;
}

// Create the context with a default value of undefined
const DraftContext = createContext<IDraftContext | undefined>(undefined);

// Provider component
interface DraftProviderProps {
  children: ReactNode;
}

export const DraftProvider: React.FC<DraftProviderProps> = ({ children }) => {
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [currentDraftTeams, setCurrentDraftTeams] = useState<Team[]>([]);
  const [currentBoosterPackCards, setCurrentBoosterPackCards] = useState<Card[]>([]);
  const { setCurrentUserTeam } = useTeamContext();

  const getDraftData = async (draftId: string) => {
    try {
      const data = await fetchDraftData(draftId);
      
      // Update draft-related state
      setCurrentDraft(data.draft);
      setCurrentDraftTeams(data.teams);
      setCurrentUserTeam(data.userTeam);
      setCurrentBoosterPackCards(data.boosterPackCards || []);
      
      return data; // Return the full data for coordination with other contexts
    } catch (error) {
      console.error("Error fetching draft data:", error);
      resetDraftState();
      return null;
    }
  };

  const getBoosterPackCards = async (packId: string) => {
    try {
      if (packId) {
        const boosterPackCards = await fetchBoosterPackCards(packId);
        setCurrentBoosterPackCards(boosterPackCards);
        return boosterPackCards;
      }
    } catch (error) {
      console.error("Error fetching booster pack cards:", error);
    }
    return [];
  };
  
  // Explicit function to reset draft state
  const resetDraftState = () => {
    setCurrentDraft(null);
    setCurrentBoosterPackCards([]);
    setCurrentDraftTeams([]);
  };

  return (
    <DraftContext.Provider value={{
      currentDraft,
      setCurrentDraft,
      currentDraftTeams,
      setCurrentDraftTeams,
      currentBoosterPackCards,
      setCurrentBoosterPackCards,
      getDraftData,
      getBoosterPackCards,
      resetDraftState
    }}>
      {children}
    </DraftContext.Provider>
  );
};

export default DraftContext;