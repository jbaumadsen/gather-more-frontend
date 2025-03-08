import React from 'react';

interface CardPoolTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isEditDisabled: boolean;
  isBulkAddDisabled: boolean;
}

const CardPoolTabs: React.FC<CardPoolTabsProps> = ({ 
  activeTab, 
  onTabChange,
  isEditDisabled,
  isBulkAddDisabled
}) => {
  const tabs = [
    { id: 'create', label: 'Create Card Pool', disabled: false },
    { id: 'edit', label: 'Edit Card Pool', disabled: isEditDisabled },
    { id: 'bulk', label: 'Bulk Add', disabled: isBulkAddDisabled }
  ];

  return (
    <div className="flex mb-6 border-b">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`px-4 py-2 font-medium transition-colors
            ${activeTab === tab.id 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
            }
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CardPoolTabs;