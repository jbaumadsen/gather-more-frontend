// component for the draft board it will have the league name at the top then the list of teams with their packqueue length and draftcardgrid and teamcardgrid

import useUserContext from "../../hooks/useUserContext";
import DraftCardGrid from "./DraftCardGrid";
import TeamCardGrid from "../team/TeamCardGrid";

const DraftBoard = () => {
  const { currentLeague, currentDraftTeams, currentDraft } = useUserContext();


  return (
    <div className="flex flex-col m-4">
      <h1 className="text-4xl font-bold">{currentLeague?.name} League</h1>
      <span className="text-2xl">Round {currentDraft?.currentRound}</span>
      <div className="flex flex-col mt-4">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2">Teams</h2>
        {currentDraftTeams.map((team) => (
          <div key={team._id}>
            <span className="text-xl font-bold">{team.name} Pack Queue: </span><span className="text-2xl">{team.packQueue.length}</span>
          </div>
        ))}
      </div>
      <DraftCardGrid />
      <TeamCardGrid />
    </div>
  );
};

export default DraftBoard;

