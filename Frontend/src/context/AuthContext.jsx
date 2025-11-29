// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// ⚠️ Defina a URL base da sua API aqui!
const API_BASE_URL = "http://localhost:3000"; 

// 1. Criação do Contexto
const AuthContext = createContext();

// Hook customizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

// 2. Componente Provedor de Contexto
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null); // Para armazenar dados do usuário (opcional)
    const [isLoading, setIsLoading] = useState(true);

    // Efeito para verificar o token salvo no localStorage na montagem
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            // Chama a função para validar e buscar os dados do usuário
            checkAuthentication(token); 
        } else {
            setIsLoading(false);
        }
    }, []);

    // Função para verificar se o token é válido e buscar dados do usuário
    const checkAuthentication = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/checkuser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                // Se o token for válido (Código 200)
                const userData = await response.json();
                setUser(userData); // Salva os dados do usuário
            } else {
                // Token inválido (Código 401)
                console.error("Token JWT inválido ou expirado.");
                logout(); // Desloga automaticamente
            }
        } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Função de Login
    const login = async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token; // Pega o token retornado pela API
            
            // 🔑 Salva o token e atualiza o estado
            localStorage.setItem('authToken', token);
            setAuthToken(token);

            // Opcional: Chama checkAuthentication para buscar os dados do usuário após o login
            checkAuthentication(token); 

            return { success: true };
        } else {
            // Retorna a mensagem de erro da API ou uma mensagem padrão
            const errorMsg = data.message || 'Credenciais inválidas.';
            return { success: false, error: errorMsg };
        }
    };

    // 4. Função de Logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
        // Opcional: Redirecionar o usuário para a página de login aqui (usando useNavigate se o contexto for criado dentro de um componente de roteamento, ou deixando para o componente)
    };

    // Objeto de valor do Contexto
    const value = {
        authToken,
        user,
        isLoading,
        isAuthenticated: !!authToken, // Booleano que indica se está logado
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Opcional: Se estiver carregando, mostra uma tela de carregamento para evitar flicker */}
            {isLoading ? <div>Carregando autenticação...</div> : children}
        </AuthContext.Provider>
    );
};