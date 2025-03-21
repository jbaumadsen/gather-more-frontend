import { League } from '../../../types/league.types';
import useLeagueContext from '../../../context/useLeagueContext';
import useDraftContext from '../../../context/useDraftContext';
import useTeamContext from '../../../context/useTeamContext';
import useSeasonContext from '../../../context/useSeasonContext';
import { acceptInvite } from '../../../services/invite.service';
import { useState } from 'react'; 

interface LeagueListItemProps {
  league: League;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({ league }) => {
  const { currentLeague, setCurrentLeague, invitedLeagues, getLeagueData } = useLeagueContext();
  const { currentSeason, getSeasonData } = useSeasonContext();
  const { resetTeamState } = useTeamContext();
  const { getDraftData } = useDraftContext();
  const [accepting, setAccepting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAcceptInvite = async (seasonId: string) => {
    console.log("accepting invite", seasonId);
    setAccepting(true);
    try {
      await acceptInvite(seasonId);
      setAccepting(false);
      handleLeagueClick(league, new MouseEvent('click') as unknown as React.MouseEvent);
      await getLeagueData();
    } catch (error) {
      console.error("Error accepting invite", error);
      setAccepting(false);
    }
  };

  const isInvitedLeague = invitedLeagues.some((invitedLeague: League) => invitedLeague._id === league._id);

  const handleLeagueClick = async (league: League, e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Set the current league
    setCurrentLeague(league);
    
    try {
      // Load season data for this league
      await getSeasonData();
      
      // If there's a season with a draft
      if (currentSeason?.draft) {
        // Load the draft data
        await getDraftData(currentSeason.draft);
        
        // Draft data should have team info and the components
        // that need team data will access it via TeamContext
      } else {
        // No draft, so reset team state
        resetTeamState();
      }
    } catch (error) {
      console.error("Error loading league data:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    // if the league is the current league, add a background color to the bottom of the li
    <li 
      className={`flex flex-row justify-between items-center px-3 hover:bg-gray-100 cursor-pointer rounded-md ${loading ? 'opacity-70' : ''} ${league._id === currentLeague?._id ? 'bg-gray-100' : ''}`}
      onClick={(e) => handleLeagueClick(league, e)} 
      key={league._id}
    >
      <span className="text-lg font-semibold">{league.name}</span>
      {loading && <span className="text-sm text-gray-500">Loading...</span>}
      {isInvitedLeague && (
        <button 
          className="bg-blue-500 text-white px-2 py-0 ml-2 rounded-md" 
          disabled={accepting || loading} 
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptInvite(league.currentSeasonId || '');
          }}
        >
          Accept
        </button>
      )}
    </li>
  );
};

export default LeagueListItem;