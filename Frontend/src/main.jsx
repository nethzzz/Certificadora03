import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login/login";
import Layout from "./pages/layout";
import Register from "./pages/register";
import "./index.css";


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
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
