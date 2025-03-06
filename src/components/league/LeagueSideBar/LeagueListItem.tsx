import { League } from '../../../types/league.types';
import useLeagueContext from '../../../hooks/useUserContext';
import { acceptInvite } from '../../../services/invite.services';
import { useState } from 'react'; 

interface LeagueListItemProps {
  league: League;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({ league }) => {
  const { setCurrentLeague, invitedLeagues, getLeagueData } = useLeagueContext();
  const [accepting, setAccepting] = useState(false);

  const handleAcceptInvite = async (seasonId: string) => {
    console.log("accepting invite", seasonId);
    setAccepting(true);
    try {
      await acceptInvite(seasonId);
      setAccepting(false);
      setCurrentLeague(league);
      await getLeagueData();
    } catch (error) {
      console.error("Error accepting invite", error);
      setAccepting(false);
    }
  };

  const isInvitedLeague = invitedLeagues.some((invitedLeague: League) => invitedLeague._id === league._id);

  const handleLeagueClick = (league: League, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentLeague(league);
  };

  return (
    <li 
      className="flex flex-row justify-between items-center px-3 hover:bg-gray-100 cursor-pointer rounded-md"
      onClick={(e) => handleLeagueClick(league, e)} 
      key={league._id}
    >

      <span className="text-lg font-semibold">{league.name}</span>
      {isInvitedLeague && (
        <button className="bg-blue-500 text-white px-2 py-0 ml-2 rounded-md" disabled={accepting} onClick={() => handleAcceptInvite(league.currentSeasonId || '')}>Accept</button>
      )}
    </li>
  );
};

export default LeagueListItem;