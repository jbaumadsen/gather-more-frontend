import { useState } from "react";
import useLeagueContext from "../../context/useLeagueContext";
import useSeasonContext from "../../context/useSeasonContext";
import axios from "axios";  

const InviteComponent = () => {
  const { currentLeague } = useLeagueContext();
  const { currentSeason } = useSeasonContext();
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInviteEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!inviteeEmail) {
      setError("Please enter an email address");
      return;
    }

    if (!inviteeEmail.includes("@") || !inviteeEmail.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    const invite = {
      inviteeEmail: inviteeEmail,
      leagueId: currentLeague?._id,
      seasonId: currentSeason?._id,
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/season/invite`, invite, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      console.log("response", response);
    } catch (error) {
      setError("Error inviting player");
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleInviteEmail}>
        <input className="border border-gray-300 rounded-l p-2" type="email" placeholder="Email" value={inviteeEmail} onChange={(e) => setInviteeEmail(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-700 transition duration-300" type="submit">Invite</button>
      </form>
      <h3 className="text-lg font-bold mt-4">Invited Players</h3>

      {currentSeason && currentSeason.invitedUserIds &&
        <ul>
            {currentSeason?.invitedUserIds.map((player: string) => (
              <li key={player}>{player}</li>
            ))}
        </ul>
      }
    </div>
  );
}

export default InviteComponent;
