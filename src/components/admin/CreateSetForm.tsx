import React, { useState } from 'react';
import axios from 'axios';
import { createSet } from '../../services/set.services';
import useUserContext from '../../hooks/useUserContext';

const CreateSetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    setCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token, sets, setSets } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (!token) {
      setError('No token found');
      return;
    }
    try {
      const response = await createSet(formData.name, formData.setCode, token);
      setSuccess(true);
      setFormData({ name: '', setCode: '' }); // Reset form
      setSets([...sets, response]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to create set. Please try again.');
      } else {
        setError('Failed to create set. Please try again.');
      }
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Set</h2>
      
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
          Set created successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Set Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter set name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="setCode" className="block text-sm font-medium text-gray-700 mb-1">
            Set Code
          </label>
          <input
            type="text"
            id="setCode"
            name="setCode"
            value={formData.setCode}
            onChange={handleChange}
            required
            placeholder="Enter set code (e.g., RTR, GRN)"
            maxLength={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Set codes are typically 3-5 characters</p>
        </div>
        
        <button 
          type="submit" 
          className={`w-full py-2 px-4 rounded-md font-medium text-white 
            ${loading || !formData.name || !formData.setCode 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
          disabled={loading || !formData.name || !formData.setCode}
        >
          {loading ? 'Creating...' : 'Create Set'}
        </button>
      </form>
    </div>
  );
};

export default CreateSetForm;