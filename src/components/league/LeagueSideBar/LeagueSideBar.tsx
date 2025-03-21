import LeagueList from "./LeagueList";
import useLeagueContext from "../../../context/useLeagueContext";
import CreateLeague from "../CreateLeague";

const LeagueSideBar = () => {
  const { ownedLeagues, invitedLeagues, teamLeagues } = useLeagueContext();
  // console.log("ownedLeagues", ownedLeagues);
  // console.log("invitedLeagues", invitedLeagues);
  // console.log("teamLeagues", teamLeagues);
  // owned leagues should not be shown under team leagues
  const teamLeaguesNotOwned = teamLeagues.filter((league) => !ownedLeagues.some((ownedLeague) => ownedLeague._id === league._id));

  return (
    <div className="flex flex-col mt-10">
      {ownedLeagues.length > 0 && <LeagueList listHeading="Owned Leagues" leagues={ownedLeagues} />}
      {invitedLeagues.length > 0 && <LeagueList listHeading="Invited Leagues" leagues={invitedLeagues} />}
      {teamLeaguesNotOwned.length > 0 && <LeagueList listHeading="Team Leagues" leagues={teamLeaguesNotOwned} />}
      <CreateLeague />  
    </div>
  );
};

export default LeagueSideBar;