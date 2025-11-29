// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes da Aplicação
import Home from "./pages/home";
import Login from "./pages/login/login";
import Layout from "./pages/layout";
import Register from "./pages/register";
import "./index.css";

// 🔑 Importações do Sistema de Autenticação (Context e Guardião de Rota)
import { AuthProvider } from "./context/AuthContext.jsx"; 
import PrivateRoute from "./components/PrivateRoute.jsx"; 

// Componente Exemplo: Crie este componente para ter uma rota protegida!
import Dashboard from "./pages/dashboard/dashboard.jsx"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",     
        element: <Home />, // Exemplo de rota pública ou semi-pública
      },
      {
        path: "/login",  
        element: <Login />,
      },
      {
        path: "/register",  
        element: <Register />,
      },
      // 🔒 Exemplo de Rota Protegida com PrivateRoute
      {
        path: "/dashboard", 
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🌐 Envolvemos todo o RouterProvider no AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);