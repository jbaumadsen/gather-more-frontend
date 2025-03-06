import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import LeagueManagerPage from './pages/LeagueManagerPage';
import CardPoolManager from './pages/CardPoolManager';
import Navbar from './components/navbar/Navbar';
import AdminPanel from './pages/AdminPanel';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<LeagueManagerPage />} />
            <Route path="/card-pool-manager" element={<CardPoolManager />} />
            <Route path="/league-manager" element={<LeagueManagerPage />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            {/* <Route path="/display-all-context" element={<DisplayAllContextInfoPage />} /> */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
