// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import JobList from './components/JobList';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';

function App() {
  return (
    <JobProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 mb-8">
              Browse through our curated list of opportunities and take the next step in your career
            </p>
            
            <FilterBar />
            <JobList />
          </div>
        </main>
        <Footer />
        <ApplicationModal />
      </div>
    </JobProvider>
  );
}

export default App;