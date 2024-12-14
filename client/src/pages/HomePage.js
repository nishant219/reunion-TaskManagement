import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-lg text-center bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to TaskMaster</h1>
        <p className="text-gray-600 mb-8">
          Organize your tasks, boost your productivity, and take control of your day.
        </p>
        {user ? (
          <Link 
            to="/dashboard" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;