import React from 'react';
import SetFinder from '../components/SetFinder';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Magic: The Gathering App</h1>
      <p>This is the home page of your app where you can manage your Magic: The Gathering leagues, matchups, and more.</p>
      {/* Add more content as needed */}
      <SetFinder />

    </div>
  );
};

export default Home;