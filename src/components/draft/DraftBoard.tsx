// component for the draft board it will have the league name at the top then the list of teams with their packqueue length and draftcardgrid and teamcardgrid

import { useEffect } from "react";
import DraftCardGrid from "./DraftCardGrid";
import TeamCardGrid from "../team/TeamCardGrid";
import useLeagueContext from "../../context/useLeagueContext";
import useDraftContext from "../../context/useDraftContext";
import { useSeasonContext } from "../../context/useSeasonContext";
const DraftBoard = () => {
  const { currentLeague } = useLeagueContext();
  const { currentSeason } = useSeasonContext();
  const { currentDraft, currentDraftTeams, getDraftData } = useDraftContext();

  // if currentDraft is null then get the draft from the database
  useEffect(() => {
    if (currentSeason?.draft) {
      getDraftData(currentSeason.draft);
    }
  }, [currentSeason]);

  // console.log("currentDraftTeams in DraftBoard ln 12", currentDraftTeams);
  // console.log("currentDraft in DraftBoard ln 13", currentDraft);
  // console.log("currentLeague in DraftBoard ln 14", currentLeague);
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

