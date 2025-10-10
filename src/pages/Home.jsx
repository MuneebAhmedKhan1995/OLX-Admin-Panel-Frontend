import React from 'react';
import Navbar from './Navbar';
import Registration from './Registration';
import Login from './Login';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-pulse">
            Welcome to Our Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing features and services tailored for you
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">Lightning fast performance with 99.9% uptime guarantee.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600">Enterprise-grade security to protect your data.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Innovative</h3>
            <p className="text-gray-600">Cutting-edge features that drive your success.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;