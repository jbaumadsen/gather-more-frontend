import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user.types';
import { Set } from '../types/set.types';
import { League } from '../types/league.types';
import { Season } from '../types/season.types';
import { CardPool } from '../types/cardPool.types';
import { Card } from '../types/card.types';
import { Draft } from '../types/draft.types';
import { Team } from '../types/team.types';
import { getAllSeasonData } from '../services/season.service';
import { fetchUserData } from '../services/user.service';
import { fetchLeagueData, postLeague } from '../services/league.service';
import { SetService } from '../services/set.service';
import { fetchDraftData } from '../services/draft.service';  
import { fetchBoosterPackCards } from '../services/boosterPack.service';
import { mapTeamCards } from '../services/card.service';

// Define context interface
interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  sets: Set[];
  setSets: React.Dispatch<React.SetStateAction<Set[]>>;
  ownedLeagues: League[];
  setOwnedLeagues: React.Dispatch<React.SetStateAction<League[]>>;
  invitedLeagues: League[];
  setInvitedLeagues: React.Dispatch<React.SetStateAction<League[]>>;
  seasons: Season[];
  setSeasons: React.Dispatch<React.SetStateAction<Season[]>>;
  currentLeague: League | null;
  setCurrentLeague: React.Dispatch<React.SetStateAction<League | null>>;
  currentSeason: Season | null;
  setCurrentSeason: React.Dispatch<React.SetStateAction<Season | null>>;
  invitedSeasons: string[];
  token: string | null;
  teamLeagues: League[];
  setTeamLeagues: React.Dispatch<React.SetStateAction<League[]>>;
  cardPools: CardPool[];
  setCardPools: React.Dispatch<React.SetStateAction<CardPool[]>>;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  acceptingInvite: boolean;
  setAcceptingInvite: React.Dispatch<React.SetStateAction<boolean>>;
  currentDraft: Draft | null;
  setCurrentDraft: React.Dispatch<React.SetStateAction<Draft | null>>;
  currentBoosterPackCards: Card[];
  setCurrentBoosterPackCards: React.Dispatch<React.SetStateAction<Card[]>>;
  currentDraftTeams: Team[];
  setCurrentDraftTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  currentUserTeam: Team | null;
  setCurrentUserTeam: React.Dispatch<React.SetStateAction<Team | null>>;
  getDraftData: () => Promise<void>;
  getBoosterPackCards: () => Promise<void>;
  getLeagueData: () => Promise<void>;
  createLeague: (league: League) => Promise<void>;
  getSeasonData: () => Promise<void>;
  currentTeamCards: Card[];
  setCurrentTeamCards: React.Dispatch<React.SetStateAction<Card[]>>;
  getUserData: () => Promise<void>;
}



// Create the context with a default value of undefined
const UserContext = createContext<IUserContext | undefined>(undefined);

