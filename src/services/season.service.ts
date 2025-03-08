import axios from 'axios';
import { fetchDraftData } from './draft.service';
import { League } from '../types/league.types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getSeason = async(seasonId: string) => {
  const response = await axios.get(`${apiBaseUrl}/season/${seasonId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  // console.log("getSeason line 12 response", response);
  return response.data;
};

export const getAllSeasonData = async (currentLeague: League) => {
  // console.log("getting season data");
  if (!currentLeague.currentSeasonId && !currentLeague.currentSeasonId?.toString()) {
    console.log("no current season id");
    return { seasonData: null, draftData: null };
  }
  const seasonData = await getSeason(currentLeague.currentSeasonId?.toString());
  // console.log("seasonData in utils", seasonData);
  let draftData = null;
  if (seasonData.draft) {
    // console.log("draft in utils", seasonData.draft);
    draftData = await fetchDraftData(seasonData.draft);
    // console.log("draftData in utils", draftData);
  }

  return { seasonData, draftData: draftData || null };
}

