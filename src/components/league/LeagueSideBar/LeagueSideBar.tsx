import LeagueList from "./LeagueList";
import useUserContext from "../../../hooks/useUserContext";
import CreateLeague from "../CreateLeague";

const LeagueSideBar = () => {
  const { ownedLeagues, invitedLeagues, teamLeagues } = useUserContext();
  return (
    <div className="flex flex-col w-1/4 mt-10">
      <LeagueList listHeading="Owned Leagues" leagues={ownedLeagues} />
      <LeagueList listHeading="Invited Leagues" leagues={invitedLeagues} />
      <LeagueList listHeading="Team Leagues" leagues={teamLeagues} />
      <CreateLeague />  
    </div>
  );
};

export default LeagueSideBar;