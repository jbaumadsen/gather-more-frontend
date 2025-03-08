import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LeagueManagerPage from './pages/LeagueManagerPage';
import CardPoolManager from './pages/CardPoolManager';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'; // Import the Footer
import AdminPanel from './pages/AdminPanel';
import { CardPoolProvider } from './context/cardPools/CardPoolContext';
import { CardLibraryProvider } from './context/cardLibrary/CardLibraryContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <CardLibraryProvider>
        <CardPoolProvider>
          <Router>
            <div className="flex flex-col min-h-screen"> {/* Add this wrapper */}
              <Navbar />
              <main className="flex-grow container mx-auto px-4"> {/* Add flex-grow to push footer down */}
                <Routes>
                  <Route path="/" element={<LeagueManagerPage />} />
                  <Route path="/card-pool-manager" element={<CardPoolManager />} />
                  <Route path="/league-manager" element={<LeagueManagerPage />} />
                  <Route path="/admin-panel" element={<AdminPanel />} />
                  {/* <Route path="/display-all-context" element={<DisplayAllContextInfoPage />} /> */}
                </Routes>
              </main>
              <Footer /> {/* Add the Footer component */}
            </div>
          </Router>
        </CardPoolProvider>
      </CardLibraryProvider>
    </UserProvider>
  );
};

export default App;