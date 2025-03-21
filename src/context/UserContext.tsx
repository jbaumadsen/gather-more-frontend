import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user.types';
import { CardPool } from '../types/cardPool.types';
import { Set } from '../types/set.types';
import { fetchUserData } from '../services/user.service';
import { SetService } from '../services/set.service';

// Define context interface
export interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cardPools: CardPool[];
  setCardPools: React.Dispatch<React.SetStateAction<CardPool[]>>;
  sets: Set[];
  setSets: React.Dispatch<React.SetStateAction<Set[]>>;
  acceptingInvite: boolean;
  setAcceptingInvite: React.Dispatch<React.SetStateAction<boolean>>;
  getUserData: () => Promise<void>;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with a default value of undefined
const UserContext = createContext<IUserContext | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardPools, setCardPools] = useState<CardPool[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
  const [acceptingInvite, setAcceptingInvite] = useState(false);

  const getUserData = async () => {
    if (token) {
      try {
        const userData = await fetchUserData(apiBaseUrl, token);
        setUser(userData.user);
        setCardPools(userData.cardPools);
        setSets(await SetService.fetchSets());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        clearUserData();
      }
    } else {
      clearUserData();
    }
  };

  const clearUserData = () => {
    setUser(null);
    setLoading(false);
  };

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    clearUserData();
  };

  // Fetch user data when token changes
  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      loading,
      setLoading,
      cardPools,
      setCardPools,
      sets,
      setSets,
      acceptingInvite,
      setAcceptingInvite,
      getUserData,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;