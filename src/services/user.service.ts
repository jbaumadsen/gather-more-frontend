import axios from 'axios';
import { User } from '../types/user.types';
import { League } from '../types/league.types';
import { Set } from '../types/set.types';
import { Card } from '../types/card.types';
import { CardPool } from '../types/cardPool.types';

interface FetchUserDataResponse {
  user: User;
  allLeagues: {
    ownedLeagues: League[];
    invitedLeagues: League[];
    teamLeagues: League[];
  };
  sets: Set[];
  cards: Card[];
  cardPools: CardPool[];
}

export const fetchUserData = async (apiBaseUrl: string, token: string): Promise<FetchUserDataResponse> => {
  const response = await axios.get(`${apiBaseUrl}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
