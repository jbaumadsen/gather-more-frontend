import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { League } from '../types/league.types';
import { fetchLeagueData, postLeague } from '../services/league.service';

// Define context interface
export interface ILeagueContext {
  ownedLeagues: League[];
  invitedLeagues: League[];
  teamLeagues: League[];
  currentLeague: League | null;
  setCurrentLeague: React.Dispatch<React.SetStateAction<League | null>>;
  getLeagueData: () => Promise<void>;
  createLeague: (league: League) => Promise<League | undefined>;
}

// Create the context with a default value of undefined
const LeagueContext = createContext<ILeagueContext | undefined>(undefined);

// Provider component
interface LeagueProviderProps {
  children: ReactNode;
  token: string | null;
  apiBaseUrl: string;
}

export const LeagueProvider: React.FC<LeagueProviderProps> = ({ 
  children, 
  token, 
  apiBaseUrl 
}) => {
  const [ownedLeagues, setOwnedLeagues] = useState<League[]>([]);
  const [invitedLeagues, setInvitedLeagues] = useState<League[]>([]);
  const [teamLeagues, setTeamLeagues] = useState<League[]>([]);
  const [currentLeague, setCurrentLeague] = useState<League | null>(null);

  const getLeagueData = async () => {
    if (token) {
      try {
        const leagueData = await fetchLeagueData(apiBaseUrl, token);
        setOwnedLeagues(leagueData.ownedLeagues);
        setInvitedLeagues(leagueData.invitedLeagues);
        setTeamLeagues(leagueData.teamLeagues);
      } catch (error) {
        console.error("Error fetching league data:", error);
      }
    }
  };

  const createLeague = async (league: League) => {
    if (token) {
      try {
        const newLeague = await postLeague(apiBaseUrl, token, league);
        setOwnedLeagues([...ownedLeagues, newLeague]);
        setInvitedLeagues([...invitedLeagues, newLeague]);
        return newLeague;
      } catch (error) {
        console.error("Error creating league:", error);
        throw error;
      }
    }
    return undefined;
  };

  useEffect(() => {
    if (token) {
      getLeagueData();
    }
  }, [token]);

  return (
    <LeagueContext.Provider value={{
      ownedLeagues,
      invitedLeagues,
      teamLeagues,
      currentLeague,
      setCurrentLeague,
      getLeagueData,
      createLeague
    }}>
      {children}
    </LeagueContext.Provider>
  );
};

export default LeagueContext;