import React from "react";
import "../home/styles.css";  
import "./register.css";  

export default function Register() {
  return (
    <>
      <main className="ld-login-main">
        <div className="ld-login-card">
          <h1 className="ld-login-title">Criar uma nova conta</h1>

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
                placeholder="exemplo1234@"
                required
              />
            </div>

            <div className="ld-form-group">
              <label htmlFor="password" className="ld-form-label">Confirme sua senha</label>
              <input
                type="password"
                id="password"
                className="ld-input" 
                placeholder="exemplo1234@"
                required
              />
            </div>
            

            <button 
              type="submit" 
              className="ld-btn ld-btn-search ld-btn-login" 
            >
              Entrar
            </button>
          </form>

          <p className="ld-form-note">
            Já tem uma conta? <a href="/login">Faça login</a>
          </p>
        </div>
      </main>
    </>
  );
}