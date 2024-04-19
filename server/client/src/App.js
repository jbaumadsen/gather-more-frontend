import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgramContext } from './context/ProgramContext';
import SignupForm from './components/SignupForm';
import LogoutButton from './components/NavBar/LogoutButton';
import NavBar from './components/NavBar/NavBar'; 
import Home from './pages/Home';
import Leagues from './pages/Leagues';

function App() {
  const { user } = useContext(ProgramContext);

  return (
    <Router>
      <div className="App">
        {!user.email ? <SignupForm></SignupForm> :    
          <> 
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={!user.token ? <SignupForm /> : <LogoutButton />} />
              <Route path="/leagues" element={!user.token ? <SignupForm />: <Leagues />} />
            </Routes>
          </>   
        }
      </div>
    </Router>
  );
}

export default App;
