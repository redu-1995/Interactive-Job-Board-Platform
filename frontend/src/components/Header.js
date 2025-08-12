// src/components/Header.js
import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';


const Header = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-lg mr-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            </div>
            <NavLink to="/" className="text-2xl font-bold">JobConnect</NavLink>
          </div>
          
          
          
         
        </div>
        
      
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `hover:text-indigo-200 transition-colors font-medium ${
                  isActive ? 'text-indigo-200 underline' : ''
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/jobs" 
              className={({ isActive }) => 
                `hover:text-indigo-200 transition-colors font-medium ${
                  isActive ? 'text-indigo-200 underline' : ''
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </NavLink>       
                   
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;