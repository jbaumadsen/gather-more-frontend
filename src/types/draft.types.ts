export interface Draft {
  _id?: string;
  cardPoolId?: string;
  seasonId?: string;
  format?: string;
  name: string;
  teams: string[];
  status: 'in-progress' | 'completed' | 'pending'; 
  currentRound: number;
  packStructure: {
    rare: number;
    uncommon: number;
    common: number;
  }
  packs: string[];
  rounds: number;
}
