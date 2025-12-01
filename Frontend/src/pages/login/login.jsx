// src/pages/Login.js
import React, { useState } from "react";
// Importamos o hook de autenticação
import { useAuth } from '../../context/AuthContext.jsx'; 
// Assumindo que você usa react-router-dom
import { useNavigate, Link } from 'react-router-dom'; 
import "../home/styles.css";  
import "./login.css";  

export default function Login() {
  // Usamos o hook do AuthContext
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State para os inputs e mensagens
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Se o usuário já estiver autenticado, redireciona imediatamente
  if (isAuthenticated) {
    navigate('/');
    return null; // Não renderiza o formulário de login
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chama a função de login do Contexto
      const result = await login(email, password);

      if (result.success) {
        // Redireciona após o login bem-sucedido (aqui ou dentro do AuthContext)
        navigate('/'); 
      } else {
        // Exibe o erro retornado pelo Contexto
        setError(result.error);
      }
    } catch (err) {
      console.error("Erro desconhecido:", err);
      setError('Erro de comunicação com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="ld-login-main">
        <div className="ld-login-card">
          <h1 className="ld-login-title">Acessar sua conta</h1>
          
          <form className="ld-login-form" onSubmit={handleLoginSubmit}>
            
            {/* Mensagem de Erro */}
            {error && 
              <div style={{ 
                padding: '10px', 
                backgroundColor: '#ffe5e5', 
                border: '1px solid red', 
                borderRadius: '8px', 
                color: 'red', 
                textAlign: 'center' 
              }}>
                {error}
              </div>
            }

            <div className="ld-form-group">
              <label htmlFor="email" className="ld-form-label">E-mail</label>
              <input
                type="email"
                id="email"
                className="ld-input" 
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Link to="/esqueci-senha" className="ld-form-link">
              Esqueceu sua senha?
            </Link>
            {/*<a href="/recuperar-senha" className="ld-form-link">Esqueceu sua senha?</a>*/}

            {/* Botão de Login */}
            <button 
              type="submit" 
              className="ld-btn ld-btn-search ld-btn-login" 
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="ld-form-note">
            Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </main>
    </>
  );
}