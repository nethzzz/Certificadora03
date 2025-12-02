import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = "http://localhost:3000"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            checkAuthentication(token); 
        } else {
            setIsLoading(false);
        }
    }, []);

    const checkAuthentication = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/checkuser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error("Token JWT inválido ou expirado.");
                logout();
            }
        } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

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
            const token = data.token;
            
            localStorage.setItem('authToken', token);
            setAuthToken(token);

            checkAuthentication(token); 

            return { success: true };
        } else {
            const errorMsg = data.message || 'Credenciais inválidas.';
            return { success: false, error: errorMsg };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
    };

    const value = {
        authToken,
        user,
        isLoading,
        isAuthenticated: !!authToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <div>Carregando autenticação...</div> : children}
        </AuthContext.Provider>
    );
};