import React from 'react';
import AdminGuard from '../components/AdminGuard';
import ManageSetCardsButtons from '../components/admin/ManageSetCardsButtons';
import useUserContext from '../hooks/useUserContext';
import { updateSets } from '../services/set.services';
import CreateSetForm from '../components/admin/CreateSetForm';

const AdminPanel: React.FC = () => {
  const { token } = useUserContext();

  const handleUpdateSets = () => {
    console.log("update sets");
    if (token) {
      updateSets(token);
    } else {
      console.log("No token found");
    }
  }

  return (
  <AdminGuard>
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      <button className='bg-blue-500 text-white p-2 rounded-md w-1/3 mx-auto' onClick={() => handleUpdateSets()}>Update Sets</button>
    </div>
    <CreateSetForm />

    <ManageSetCardsButtons />
  </AdminGuard>
  );
};

export default AdminPanel;
