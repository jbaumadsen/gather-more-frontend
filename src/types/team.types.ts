export interface Team {
  _id?: string;
  name: string;
  userIds: string[];
  packQueue: string[];
  cards: string[];
}