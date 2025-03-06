// Enhanced Card interface aligned closer to Scryfall's structure
export interface Card {
  _id: string;                    // MongoDB ID/Scryfall ID
  name: string;                   // Card name
  multiverseId: string;           // Multiverse ID from Gatherer
  
  // Mana and cost fields
  manaCost: string | null;        // The mana cost string (e.g., "{2}{R}")
  cmc: number;                    // Converted mana cost/mana value
  colors: string[];               // Colors in the card's cost

  // Type fields
  type: string;                   // Full type line
  supertypes: string[];           // Supertypes (Legendary, Basic, etc.)
  types: string[];                // Card types (Creature, Instant, etc.)
  subtypes: string[];             // Subtypes (Human, Warrior, etc.)

  // Card details
  rarity: string;                 // Rarity (Common, Uncommon, etc.)
  set: string;                    // Set code (e.g., "RTR")
  setName: string;                // Full set name (e.g., "Return to Ravnica")
  text: string;                   // Oracle text
  number: string;                 // Collector number in the set
  
  // Creature stats (as strings to match MongoDB schema)
  power: string | null;           // Power (as string to handle special values like *)
  toughness: string | null;       // Toughness (as string to handle special values)
  
  // Image and visual data
  imageUrl: string;               // URL to the card image
  
  // Optional additional fields that could be useful
  artist?: string;                // Card artist
  flavorText?: string;            // Flavor text
  watermark?: string;             // Card watermark (guild symbols, etc.)
  layout?: string;                // Card layout (normal, split, etc.)
  
  // Added for MongoDB
  createdAt?: Date;               // Creation timestamp
  updatedAt?: Date;               // Last update timestamp
}

// Keep the Scryfall interface for importing data
export interface ScryfallCard {
  id: string;
  name: string;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  flavor_text?: string;
  power?: string;
  toughness?: string;
  colors: string[];
  color_identity: string[];
  rarity: string;
  set: string;
  set_name: string;
  collector_number: string;
  artist?: string;
  watermark?: string;
  layout: string;
  image_uris?: {
    normal: string;
    small: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  multiverse_ids?: number[];
}