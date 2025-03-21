import { useUserContext } from './useUserContext';
import { useLeagueContext } from './useLeagueContext';
import { useSeasonContext } from './useSeasonContext';
import { useDraftContext } from './useDraftContext';
import { useTeamContext } from './useTeamContext';
import { useCardLibrary } from './useCardLibraryContext';
import { useCardPoolContext } from './useCardPoolContext';

/**
 * useAppContext combines all context hooks into a single API
 * This provides a unified interface compatible with the original UserContext
 * to make the transition to separate contexts smoother
 * 
 * @returns Combined context values from all providers
 */
export const useAppContext = () => {
  const userContext = useUserContext();
  const leagueContext = useLeagueContext();
  const seasonContext = useSeasonContext();
  const draftContext = useDraftContext();
  const teamContext = useTeamContext();
  const cardLibrary = useCardLibrary();
  const cardPoolContext = useCardPoolContext();


  // Return a combined API that matches the structure of the original context
  return {
    // User context
    user: userContext.user,
    setUser: userContext.setUser,
    loading: userContext.loading,
    token: userContext.token,
    setToken: userContext.setToken,
    acceptingInvite: userContext.acceptingInvite,
    setAcceptingInvite: userContext.setAcceptingInvite,
    getUserData: userContext.getUserData,
    login: userContext.login,
    logout: userContext.logout,
    
    // League context
    ownedLeagues: leagueContext.ownedLeagues,
    invitedLeagues: leagueContext.invitedLeagues,
    teamLeagues: leagueContext.teamLeagues,
    currentLeague: leagueContext.currentLeague,
    setCurrentLeague: leagueContext.setCurrentLeague,
    getLeagueData: leagueContext.getLeagueData,
    createLeague: leagueContext.createLeague,
    
    // Season context
    seasons: seasonContext.seasons,
    setSeasons: seasonContext.setSeasons,
    currentSeason: seasonContext.currentSeason,
    setCurrentSeason: seasonContext.setCurrentSeason,
    invitedSeasons: seasonContext.invitedSeasons,
    getSeasonData: seasonContext.getSeasonData,
    
    // Draft context
    currentDraft: draftContext.currentDraft,
    setCurrentDraft: draftContext.setCurrentDraft,
    currentDraftTeams: draftContext.currentDraftTeams,
    setCurrentDraftTeams: draftContext.setCurrentDraftTeams,
    currentBoosterPackCards: draftContext.currentBoosterPackCards,
    setCurrentBoosterPackCards: draftContext.setCurrentBoosterPackCards,
    getDraftData: draftContext.getDraftData,
    getBoosterPackCards: draftContext.getBoosterPackCards,
    resetDraftState: draftContext.resetDraftState,
    
    // Team context
    currentUserTeam: teamContext.currentUserTeam,
    setCurrentUserTeam: teamContext.setCurrentUserTeam,
    currentTeamCards: teamContext.currentTeamCards,
    setCurrentTeamCards: teamContext.setCurrentTeamCards,
    getTeamCards: teamContext.getTeamCards,
    
    // Card library
    sets: userContext.sets,
    setSets: userContext.setSets,
    cards: cardLibrary.cards,

    // Card pool
    cardPools: cardPoolContext.cardPools,
    currentCardPool: cardPoolContext.currentCardPool,
    isLoading: cardPoolContext.isLoading,
    error: cardPoolContext.error,
    setCurrentCardPool: cardPoolContext.setCurrentCardPool,
    createCardPool: cardPoolContext.createCardPool,
    updateCardPool: cardPoolContext.updateCardPool,
    deleteCardPool: cardPoolContext.deleteCardPool,
    addCardToPool: cardPoolContext.addCardToPool,
    removeCardFromPool: cardPoolContext.removeCardFromPool,
    addCardsToPool: cardPoolContext.addCardsToPool,
    getCardQuantities: cardPoolContext.getCardQuantities,

  };
};

export default useAppContext;