import React, { useState, useEffect } from 'react';
import { useApiClient } from '../services/api.jsx';
import './ParticipantFormModal.css';


const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    birth: '',
    address: '',
    sex: 'Feminino',
    type: 'voluntario'
};

export default function ParticipantFormModal({ isOpen, onClose, initialData = null, onParticipantSaved }) {
    const { create, update } = useApiClient();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const isEditMode = !!initialData?._id;
    const formTitle = isEditMode ? 'Editar Participante' : 'Cadastrar Novo Participante';

    useEffect(() => {
        if (isEditMode) {
            const birthDate = initialData.birth ? new Date(initialData.birth).toISOString().split('T')[0] : '';
            setFormData({
                ...initialData,
                birth: birthDate
            });
        } else {
            setFormData(INITIAL_STATE);
        }
        setError(null);
        setSuccessMessage(null);
    }, [initialData, isEditMode]);

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

        if (!formData.name || !formData.email || !formData.type) {
            setError("Os campos Nome, Email e Tipo são obrigatórios.");
            setLoading(false);
            return;
        }

        try {
            let result;
            if (isEditMode) {
                result = await update(initialData._id, formData);
            } else {
                result = await create(formData);
            }
            
            const message = isEditMode ? 'Participante atualizado com sucesso!' : 'Participante cadastrado com sucesso!';
            setSuccessMessage(message);

            if (onParticipantSaved) {
                onParticipantSaved(result);
            }
            
            if (!isEditMode) {
                setFormData(INITIAL_STATE);
            }

            setTimeout(onClose, 1500);

        } catch (err) {
            setError(err.message || "Ocorreu um erro ao salvar o participante.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ld-modal-overlay">
            <div className="ld-modal">
                <div className="ld-modal-header">
                    <h2>{formTitle}</h2>
                    <button className="ld-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="ld-form">
                    
                    {/* Alertas */}
                    {error && <p className="ld-alert ld-alert-error">{error}</p>}
                    {successMessage && <p className="ld-alert ld-alert-success">{successMessage}</p>}

                    {/* Linha 1: Nome e Email */}
                    <div className="ld-form-row">
                        <label>
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
                        <label>
                            Email:
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required
                                className="ld-input"
                                disabled={isEditMode}
                            />
                        </label>
                    </div>

                    {/* Linha 2: Telefone e Data de Nascimento */}
                    <div className="ld-form-row">
                        <label>
                            Telefone:
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="ld-input"
                            />
                        </label>
                        <label>
                            Data de Nasc.:
                            <input 
                                type="date" 
                                name="birth" 
                                value={formData.birth} 
                                onChange={handleChange} 
                                className="ld-input"
                            />
                        </label>
                    </div>

                    {/* Linha 3: Sexo e Tipo */}
                    <div className="ld-form-row">
                        <label>
                            Sexo:
                            <select name="sex" value={formData.sex} onChange={handleChange} className="ld-input">
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </label>
                        <label>
                            Tipo:
                            <select name="type" value={formData.type} onChange={handleChange} className="ld-input">
                                <option value="voluntario">Voluntário</option>
                                <option value="apoiador">Apoiador</option>
                            </select>
                        </label>
                    </div>

                    {/* Linha 4: Endereço (Campo único) */}
                    <label className="ld-full-width">
                        Endereço:
                        <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className="ld-input"
                        />
                    </label>

                    <button 
                        type="submit" 
                        className="ld-btn ld-btn-search ld-btn-primary ld-full-width" 
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Cadastrar Participante'}
                    </button>
                </form>
            </div>
        </div>
    );
}