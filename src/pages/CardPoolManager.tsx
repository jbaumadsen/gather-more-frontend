import React from 'react';
import CreateCardPoolForm from '../components/cardPool/CreateCardPoolForm';
import CardPoolList from '../components/cardPool/CardPoolList';
import EditCardPoolForm from '../components/cardPool/EditCardPoolForm';
import CardPoolDisplay from '../components/cardPool/CardPoolDisplay';

const CardPoolManager: React.FC = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Card Pool Manager</h1>
      <div className="flex flex-row">
        <CreateCardPoolForm />
      </div>
      <CardPoolList />
      <EditCardPoolForm />
      <CardPoolDisplay />
    </div>
  );
};

export default CardPoolManager;
