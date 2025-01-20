import { User } from './user.types';

export interface League {
  _id?: string;
  name: string;
  manager?: User;
  players?: User[];
  invites?: User[];
  maxPlayers?: number;
  ruleSet?: string;
  cardSets?: string[];
  hasDraft?: boolean;
  currentSeasonId?: string;
}

export interface LeagueInvite {
  leagueId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'declined';
}