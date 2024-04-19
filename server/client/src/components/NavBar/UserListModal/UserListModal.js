import React, { useContext } from 'react';
import { ProgramContext } from '../../../context/ProgramContext';

const UserListModal = ({ onClose }) => {
  const { setUser } = useContext(ProgramContext);
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const handleUserClick = (user) => {
    setUser(user);
    onClose();
  };

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListModal;