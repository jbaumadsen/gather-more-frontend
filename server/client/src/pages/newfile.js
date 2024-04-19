const handleAddLeague = async () => {
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

    // Create a new league
    const leagueResponse = await axios.post('/api/leagues', leagueData);
    const newLeagueId = leagueResponse.data._id;

    // Create a new team associated with the current user and the new league
    const teamData = {
      name: `${user.username}'s Team`,
      userId: user.id,
      leagueId: newLeagueId,
    };
    await axios.post('/api/teams', teamData);

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