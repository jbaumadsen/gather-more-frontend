import React, { useState } from 'react';
import CardPoolTabs from '../components/cardPool/CardPoolTabs';
import CreateCardPoolTab from '../components/cardPool/CreateCardPoolTab';
import EditCardPoolTab from '../components/cardPool/EditCardPoolTab';
import BulkAddTab from '../components/cardPool/BulkAddTab';
import useUserContext from '../hooks/useUserContext';

const CardPoolManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const { currentCardPool } = useUserContext();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Determine if non-create tabs should be disabled
  const isEditDisabled = !currentCardPool;
  const isBulkAddDisabled = !currentCardPool;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Card Pool Manager</h1>
      
      {/* Tabs Navigation */}
      <CardPoolTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isEditDisabled={isEditDisabled}
        isBulkAddDisabled={isBulkAddDisabled}
      />
      
      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 'create' && <CreateCardPoolTab />}
        {activeTab === 'edit' && <EditCardPoolTab />}
        {activeTab === 'bulk' && <BulkAddTab />}
      </div>
    </div>
  );
};

export default CardPoolManager;