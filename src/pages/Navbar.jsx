import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegistration = () => {
    navigate('/registration');
  };

  const handleHome = () => {
    navigate('/');
  };

  // Check if we're on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={handleHome}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Logo
            </span>
          </div>

          {/* Navigation Links - Hide on auth pages */}
          {/* {!isAuthPage && ( */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Home
              </a>
              <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">
                Contact
              </a>
            </div>
          {/* )} */}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthPage ? (
              <>
                <button 
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegistration}
                  className="border-2 border-purple-500 text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition duration-300"
                >
                  Register
                </button>
              </>
            ) : (
              <button 
                // onClick={handleHome}
                // className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
              >
                
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


