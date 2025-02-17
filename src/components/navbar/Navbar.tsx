import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext'; // Assuming you're using user context
import axios from 'axios';
import { League } from '../../types/league.types';

const envoronmentType = import.meta.env.VITE_ENVIRONMENT_TYPE;
console.log("envoronmentType", envoronmentType);

const Navbar: React.FC = () => {
  const { setUser, setToken, token, user, createLeague } = useUserContext();  // Access the user context to clear user data
  const [error, setError] = useState('');
  const navigate = useNavigate();  // React Router's useNavigate to redirect to other pages
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    // Clear the user's token and user data
    localStorage.removeItem('token');
    setUser(null);
    
    // Redirect to the login page
    navigate('/login');
  };

  const handleSecret6Login = async (e: React.FormEvent) => {
    // Redirect to the secret6 login page
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:5000/api/user/login', { email: 'secret6@agent.com', password: '66666666' });
      const { token } = response.data;
      // save token to local storage
      localStorage.setItem('token', token);
      setToken(token);

      navigate('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleSecret7Login = async (e: React.FormEvent) => {
    // Redirect to the secret5 login page
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:5000/api/user/login', { email: 'secret7@agent.com', password: '77777777' });
      const { token } = response.data;
      // save token to local storage
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleSecret8Login = async (e: React.FormEvent) => {
    // Redirect to the secret8 login page
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:5000/api/user/login', { email: 'secret8@agent.com', password: '88888888' });
      const { token } = response.data;
      // save token to local storage
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleSecret9Login = async (e: React.FormEvent) => {
    console.log("envoronmentType", envoronmentType);
    // Redirect to the secret9 login page
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:5000/api/user/login', { email: 'secret9@agent.com', password: '99999999' });
      const { token } = response.data;
      // save token to local storage
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleDeleteInfo = async () => {
    await axios.delete(`${apiBaseUrl}/league/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
      
    });

    await createLeague({ name: "test", maxPlayers: 8, ruleSet: "test", cardSets: ["test"], hasDraft: false } as League).catch(
      (error: Error) => {
        console.error("Error creating league", error);
        setError('Error creating league');
      }
    );
    // await getLeagueData();
    // setCurrentLeague(ownedLeagues[0]);
    // await getSeasonData();
    // const emails = ["secret7@agent.com", "secret8@agent.com", "secret9@agent.com"];
    // for (const email of emails) {
    //   const invite = {
    //     inviteeEmail: email,
    //     leagueId: currentLeague?._id,
    //     seasonId: currentSeason?._id,
    //   }
    // try {
    //   console.log("invite", invite);
    //   console.log("currentLeague", currentLeague);
    //   console.log("currentSeason", currentSeason);
    //   const response = await axios.post(`${apiBaseUrl}/season/invite`, invite, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
    //   console.log("response", response);
    // } catch (error) 
    //   {
    //     setError("Error inviting player");
    //     console.log("error", error);
    //   }
    // }


  };


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/" className="hover:text-gray-300">
            GatherMore
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/league-manager" className="hover:text-gray-300 flex items-center">
            League Manager
          </Link>
          {/* <Link to="/display-all-context" className="hover:text-gray-300 flex items-center">
            Display All Context
          </Link> */}
          {error && <p className="text-red-500">{error}</p>}
          <Link to="/card-pool-manager" className="hover:text-gray-300 flex items-center">Card Pool Manager</Link>

          
          
          {envoronmentType === 'development' && (
            <>
              <button
                onClick={handleSecret6Login}
                className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
              >
                Log Secret6 in
              </button>
              <button
                onClick={handleSecret7Login}
                className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
              >
                Log Secret7 in
              </button>
              {/* secret 8 */}
              <button
                onClick={handleSecret8Login}
                className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
              >
                Log Secret8 in
              </button>
              {/* secret 9 */}
              <button
                onClick={handleSecret9Login}
                className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
              >
                Log Secret9 in
              </button>
              <button
                onClick={handleDeleteInfo}
                className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
              >
                Delete Info/Reset
              </button>
            </>
          )}
          {user && user?.username && <span className="text-lg text-gray-300 flex items-center">
            Welcome, {user?.username}!
          </span>}
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
