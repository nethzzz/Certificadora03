import React from "react";
import { Link, Outlet } from "react-router-dom"; 
// 🔑 Importar o hook de autenticação
import { useAuth } from '../../context/AuthContext.jsx'; 
import "./styles.css"; 

// Ajuste o caminho de importação se o seu AuthContext não estiver em './context/AuthContext'
// Se Layout estiver em pages/layout.js, e AuthContext em context/AuthContext.js, o caminho deve ser:
// import { useAuth } from '../context/AuthContext'; 


export default function Layout() {
  // 1. Chamar o hook useAuth para acessar o estado de login e a função logout
  const { isAuthenticated, logout } = useAuth(); 

  // 2. Definir o que será renderizado nas ações (Login/Dashboard/Logout)
  const AuthActions = () => {
    if (isAuthenticated) {
      return (
        <>
          {/* Botão 1: Leva para o Dashboard/Painel */}
          <Link to="/dashboard" className="ld-btn ld-btn-dashboard">
            Dashboard
          </Link>
          {/* Botão 2: Logout - Chama a função do Context */}
          <button 
            onClick={logout} 
            className="ld-btn ld-btn-logout"
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }} // Estilo temporário para destaque
          >
            Sair
          </button>
        </>
      );
    }

    // Se não estiver autenticado, retorna os links de Cadastro e Login
    return (
      <>
        <Link to="/register" className="ld-btn">Cadastre-se</Link>
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
            <a href="/#como-participar">Como participar?</a>
            <a href="/#quem-somos">Quem Somos</a>
            <a href="/#participantes">Participantes</a>
            <a href="/#apoiadores">Apoiadores</a>
          </nav>

          <div className="ld-actions">
            
            {/* 3. Usamos o componente condicional aqui */}
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