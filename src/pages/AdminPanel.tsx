import React, { useState } from 'react';
import AdminGuard from '../components/AdminGuard';
import CreateSetForm from '../components/admin/CreateSetForm';
import ManageSetsTable from '../components/admin/ManageSetsTable';
import UserManagement from '../components/admin/UserManagement';

type AdminTab = 'users' | 'sets' | 'create-set';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('sets');

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
  };

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
        
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b">
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'users' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('users')}
          >
            User Management
          </button>
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'sets' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('sets')}
          >
            Manage Sets
          </button>
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'create-set' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabChange('create-set')}
          >
            Create Set
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'sets' && <ManageSetsTable />}
          {activeTab === 'create-set' && <CreateSetForm />}
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminPanel;