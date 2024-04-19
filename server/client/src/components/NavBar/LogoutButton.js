import React, { useContext } from 'react';
import { ProgramContext } from '../../context/ProgramContext';
import './logoutButton.scss';

const LogoutButton = () => {
    const { setUser} = useContext(ProgramContext);

    const handleLogout = () => {
      setUser({});
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;