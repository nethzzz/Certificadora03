import React from "react";
import "../home/styles.css";  
import "./login.css";  

export default function Login() {
  return (
    <>
      <main className="ld-login-main">
        <div className="ld-login-card">
          <h1 className="ld-login-title">Acessar sua conta</h1>
          
          <form className="ld-login-form" onSubmit={(e) => e.preventDefault()}>
            
            <div className="ld-form-group">
              <label htmlFor="email" className="ld-form-label">E-mail</label>
              <input
                type="email"
                id="email"
                className="ld-input" 
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="ld-form-group">
              <label htmlFor="password" className="ld-form-label">Senha</label>
              <input
                type="password"
                id="password"
                className="ld-input" 
                placeholder="Sua senha"
                required
              />
            </div>

            <a href="/recuperar-senha" className="ld-form-link">Esqueceu sua senha?</a>

            {/* Botão de Login */}
            <button 
              type="submit" 
              className="ld-btn ld-btn-search ld-btn-login" 
            >
              Entrar
            </button>
          </form>

          {/* Link para Cadastro */}
          <p className="ld-form-note">
            Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </main>
    </>
  );
}