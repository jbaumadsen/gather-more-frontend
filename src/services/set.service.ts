import { Set } from '../types/set.types';
import apiClient from './api/client';
import endpoints from './api/endpoints';
import { Card } from '../types/card.types';

export class SetService { 

  static async importSetCards(set: Set, token: string, setCards: Card[]): Promise<unknown> {
    console.log("setCards in importSetCards from set.services.ts ln 9: ", setCards);
    console.log("first card in setCards in importSetCards from set.services.ts ln 9: ", setCards[0]);
    
    // split cards into batches of 100
    const batches = setCards.reduce((acc, card, index) => {
      const batchIndex = Math.floor(index / 100);
      if (!acc[batchIndex]) {
        acc[batchIndex] = [];
      }
      acc[batchIndex].push(card);
      return acc;
    }, [] as Card[][]);
    
    console.log("batches in importSetCards from set.services.ts ln 17: ", batches);
    
    // Process each batch sequentially
    const results = [];
    for (let i = 0; i < batches.length; i++) {
      try {
        const result = await apiClient.post(endpoints.admin.sets.importCards, {
          setCode: set.setCode,
          cards: batches[i]
        }, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });
        console.log("result in importSetCards from set.services.ts ln 20: ", result);
        
        results.push(result);
      } catch (error) {
        console.error(`Error importing batch ${i}:`, error);
        throw error;
      }
    }
    
    return results;
  }

  static async fetchSets(): Promise<Set[]> {
    try {
      const response = await apiClient.get<Set[]>(endpoints.sets.getAll);
      if (response) {
        // console.log("response in fetchSets from set.services.ts ln 22: ", response);
        return response;
      } else {
        console.error("No data returned from fetchSets");
        return [];
      }
    } catch (error) {
      console.error("Error fetching sets", error);
      throw error;
    }
  }

  static async updateSet(token: string, set: Set): Promise<void> {
    console.log("token in updateSets from set.services.ts ln 13: ", token);
    return apiClient.put(endpoints.admin.sets.update(set._id), { ...set });
  }

  static async createSet(setName: string, setCode: string, token: string): Promise<Set> {
    return apiClient.post(endpoints.admin.sets.create, { name: setName, setCode }, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  }

  static async removeSetCards(set: Set): Promise<unknown> {
    return apiClient.delete(endpoints.admin.sets.deleteCards, {
      data: { setCode: set.setCode }
    });
  }

  static async deleteSet(setId: string): Promise<unknown> {
    return apiClient.delete(endpoints.admin.sets.delete(setId));
  }

}

