import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Season } from '../types/season.types';
import { getAllSeasonData } from '../services/season.service';
import { useLeagueContext } from './useLeagueContext';

// Define context interface
export interface ISeasonContext {
  seasons: Season[];
  setSeasons: React.Dispatch<React.SetStateAction<Season[]>>;
  currentSeason: Season | null;
  setCurrentSeason: React.Dispatch<React.SetStateAction<Season | null>>;
  invitedSeasons: string[];
  getSeasonData: () => Promise<void>;
}

// Create the context with a default value of undefined
const SeasonContext = createContext<ISeasonContext | undefined>(undefined);

// Provider component
interface SeasonProviderProps {
  children: ReactNode;
  userId: string | undefined;
}

export const SeasonProvider: React.FC<SeasonProviderProps> = ({ 
  children,
  userId 
}) => {
  const { currentLeague } = useLeagueContext();

  const [seasons, setSeasons] = useState<Season[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [invitedSeasons, setInvitedSeasons] = useState<string[]>([]);

  const getSeasonData = async () => {
    if (currentLeague) {
      try {
        const { seasonData } = await getAllSeasonData(currentLeague);
        setCurrentSeason(seasonData);
        console.log("currentSeason in SeasonContext ln 40", seasonData);
      } catch (error) {
        console.error("Error fetching season data:", error);
        setCurrentSeason(null);
      }
    } else {
      setCurrentSeason(null);
    }
  };

  // Update currentSeason when currentLeague changes
  useEffect(() => {
    getSeasonData();
  }, [currentLeague]);

  // Track which seasons the user is invited to
  useEffect(() => {
    if (userId) {
      const invitedSeasonIds: string[] = [];
      seasons.forEach(season => {
        if (season.invitedUserIds.includes(userId)) {
          invitedSeasonIds.push(season._id);
        }
      });
      setInvitedSeasons(invitedSeasonIds);
    }
  }, [seasons, userId]);

  return (
    <SeasonContext.Provider value={{
      seasons,
      setSeasons,
      currentSeason,
      setCurrentSeason,
      invitedSeasons,
      getSeasonData
    }}>
      {children}
    </SeasonContext.Provider>
  );
};

export default SeasonContext;