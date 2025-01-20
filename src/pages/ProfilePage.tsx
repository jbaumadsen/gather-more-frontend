import React, { useEffect } from 'react';
import useUserContext from '../hooks/useUserContext';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const { user, setUser, loading } = useUserContext();

  useEffect(() => {
    if (!user && !loading) {
      const token = localStorage.getItem('token');
      if (token) {
        axios
          .get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch(() => {
            setUser(null);
          });
      }
    }
  }, [user, loading, setUser]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
