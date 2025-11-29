// src/services/api.js
import { useAuth } from '../context/AuthContext'; // Para acessar o token
import React, { useContext, useMemo } from 'react';
// ⚠️ Ajuste esta URL para a porta da sua API (ex: http://localhost:3000)
const API_BASE_URL = "http://localhost:3000"; 

export const useApiClient = () => {
    const { authToken, logout } = useAuth();
    
    // Garantimos que as funções sejam estáveis com useMemo
    const apiClient = useMemo(() => {
        
        // Função base para todas as requisições (fetcher)
        const fetcher = async (path, options = {}) => {
            if (!authToken) {
                console.error("Tentativa de acesso a API sem token.");
                return null;
            }

            try {
                const response = await fetch(`${API_BASE_URL}${path}`, {
                    ...options,
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                        ...options.headers,
                    },
                });

                // Tratamento de Token (401) e Permissão (403)
                if (response.status === 401 || response.status === 403) {
                    const message = response.status === 403 ? 'Acesso negado. Você precisa ser Admin.' : 'Sessão expirada. Faça login novamente.';
                    console.warn(message);
                    logout();
                    throw new Error(message);
                }

                if (!response.ok) {
                    const errorBody = await response.json().catch(() => ({ message: `Erro na API: ${response.status}` }));
                    throw new Error(errorBody.message);
                }
                
                // Trata DELETE (204 No Content)
                if (response.status === 204) return true; 

                return await response.json();

            } catch (error) {
                console.error(`Erro na requisição ${path}:`, error);
                throw error;
            }
        };


        // Funções CRUD e Busca

        const get = (path) => fetcher(path, { method: 'GET' });
        
        const search = (query) => {
            const path = `/participants/search?q=${encodeURIComponent(query)}`;
            return fetcher(path, { method: 'GET' });
        };
        
        // Função de Cadastro (POST)
        const create = (data) => fetcher(`/participants`, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        // Função de Atualização (PATCH)
        const update = (id, data) => fetcher(`/participants/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify(data),
        });

        const registerUser = (data) => fetcher(`/users/register`, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        // Função de Exclusão (DELETE)
        const remove = (id) => fetcher(`/participants/${id}`, { method: 'DELETE' });
        
        return { get, search, create, update, remove, registerUser };
        
    }, [authToken, logout]);

    return apiClient;
};