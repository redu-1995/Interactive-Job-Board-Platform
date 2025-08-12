// src/components/FilterBar.js
import React from 'react';
import { useJobs } from '../context/JobContext';

const FilterBar = () => {
  const { filters, setFilters } = useJobs();
  
  // Use the same keys as backend
  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'ENTRY', label: 'Entry-Level' },
    { value: 'MID', label: 'Mid-Level' },
    { value: 'SENIOR', label: 'Senior' }
  ];
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Design', label: 'Design' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' }
  ];

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };
  
  const handleLocationChange = (e) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };
  
  const handleExperienceChange = (e) => {
    setFilters(prev => ({ ...prev, experience: e.target.value }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: 'all',
      location: '',
      experience: 'all',
      search: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City, State, or Remote"
            value={filters.location}
            onChange={handleLocationChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select
            value={filters.experience}
            onChange={handleExperienceChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {experienceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;