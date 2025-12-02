import React, { useState, useEffect } from 'react';
import './SuportModal.css'; 

const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
};

const SUCCESS_STATE = 'Enviado com sucesso! Agradecemos o seu interesse.';

export default function SupportModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setFormData(INITIAL_STATE);
            setSuccessMessage(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        console.log("Dados a serem enviados:", formData);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSuccessMessage(SUCCESS_STATE);
            
            setFormData(INITIAL_STATE); 

        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ld-modal-overlay">
            <div className="ld-modal">
                <div className="ld-modal-header">
                    <h2>Quero Apoiar/Voluntariar</h2>
                    <button className="ld-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="ld-modal-content">
                    {/* Exibe a mensagem de sucesso se o formulário foi enviado */}
                    {successMessage ? (
                        <div className="ld-success-message">
                            <p className="ld-alert ld-alert-success">{successMessage}</p>
                            <button 
                                onClick={onClose} 
                                className="ld-btn ld-btn-search ld-btn-primary ld-full-width"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        // Exibe o formulário
                        <form onSubmit={handleSubmit} className="ld-form">
                            <p>Preencha seus dados para que a equipe possa entrar em contato com você!</p>
                            
                            <label className="ld-full-width">
                                Nome:
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required
                                    className="ld-input"
                                />
                            </label>

                            <label className="ld-full-width">
                                Email:
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required
                                    className="ld-input"
                                />
                            </label>

                            <label className="ld-full-width">
                                Telefone:
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    className="ld-input"
                                />
                            </label>

                            <button 
                                type="submit" 
                                className="ld-btn ld-btn-search ld-btn-primary ld-full-width" 
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}