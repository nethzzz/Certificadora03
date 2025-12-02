import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando autenticação...</div>; 
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;