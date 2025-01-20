import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const ContextDisplayPage: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">
          Error: UserContext is undefined!
        </div>
      </div>
    );
  }

  const {
    user,
    loading,
    sets,
    ownedLeagues,
    invitedLeagues,
    seasons,
    currentLeague,
    currentSeason,
  } = context;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Application Context</h1>
      <div className="space-y-6">
        {/* User Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">User</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {/* Loading Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Loading</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(loading, null, 2)}
          </pre>
        </div>

        {/* Sets Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Sets</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(sets, null, 2)}
          </pre>
        </div>

        {/* Leagues Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Leagues</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(ownedLeagues, null, 2)}
          </pre>
        </div>

        {/* Invited Leagues Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Invited Leagues</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(invitedLeagues, null, 2)}
          </pre>
        </div>

        {/* Seasons Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Seasons</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(seasons, null, 2)}
          </pre>
        </div>

        {/* Current League Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Current League</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(currentLeague, null, 2)}
          </pre>
        </div>

        {/* Current Season Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-2">Current Season</h2>
          <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(currentSeason, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContextDisplayPage;
