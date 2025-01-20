import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
// import HomePage from './pages/HomePage';
import LeagueManagerPage from './pages/LeagueManagerPage';
import CardPoolManager from './pages/CardPoolManager';
import Navbar from './components/navbar/Navbar';
import DisplayAllContextInfoPage from './pages/DisplayAllContextInfoPage';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<LeagueManagerPage />} />
            <Route path="/card-pool-manager" element={<CardPoolManager />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/league-manager" element={<LeagueManagerPage />} />
            <Route path="/display-all-context" element={<DisplayAllContextInfoPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
