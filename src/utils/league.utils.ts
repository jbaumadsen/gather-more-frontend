import axios from 'axios';
import { League } from '../types/league.types';

interface FetchLeaguesResponse {
  ownedLeagues: League[];
  invitedLeagues: League[];
  teamLeagues: League[];
}

export const fetchLeagueData = async (apiBaseUrl: string, token: string): Promise<FetchLeaguesResponse> => {
  const response = await axios.get(`${apiBaseUrl}/league/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postLeague = async (apiBaseUrl: string, token: string, league: League) => {
  const response = await axios.post(`${apiBaseUrl}/league`, league, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
