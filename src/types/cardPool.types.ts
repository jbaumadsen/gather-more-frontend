import { Card } from './card.types';

export interface CardPool {
  _id?: string;
  name: string;
  ruleSet: string;
  cardSets: string[];
  cards: Card[];
}
