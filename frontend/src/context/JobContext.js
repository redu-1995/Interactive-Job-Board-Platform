// src/context/JobContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const JobContext = createContext();

export function useJobs() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  const [filters, setFilters] = useState({ 
    category: 'all', 
    location: '', 
    experience: 'all',
    search: ''
  });

  // API URL configuration
  const API_BASE = process.env.REACT_APP_API_BASE_URL || '';
  const JOBS_API_URL = `${API_BASE}/api/jobs/`;

  // Fetch jobs with comprehensive error handling
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try primary API endpoint
      let response;
      try {
        response = await axios.get(JOBS_API_URL, { timeout: 5000 });
      } catch (primaryError) {
        console.warn("Primary API failed, trying fallback:", primaryError);
        try {
          // Try alternative endpoint
          response = await axios.get(JOBS_API_URL, { timeout: 5000 });
        } catch (fallbackError) {
          console.error("Fallback API failed:", fallbackError);
          throw new Error("Failed to connect to the server");
        }
      }
      
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs. Using sample data instead.');
      console.error("API Error:", err);
      
      // Fallback sample data
      setJobs([
        {
          id: 1,
          title: "Frontend Developer",
          company: "Tech Innovations Inc.",
          location: "San Francisco, CA",
          category: "Technology",
          experience_level: "MID",
          description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and Redux.",
          posted_at: "2023-05-15T12:00:00Z",
          application_link: "#",
          salary: "$90,000 - $120,000",
          job_type: "Full-time",
          is_remote: true
        },
        {
          id: 2,
          title: "Marketing Manager",
          company: "Growth Hackers LLC",
          location: "New York, NY",
          category: "Marketing",
          experience_level: "SENIOR",
          description: "Seeking an experienced Marketing Manager to lead our digital marketing campaigns and drive customer acquisition.",
          posted_at: "2023-05-10T09:30:00Z",
          application_link: "#",
          salary: "$80,000 - $110,000",
          job_type: "Full-time",
          is_remote: false
        },
        {
          id: 3,
          title: "UI/UX Designer",
          company: "Creative Solutions",
          location: "Remote",
          category: "Design",
          experience_level: "MID",
          description: "Join our design team to create beautiful and intuitive user experiences for our SaaS products.",
          posted_at: "2023-05-12T14:15:00Z",
          application_link: "#",
          salary: "$75,000 - $100,000",
          job_type: "Contract",
          is_remote: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [JOBS_API_URL]);

  // Fetch jobs on initial render
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // In your JobContext.js, update the filtering logic:
useEffect(() => {
  let result = [...jobs];
  
  // Category filter
  if (filters.category !== 'all') {
    result = result.filter(job => 
      job.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  // Location filter
  if (filters.location) {
    result = result.filter(job => 
      job.location?.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // Experience filter - compare with the stored value (ENTRY/MID/SENIOR)
  if (filters.experience !== 'all') {
    result = result.filter(job => 
      job.experience_level === filters.experience
    );
  }
  
  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    result = result.filter(job => 
      job.title?.toLowerCase().includes(searchTerm) ||
      job.company?.toLowerCase().includes(searchTerm) ||
      job.description?.toLowerCase().includes(searchTerm)
    );
  }
  
  setFilteredJobs(result);
}, [jobs, filters]);

  // Handle job application
  const applyForJob = (job) => {
    try {
      if (!job || !job.id) {
        throw new Error("Invalid job selected");
      }
      setSelectedJob(job);
      setShowApplicationModal(true);
    } catch (applyError) {
      console.error("Apply error:", applyError);
      alert("Failed to start application. Please try another job.");
    }
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  // Submit job application to backend
  const submitApplication = async (formData) => {
    try {
      if (!selectedJob || !selectedJob.id) {
        throw new Error("No job selected for application");
      }

      // Create FormData for file upload
      const applicationForm = new FormData();
      applicationForm.append('job', selectedJob.id);
      applicationForm.append('full_name', formData.fullName);
      applicationForm.append('email', formData.email);
      applicationForm.append('phone', formData.phone || '');
      applicationForm.append('cover_letter', formData.coverLetter || '');
      
      // Append resume file if exists
      if (formData.resume) {
        applicationForm.append('resume', formData.resume);
      }

      // Build application URL
      const APPLICATION_URL = `${API_BASE}/api/jobs/${selectedJob.id}/apply/`;
      
      // Make API request
      const response = await axios.post(
        APPLICATION_URL,
        applicationForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 10000
        }
      );

      return response.data;
    } catch (error) {
      console.error('Application error:', error);
      let errorMessage = 'Failed to submit application. Please try again.';
      
      // Handle Django validation errors
      if (error.response) {
        if (error.response.data) {
          // Extract validation errors from response
          const errorData = error.response.data;
          
          // Handle different error formats
          if (typeof errorData === 'object') {
            errorMessage = Object.values(errorData)
              .flat()
              .join('\n');
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Check your connection.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      throw new Error(errorMessage);
    }
  };

  // Context value
  const value = {
    jobs,
    filteredJobs,
    loading,
    error,
    filters,
    setFilters,
    applyForJob,
    showApplicationModal,
    closeApplicationModal,
    selectedJob,
    submitApplication
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}