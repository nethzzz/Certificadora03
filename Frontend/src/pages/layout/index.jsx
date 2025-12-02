import React from "react";
import { Link, Outlet } from "react-router-dom"; 
import { useAuth } from '../../context/AuthContext.jsx'; 
import "./styles.css"; 

export default function Layout() {
  const { isAuthenticated, logout } = useAuth(); 


  const AuthActions = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link to="/dashboard" className="ld-btn ld-btn-dashboard">
            Dashboard
          </Link>
          <button 
            onClick={logout} 
            className="ld-btn ld-btn-logout"
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
          >
            Sair
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/login" className="ld-btn">Login</Link>
      </>
    );
  };

  return (
    <>
      <header className="ld-header">
        <div className="ld-container">
          <Link to="/" className="ld-logo" aria-label="Meninas Digitais - Início">
            <img src="/logo.png" alt="Logo Meninas Digitais" className="ld-logo-image" />
            <span>Laços Digitais</span>
          </Link>

          <nav className="ld-nav" aria-label="principal">
            <a href="/#info">Valores</a>
            <a href="/#quem-somos">Quem Somos</a>
            <a href="/#como-participar">Como participar?</a>
            <a href="/#busca">Buscar</a>
          </nav>

          <div className="ld-actions">
            
            <AuthActions /> 

            <button
              className="ld-burger"
              aria-label="Abrir menu"
              aria-expanded="false"
              onClick={() => document.body.classList.toggle("ld-nav-open")}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      
      <Outlet /> 
    </>
  );
}