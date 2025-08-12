// src/components/ApplicationModal.js
import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';

const ApplicationModal = () => {
  const { 
    showApplicationModal, 
    closeApplicationModal, 
    selectedJob,
    submitApplication
  } = useJobs();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'resume') {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      await submitApplication(formData);
      setIsSubmitting(false);
    }
  };
  
  if (!showApplicationModal || !selectedJob) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Apply for {selectedJob.title}
            </h2>
            <button 
              onClick={closeApplicationModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
              <div>
                <h3 className="font-semibold">{selectedJob.company}</h3>
                <p className="text-sm text-gray-600">{selectedJob.location}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${errors.resume ? 'border-red-500' : 'border-gray-300'}`}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                {errors.resume && (
                  <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Why are you interested in this position?"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeApplicationModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;