// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JobConnect</h3>
            <p className="text-gray-400">
              Connecting talented professionals with their dream opportunities.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;