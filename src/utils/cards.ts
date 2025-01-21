import { Card } from "../types/card.types";

export const mapTeamCards = (teamCards: string[], cards: Card[]) => {
  return teamCards.map((cardId) => {
    // console.log("cardId", cardId);
    const card = cards.find((card) => card._id.toString() === cardId);
    return card;
  });
}
