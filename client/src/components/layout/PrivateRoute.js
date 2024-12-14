import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if no user is authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;