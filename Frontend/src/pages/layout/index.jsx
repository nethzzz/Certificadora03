import React from "react";
import { Link, Outlet } from "react-router-dom"; 
import "./styles.css"; 

export default function Layout() {
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
            <Link to="/register" className="ld-btn">Cadastre-se</Link>
            <Link to="/login" className="ld-btn">Login</Link>

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