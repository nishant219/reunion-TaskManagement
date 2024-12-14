import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Layout, List, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                TaskMaster
              </Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 inline-flex items-center px-3 pt-1 text-sm font-medium"
                >
                  <Layout className="mr-2" size={20} /> Dashboard
                </Link>
                <Link 
                  to="/tasks" 
                  className="text-gray-700 hover:text-blue-600 inline-flex items-center px-3 pt-1 text-sm font-medium"
                >
                  <List className="mr-2" size={20} /> Tasks
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <span className="mr-4 text-gray-700">
                  Welcome, {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 inline-flex items-center"
                >
                  <LogOut className="mr-2" size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;