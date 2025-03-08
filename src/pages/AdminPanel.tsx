import React from 'react';
import AdminGuard from '../components/AdminGuard';
import CreateSetForm from '../components/admin/CreateSetForm';
import ManageSetsTable from '../components/admin/ManageSetsTable';

const AdminPanel: React.FC = () => {

  return (
  <AdminGuard>
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
    </div>
    <CreateSetForm />
    <ManageSetsTable />
  </AdminGuard>
  );
};

export default AdminPanel;
