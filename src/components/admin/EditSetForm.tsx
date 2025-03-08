// components/sets/EditSetForm.tsx
import React, { useState } from 'react';
import { Set } from '../../types/set.types';

interface EditSetFormProps {
  set: Set;
  onSubmit: (updatedSet: Set) => void;
  onCancel: () => void;
}

const EditSetForm: React.FC<EditSetFormProps> = ({ set, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: set.name,
    setCode: set.setCode,
    isImported: set.isImported || false,
    isPrimarySet: set.isPrimarySet || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("set in EditSetForm.tsx ln 29: ", set);
    
    const updatedSet: Set = {
      ...set,
      name: formData.name,
      setCode: formData.setCode,
      isImported: formData.isImported,
      isPrimarySet: formData.isPrimarySet,
    };
    
    onSubmit(updatedSet);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Set Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode">
          Set Code
        </label>
        <input
          type="text"
          id="setCode"
          name="setCode"
          value={formData.setCode}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <div className="mr-2 text-gray-700 font-bold">
            Is Imported:
          </div>
          <div className="relative">
            <input 
              type="checkbox" 
              id="isImported"
              name="isImported"
              checked={formData.isImported}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`block w-10 h-6 rounded-full transition ${formData.isImported ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${formData.isImported ? 'translate-x-4' : ''}`}></div>
          </div>
        </label>
      </div>

      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="mr-2 text-gray-700 font-bold">
            Is Primary Set:
          </div>
          <div className="relative">
            <input 
              type="checkbox" 
              id="isPrimarySet"
              name="isPrimarySet"
              checked={formData.isPrimarySet}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`block w-10 h-6 rounded-full transition ${formData.isPrimarySet ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${formData.isPrimarySet ? 'translate-x-4' : ''}`}></div>
          </div>
        </label>
      </div>
      
      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditSetForm;