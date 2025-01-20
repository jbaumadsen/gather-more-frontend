export interface Card {
  _id: string;
  name: string;
  set: string;
  rarity: string;
  imageUrl: string;
  cost: number;
  type: string;
  text?: string;
  power?: number;
  toughness?: number;
}
