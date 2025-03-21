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

export const getAllUsers = async (apiBaseUrl: string, token: string): Promise<User[]> => {
  const response = await axios.get(`${apiBaseUrl}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserPassword = async (
  apiBaseUrl: string, 
  _id: string, 
  newPassword: string, 
  token: string
): Promise<{ message: string }> => {
  console.log("id in updateUserPassword ln 44", _id);
  console.log("newPassword in updateUserPassword ln 45", newPassword);
  console.log("token in updateUserPassword ln 46", token);
  const response = await axios.put(
    `${apiBaseUrl}/admin/users/${_id}/password`, 
    { newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};