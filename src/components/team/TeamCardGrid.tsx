// a grid of cards for the team

import useUserContext from "../../hooks/useUserContext";
import TeamCard from "./TeamCard";

const TeamCardGrid = () => {
  const { currentUserTeam, currentTeamCards } = useUserContext();

  if (!currentUserTeam) {
    return <div>Loading...</div>;
  }

  console.log("currentTeamCards", currentTeamCards);


  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mt-4">Team Card Grid</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {currentTeamCards.map((card) => (
          card && <TeamCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default TeamCardGrid;

