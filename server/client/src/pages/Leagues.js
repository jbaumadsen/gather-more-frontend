import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProgramContext } from '../context/ProgramContext';

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);
  const [showAddLeague, setShowAddLeague] = useState(false);
  const [newLeague, setNewLeague] = useState({
    name: '',
    format: 'Standard',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    maxNumberOfPlayers: 10,
    creatorId: '',
    status: 'Active',
    currentRound: 1,
    season: new Date().getFullYear().toString(),
    hasDraft: true,
    ruleSet: 'Standard',
    cardSets: [],
    teamIds: [],
  });

  const navigate = useNavigate();
  const { user } = useContext(ProgramContext);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get('/api/allLeagues', config);
      setLeagues(response.data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  const handleDraftClick = (leagueId) => {
    navigate(`/draft/${leagueId}`);
  };

  const handleAddLeagueClick = () => {
    setShowAddLeague(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNewLeague((prevLeague) => ({
      ...prevLeague,
      [name]: inputValue,
    }));
  };

  const handleAddLeague = async () => {
    console.log('user is : ', user);
    try {
      const leagueData = {
        ...newLeague,
        creatorId: user.id,
        status: newLeague.status,
        currentRound: newLeague.currentRound,
        season: newLeague.season,
        hasDraft: newLeague.hasDraft,
        ruleSet: newLeague.ruleSet,
        maxNumberOfPlayers: newLeague.maxNumberOfPlayers,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
    // Create a new league
    const leagueResponse = await axios.post('/api/leagues', leagueData, config);
const newLeagueId = leagueResponse.data._id;

    // Create a new team associated with the current user and the new league
    const teamData = {
      name: `${user.username}'s Team`,
      userId: user.id,
      leagueId: newLeagueId,
    };
    await axios.post('/api/teams', user , teamData);

      setShowAddLeague(false);
      setNewLeague({
        name: '',
        format: 'Standard',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        maxNumberOfPlayers: 10,
        creatorId: user.id,
        status: 'Active',
        currentRound: 1,
        season: new Date().getFullYear().toString(),
        hasDraft: true,
        ruleSet: 'Standard',
        cardSets: [],
        teamIds: [],
      });
      fetchLeagues();
    } catch (error) {
      console.error('Error adding league:', error);
    }
  };

  return (
    <div>
      <h2>My Leagues</h2>
      <button onClick={handleAddLeagueClick}>Add League</button>
      {showAddLeague && (
        <div>
          <h3>Add League</h3>
          <input
            type="text"
            name="name"
            value={newLeague.name}
            onChange={handleInputChange}
            placeholder="League Name"
          />

          <select
            name="format"
            value={newLeague.format}
            onChange={handleInputChange}
          >
            <option value="Standard">Standard</option>
            <option value="Modern">Modern</option>
            <option value="Legacy">Legacy</option>
            {/* Add more format options as needed */}
          </select>
          <input
            type="date"
            name="startDate"
            value={newLeague.startDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endDate"
            value={newLeague.endDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="maxNumberOfPlayers"
            value={newLeague.maxNumberOfPlayers}
            onChange={handleInputChange}
            min="1"
          />
          <select
            name="status"
            value={newLeague.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="checkbox"
            name="hasDraft"
            checked={newLeague.hasDraft}
            onChange={handleInputChange}
          />
          <label htmlFor="hasDraft">Has Draft</label>
          <select
            name="ruleSet"
            value={newLeague.ruleSet}
            onChange={handleInputChange}
          >
            <option value="Standard">Standard</option>
            <option value="House Rules">House Rules</option>
            {/* Add more rule set options as needed */}
          </select>
          <button onClick={handleAddLeague}>Add</button>
        </div>
      )}
      {Array.isArray(leagues) && leagues.length > 0 ? (
        leagues.map((league) => (
          <div key={league._id}>
            <h3>{league.name}</h3>
            <p>Format: {league.format}</p>
            <p>Start Date: {league.startDate}</p>
            <p>End Date: {league.endDate}</p>
            <p>Max Players: {league.maxNumberOfPlayers}</p>
            {league.hasDraft && (
              <button onClick={() => handleDraftClick(league._id)}>
                Go to Draft
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No leagues found</p>
      )}
    </div>
  );
};

export default LeaguesPage;