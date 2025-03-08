import React from 'react';
import CreateCardPoolForm from './CreateCardPoolForm';
import CardPoolList from './CardPoolList';

const CreateCardPoolTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <CreateCardPoolForm />
      </div>
      <div className="md:col-span-2">
        <CardPoolList />
      </div>
    </div>
  );
};

export default CreateCardPoolTab;