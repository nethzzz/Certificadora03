// src/components/UserFormModal.js
import React, { useState } from 'react';
import { useApiClient } from '../services/api.jsx';
import './ParticipantFormModal.css'; // Reutilizando os estilos do modal

const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    birth: '',
    sex: 'Masculino',
    type: 'admin', // Assumindo que o formulário é para criar ADMINS ou o tipo será passado.
    address: '',
    password: '',
    confirmpassword: '',
};

export default function UserFormModal({ isOpen, onClose, onUserSaved }) {
    const { registerUser } = useApiClient();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (formData.password !== formData.confirmpassword) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        try {
            // 🔑 Chamada à nova função registerUser
            await registerUser(formData);
            
            setSuccessMessage('Novo usuário cadastrado com sucesso!');
            setFormData(INITIAL_STATE); // Limpa o formulário
            
            if (onUserSaved) {
                onUserSaved();
            }

            setTimeout(onClose, 1500);

        } catch (err) {
            setError(err.message || "Ocorreu um erro ao cadastrar o usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ld-modal-overlay">
            <div className="ld-modal">
                <div className="ld-modal-header">
                    <h2>Cadastrar Novo Usuário (Admin)</h2>
                    <button className="ld-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="ld-form">
                    
                    {error && <p className="ld-alert ld-alert-error">{error}</p>}
                    {successMessage && <p className="ld-alert ld-alert-success">{successMessage}</p>}

                    {/* Nome e Email */}
                    <div className="ld-form-row">
                        <label> Nome: <input type="text" name="name" value={formData.name} onChange={handleChange} required className="ld-input" /> </label>
                        <label> Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required className="ld-input" /> </label>
                    </div>

                    {/* Telefone e Data de Nascimento */}
                    <div className="ld-form-row">
                        <label> Telefone: <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="ld-input" /> </label>
                        <label> Data de Nasc.: <input type="date" name="birth" value={formData.birth} onChange={handleChange} className="ld-input" /> </label>
                    </div>

                    {/* Senha e Confirmação */}
                    <div className="ld-form-row">
                        <label> Senha: <input type="password" name="password" value={formData.password} onChange={handleChange} required className="ld-input" /> </label>
                        <label> Confirme a Senha: <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} required className="ld-input" /> </label>
                    </div>
                    
                    {/* Sexo e Tipo */}
                    <div className="ld-form-row">
                        <label>
                            Sexo:
                            <select name="sex" value={formData.sex} onChange={handleChange} className="ld-input">
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </label>
                        <label>
                            Tipo de Usuário:
                            <select name="type" value={formData.type} onChange={handleChange} className="ld-input">
                                <option value="admin">Admin</option>
                                <option value="common">Comum</option>
                            </select>
                        </label>
                    </div>

                    {/* Endereço */}
                    <label className="ld-full-width"> Endereço: <input type="text" name="address" value={formData.address} onChange={handleChange} className="ld-input" /> </label>

                    <button type="submit" className="ld-btn ld-btn-search ld-btn-primary ld-full-width" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar Novo Usuário'}
                    </button>
                </form>
            </div>
        </div>
    );
}