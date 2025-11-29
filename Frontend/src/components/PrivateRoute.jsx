// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Se o AuthContext ainda estiver verificando o token
  if (isLoading) {
    return <div>Verificando autenticação...</div>; // Tela de loading
  }

  // Se estiver autenticado, renderiza os componentes filhos (ex: <Dashboard />)
  if (isAuthenticated) {
    return children;
  }

  // Se não estiver autenticado, redireciona para a página de login
  return <Navigate to="/login" />;
};

export default PrivateRoute;