// UserProvider component that wraps the app and provides context
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sets, setSets] = useState<Set[]>([]);
  const [ownedLeagues, setOwnedLeagues] = useState<League[]>([]);
  const [invitedLeagues, setInvitedLeagues] = useState<League[]>([]);
  const [teamLeagues, setTeamLeagues] = useState<League[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [currentLeague, setCurrentLeague] = useState<League | null>(null);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [invitedSeasons, setInvitedSeasons] = useState<string[]>([]);
  const [cardPools, setCardPools] = useState<CardPool[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [acceptingInvite, setAcceptingInvite] = useState(false);
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [currentBoosterPackCards, setCurrentBoosterPackCards] = useState<Card[]>([]);
  const [currentDraftTeams, setCurrentDraftTeams] = useState<Team[]>([]);
  const [currentUserTeam, setCurrentUserTeam] = useState<Team | null>(null);
  const [currentTeamCards, setCurrentTeamCards] = useState<Card[]>([]);

  const getSeasonData = async () => {
    if (currentLeague) {
      const { seasonData, draftData } = await getAllSeasonData(currentLeague);
      // console.log("currentLeague", currentLeague);
      // console.log("seasonData", seasonData);
      setCurrentSeason(seasonData);
      
      if (draftData) {
        // console.log("draftData 106 context: ", draftData);
        setCurrentDraft(draftData.draft);
        setCurrentBoosterPackCards(draftData.boosterPackCards);
        setCurrentUserTeam(draftData.userTeam);
        setCurrentDraftTeams(draftData.teams);
      } else {
        // console.log("no draftData");
        setCurrentDraft(null);
        setCurrentBoosterPackCards([]);
        setCurrentUserTeam(null);
        setCurrentDraftTeams([]);
      }
    } else {
      // console.log("no current league");
      setCurrentSeason(null);
      setCurrentDraft(null);
      setCurrentBoosterPackCards([]);
      setCurrentUserTeam(null);
      setCurrentDraftTeams([]);
      getTeamCards();
    }
  }

  // useEffect(() => {
  //   getUserData();
  // }, [user]);

  useEffect(() => {
    // console.log("currentUserTeam", currentUserTeam);
    getTeamCards();
  }, [currentUserTeam]);

  useEffect(() => {
    setCurrentDraft(null);
    setCurrentBoosterPackCards([]);
    setCurrentUserTeam(null);
    setCurrentDraftTeams([]);
    getSeasonData();
  }, [currentLeague]);

  const getLeagueData = async () => {
    if (token) {
      const leagueData = await fetchLeagueData(apiBaseUrl, token);
      // console.log("all leagueData", leagueData);
      setOwnedLeagues(leagueData.ownedLeagues);
      setInvitedLeagues(leagueData.invitedLeagues);
      setTeamLeagues(leagueData.teamLeagues);
    }
  }

  const getTeamCards = async () => {
    if (currentUserTeam) {
      // console.log("cards", cards);
      const teamCards = mapTeamCards(currentUserTeam.cards, cards)
        .filter((card): card is Card => card !== undefined);
      // console.log("teamCards", teamCards);
      if (teamCards.length > 0) { 
        setCurrentTeamCards(teamCards);
      }
    }
  }

  const getBoosterPackCards = async () => {
    // console.log("currentUserTeam", currentUserTeam);
    if (currentUserTeam && currentUserTeam.packQueue[0]) {
      const boosterPackCards = await fetchBoosterPackCards(currentUserTeam.packQueue[0]);
      // console.log("boosterPackCards", boosterPackCards);
      setCurrentBoosterPackCards(boosterPackCards);
    }
  }

  const getDraftData = async () => {
    // console.log("currentDraft", currentDraft);
    if (currentDraft && currentDraft._id) {
      // console.log("getting draft data");
      const draftData = await fetchDraftData(currentDraft._id);
      setCurrentDraft(draftData.draft);
      setCurrentBoosterPackCards(draftData.boosterPackCards);
      setCurrentUserTeam(draftData.userTeam);
      setCurrentDraftTeams(draftData.teams);
      getTeamCards();
    }
  }

  const createLeague = async (league: League) => {
    if (token) {
      try {
        const newLeague = await postLeague(apiBaseUrl, token, league);
        setOwnedLeagues([...ownedLeagues, newLeague]);
        setInvitedLeagues([...invitedLeagues, newLeague]);
      } catch (error) {
        console.error("Error creating league", error);
        throw error;
      }
    }
  }

  const getUserData = async () => {
    if (token) {
      const userData = await fetchUserData(apiBaseUrl, token);
      setUser(userData.user);
      setCardPools(userData.cardPools);
      setOwnedLeagues(userData.allLeagues.ownedLeagues);
      setInvitedLeagues(userData.allLeagues.invitedLeagues);
      setTeamLeagues(userData.allLeagues.teamLeagues);
      setCards(userData.cards);
      setSets(await SetService.fetchSets());
      // console.log("userData", userData);
    } else {
      clearUserData();
    }
  }

  const clearUserData = () => {
    setUser(null);
    setLoading(false);
    setCurrentLeague(null);
    setCurrentSeason(null);
    setCurrentDraft(null);
    setCurrentBoosterPackCards([]);
    setCurrentUserTeam(null);
    setCurrentDraftTeams([]);
  }

  useEffect(() => {
      getUserData();
  }, [token]);

  useEffect(() => {
    if (user && user.id) {
      seasons.forEach(season => {
        if (season.invitedUserIds.includes(user?.id.toString())) {
          setInvitedSeasons(prev => [...prev, season._id]);
        }
      });
    }
  }, [seasons, user]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      setToken, 
      sets, 
      setSets,
      ownedLeagues, 
      setOwnedLeagues, 
      invitedLeagues, 
      setInvitedLeagues, 
      teamLeagues, 
      setTeamLeagues, 
      seasons, 
      setSeasons, 
      currentLeague, 
      setCurrentLeague, 
      currentSeason, 
      setCurrentSeason, 
      invitedSeasons, 
      token, 
      cardPools, 
      setCardPools, 
      cards, 
      setCards, 
      acceptingInvite, 
      setAcceptingInvite, 
      currentDraft, 
      setCurrentDraft, 
      currentBoosterPackCards, 
      setCurrentBoosterPackCards, 
      currentDraftTeams, 
      setCurrentDraftTeams, 
      currentUserTeam, 
      setCurrentUserTeam, 
      getDraftData,
      getBoosterPackCards,
      getLeagueData,
      createLeague,
      getSeasonData,
      currentTeamCards,
      setCurrentTeamCards,
      getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
