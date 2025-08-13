// src/components/JobCard.js
import React from 'react';
import { useJobs } from '../context/JobContext';
import { format, parseISO } from 'date-fns';

// Safely format experience level
const getExperienceLabel = (level) => {
  switch(level) {
    case 'ENTRY': return 'Entry-Level';
    case 'MID': return 'Mid-Level';
    case 'SENIOR': return 'Senior';
    default: return level;
  }
};



const formatJobDate = (dateString) => {
  if (!dateString) return "recently";
  
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (e) {
    console.error('Date formatting error:', e);
    return "recently";
  }
};

const JobCard = ({ job }) => {
  const { applyForJob } = useJobs();
  
  // Safe handling for missing job
  if (!job) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-xl w-16 h-16 mr-4" />
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4">
          <div className="flex gap-2 mb-3">
            <span className="h-6 bg-gray-200 rounded-full w-24"></span>
            <span className="h-6 bg-gray-200 rounded-full w-20"></span>
          </div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mb-3"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <span className="h-4 bg-gray-200 rounded w-24"></span>
            <span className="h-10 bg-gray-200 rounded w-24"></span>
          </div>
        </div>
      </div>
    );
  }

  // Safely extract values with defaults
  const { 
    title = "Position Not Specified", 
    company = "Company Not Specified", 
    location = "Location Not Specified",
    category = "Uncategorized",
    experience_level = "",
    description = "No description available."
  } = job;

  const experience = getExperienceLabel(experience_level);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600">{company}</p>
              </div>
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${experience.color}`}>
            {getExperienceLabel(job.experience_level)}
          </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
              {category}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          
          <p className="text-gray-700 mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">

             <span className="text-sm text-gray-500">
            Posted {formatJobDate(job.posted_at)}
          </span>
            <button
              onClick={() => applyForJob(job)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label={`Apply for ${title} at ${company}`}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;