import React from 'react';
import { League } from "../../../types/league.types";
import LeagueListItem from "./LeagueListItem";

interface LeagueListProps {
  listHeading: string;
  leagues: League[];
}

const LeagueList: React.FC<LeagueListProps> = ({ listHeading, leagues }: LeagueListProps) => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{listHeading}</h1>
      <ul className="list-none border-l border-gray-300 pl-4">
        {leagues.map((league) => (
          <LeagueListItem league={league} key={league._id} />
        ))}
      </ul>
    </div>
  );
}
export default LeagueList;