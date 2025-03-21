import { Draft } from "../types/draft.types";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const createDraft = async(draft: Draft) => {
  console.log("draft in utils", draft);
  const response = await axios.post(`${apiBaseUrl}/draft`, draft, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
};

export const pickCard = async(packId: string, multiverseId: string, teamId: string, draftId: string) => {
  const response = await axios.post(`${apiBaseUrl}/draft/pick`, { packId, multiverseId, teamId, draftId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  // console.log(response.data);
  return response.data;
};

export const fetchDraftData = async(draftId: string) => {
  const response = await axios.get(`${apiBaseUrl}/draft/${draftId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log("response fetchDraftData in utils", response.data);
  return response.data;
};
