import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Login from "./pages/login/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import PrivateRoute from "./components/PrivateRoute.jsx"; 
import Dashboard from "./pages/dashboard/dashboard.jsx"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",     
        element: <Home />,
      },
      {
        path: "/login",  
        element: <Login />,
      },
      {
        path: "/register",  
        element: <Register />,
      },

      { path: "/esqueci-senha", element: <ForgotPassword /> },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);