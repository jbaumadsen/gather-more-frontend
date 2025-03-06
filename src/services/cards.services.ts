import { Card, ScryfallCard } from "../types/card.types";
import { Set } from "../types/set.types";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const mapTeamCards = (teamCards: string[], cards: Card[]) => {
  return teamCards.map((cardId) => {
    const card = cards.find((card) => card._id.toString() === cardId);
    return card;
  });
}

export const filterCardsBySet = (cards: ScryfallCard[], setCode: string): ScryfallCard[] => {
  return cards.filter(card => 
    card.set.toLowerCase() === setCode.toLowerCase() && 
    !card.type_line.toLowerCase().includes('basic land')
  );
};

// Transform Scryfall card to your database format
export const transformScryfallCards = (cards: ScryfallCard[]): Partial<Card>[] => {
  console.log("cards", cards);
  return cards.map(card => {
    // Extract types from type_line
    const typeSegments = parseTypeLine(card.type_line);
    
    return {
      name: card.name,
      manaCost: card.mana_cost || null,
      cmc: card.cmc,
      colors: card.colors || [],
      type: card.type_line,
      supertypes: typeSegments.supertypes,
      types: typeSegments.types,
      subtypes: typeSegments.subtypes,
      rarity: capitalizeFirstLetter(card.rarity),
      set: card.set.toUpperCase(),
      setName: card.set_name,
      text: card.oracle_text || '',
      number: card.collector_number,
      power: card.power ? card.power.toString() : null,
      toughness: card.toughness ? card.toughness.toString() : null,
      imageUrl: getImageUrl(card),
      multiverseId: card.multiverse_ids && card.multiverse_ids.length > 0 
        ? card.multiverse_ids[0].toString() 
        : `${card.name}-${card.set}`.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    };
  });
};

// Helper function to parse type line
const parseTypeLine = (typeLine: string): { supertypes: string[], types: string[], subtypes: string[] } => {
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
};

// Helper function to get image URL
const getImageUrl = (card: ScryfallCard): string => {
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
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Modified to use cards of type Card and process by set
export const importSetCards = async (
  set: Set, 
  token: string, 
  cards: Card[]
) => {
  console.log("set", set);
  
  // Filter cards for this specific set
  const setCards = cards.filter(card => 
    card.set.toLowerCase() === set.setCode.toLowerCase()
  );
  
  if (setCards.length === 0) {
    console.warn(`No cards found for set ${set.setCode}`);
    return { success: false, message: "No cards found for this set" };
  }
  
  console.log(`Found ${setCards.length} cards for set ${set.setCode}`);
  
  // Batch the cards into smaller chunks (e.g., 25 cards per batch)
  const batchSize = 25;
  const batches = [];
  
  for (let i = 0; i < setCards.length; i += batchSize) {
    batches.push(setCards.slice(i, i + batchSize));
  }
  
  console.log(`Processing ${setCards.length} cards in ${batches.length} batches`);
  
  // Process each batch sequentially
  const results = [];
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Processing batch ${i + 1}/${batches.length} with ${batch.length} cards`);
    
    try {
      const response = await fetch(`${apiBaseUrl}/admin/sets/import-cards`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          setCode: set.setCode, 
          cards: batch,
          batchNumber: i + 1,
          totalBatches: batches.length
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Batch ${i + 1} failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Batch ${i + 1} result:`, data);
      results.push(data);
    } catch (error) {
      console.error(`Error in batch ${i + 1}:`, error);
      throw error;
    }
  }
  
  console.log("All batches processed successfully");
  return results;
}

export const deleteSetCards = async (set: Set, token: string) => {
  const response = await fetch(`${apiBaseUrl}/admin/sets/delete-cards`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({setCode: set.setCode}),
  });
  const data = await response.json();
  console.log("data", data);
  return data;
}