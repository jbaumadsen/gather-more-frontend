// services/cards/card.service.ts
import apiClient from './api/client';
import endpoints from './api/endpoints';
import { Card, ScryfallCard } from '../types/card.types';
import { Set } from '../types/set.types';

export class CardService {
  /**
   * Get all cards from the database
   */
  static async getAllCards(): Promise<Card[]> {
    return apiClient.get<Card[]>(endpoints.cards.getAll);
  }

  /**
   * Map card IDs from a team to actual Card objects
   */
  static mapTeamCards(teamCards: string[], cards: Card[]): (Card | undefined)[] {
    return teamCards.map((cardId) => {
      return cards.find((card) => card.multiverseId.toString() === cardId);
    });
  }

  /**
   * Filter cards by set, excluding basic lands
   */
  static filterCardsBySet(cards: ScryfallCard[], setCode: string): ScryfallCard[] {
    return cards.filter(card => 
      card.set.toLowerCase() === setCode.toLowerCase() && 
      !card.type_line.toLowerCase().includes('basic land')
    );
  }

  /**
   * Transform Scryfall card data to our internal Card format
   */
  static transformScryfallCards(cards: ScryfallCard[]): Partial<Card>[] {
    return cards.map(card => {
      // Extract types from type_line
      const typeSegments = this.parseTypeLine(card.type_line);
      
      return {
        name: card.name,
        manaCost: card.mana_cost || null,
        cmc: card.cmc,
        colors: card.colors || [],
        type: card.type_line,
        supertypes: typeSegments.supertypes,
        types: typeSegments.types,
        subtypes: typeSegments.subtypes,
        rarity: this.capitalizeFirstLetter(card.rarity),
        set: card.set.toUpperCase(),
        setName: card.set_name,
        text: card.oracle_text || '',
        number: card.collector_number,
        power: card.power ? card.power.toString() : null,
        toughness: card.toughness ? card.toughness.toString() : null,
        imageUrl: this.getImageUrl(card),
        multiverseId: card.multiverse_ids && card.multiverse_ids.length > 0 
          ? card.multiverse_ids[0].toString() 
          : `${card.name}-${card.set}`.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      };
    });
  }

  /**
   * Parse Magic card type line into components
   */
  static parseTypeLine(typeLine: string): { supertypes: string[], types: string[], subtypes: string[] } {
    const result = {
      supertypes: [] as string[],
      types: [] as string[],
      subtypes: [] as string[]
    };

    // Split by the em dash if present
    const parts = typeLine.split('—').map(p => p.trim());
    
    // First part contains supertypes and types
    if (parts.length > 0) {
      const words = parts[0].split(' ');
      
      // Known supertypes in MTG
      const knownSupertypes = ['Basic', 'Legendary', 'Snow', 'World'];
      
      words.forEach(word => {
        if (knownSupertypes.includes(word)) {
          result.supertypes.push(word);
        } else {
          result.types.push(word);
        }
      });
    }
    
    // Second part contains subtypes
    if (parts.length > 1) {
      result.subtypes = parts[1].split(' ');
    }
    
    return result;
  }

  /**
   * Get the best available image URL for a card
   */
  static getImageUrl(card: ScryfallCard): string {
    // Try to get from image_uris
    if (card.image_uris && card.image_uris.normal) {
      return card.image_uris.normal;
    }
    
    // Fallback for cards with multiverse_id
    if (card.multiverse_ids && card.multiverse_ids.length > 0) {
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverse_ids[0]}&type=card`;
    }
    
    // Final fallback
    return "No image found";
  }

  /**
   * Capitalize first letter of a string
   */
  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Delete all cards from a specific set
   */
  static async deleteSetCards(set: Set): Promise<unknown> {
    return apiClient.delete(endpoints.admin.sets.deleteCards, {
      data: { setCode: set.setCode }
    });
  }
}

// Also export individual functions for convenience
export const getAllCards = CardService.getAllCards;
export const mapTeamCards = CardService.mapTeamCards;
export const filterCardsBySet = CardService.filterCardsBySet;
export const transformScryfallCards = CardService.transformScryfallCards;