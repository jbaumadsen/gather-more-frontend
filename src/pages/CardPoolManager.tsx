import React, { useState, useEffect } from 'react';
import CardPoolTabs from '../components/cardPool/CardPoolTabs';
import CreateCardPoolTab from '../components/cardPool/CreateCardPoolTab';
import EditCardPoolTab from '../components/cardPool/EditCardPoolTab';
import BulkAddTab from '../components/cardPool/BulkAddTab';
import CardPoolList from '../components/cardPool/CardPoolList';
import useCardPoolContext from '../context/useCardPoolContext';

const CardPoolManager: React.FC = () => {
  const { currentCardPool, cardPools } = useCardPoolContext();
  // Start on edit tab by default
  const [activeTab, setActiveTab] = useState('edit');

  // Check if we should switch to create tab when no card pools exist
  useEffect(() => {
    if (cardPools.length === 0) {
      setActiveTab('create');
    }
  }, [cardPools]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Determine if tabs should be disabled
  const isEditDisabled = cardPools.length === 0;
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
      {activeTab === 'create' && <CreateCardPoolTab />}
      
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    
          <CardPoolList />
        
          <div className="md:col-span-3">
            {currentCardPool ? (
              <EditCardPoolTab />
            ) : (
              <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg">Select a card pool from the list to edit</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'bulk' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <CardPoolList />
          </div>
          <div className="md:col-span-3">
            <BulkAddTab />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPoolManager;