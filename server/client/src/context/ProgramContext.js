import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProgramContext = createContext();

function ProgramContextProvider(props) {
  const [activeCards, setActiveCards] = useState([]);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [user, setUser] = useState(currentUser || {});

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    if (user.email) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (!users.find(u => u.email === user.email)) {
        const updatedUsers = [...users, { email: user.email, token: user.token }];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }
  }, [user]);

  function logoutUser() {
    setUser({});
    const updatedUsers = users.filter(u => u.email !== user.email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  return (
    <ProgramContext.Provider value={{ activeCards, user, setUser, logoutUser }}>
      {props.children}
    </ProgramContext.Provider>
  );
}

export { ProgramContext, ProgramContextProvider };