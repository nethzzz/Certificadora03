import React, { useEffect, useState, useCallback } from 'react';
import { useApiClient } from '../../services/api.jsx';
import ParticipantFormModal from '../../components/ParticipantFormModal';
import './dashboard.css';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; 
import UserFormModal from '../../components/UserFormModal.jsx';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); 
    return date.toLocaleDateString('pt-BR');
};

const Participant = ({ _id, name, email, userType, phone, birth, sex, address, onEdit, onDelete }) => (
    <tr className="ld-table-row">
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone || 'N/A'}</td>
        <td>{formatDate(birth)}</td>
        <td>{sex || 'N/A'}</td>
        <td>{address || 'N/A'}</td>
        <td>
            <span className={`ld-badge ld-badge-${userType === 'Voluntario' ? 'participant' : userType === 'Apoiador' ? 'supporter' : 'admin'}`}>
                {userType ? userType.toUpperCase() : 'NÃO DEFINIDO'}
            </span>
        </td>
        {/* COLUNA DE AÇÕES */}
        <td className="ld-action-cell">
            <button className="ld-icon-btn ld-edit-btn" title="Editar" onClick={() => onEdit(_id)}>
                <FaEdit />
            </button>
            <button className="ld-icon-btn ld-delete-btn" title="Excluir" onClick={() => onDelete(_id, name)}>
                <FaTrash />
            </button>
        </td>
    </tr>
);


export default function Dashboard() {
    const { get, search, remove } = useApiClient(); 
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingParticipant, setEditingParticipant] = useState(null);

    const fetchParticipants = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (searchTerm.trim() === '') {
                data = await get('/participants'); 
            } else {
                data = await search(searchTerm); 
            }
            if (data) {
                setParticipants(data);
            }
        } catch (err) {
            setError(err.message || 'Falha ao carregar a lista de participantes.');
        } finally {
            setLoading(false);
        }
    }, [get, search, searchTerm]);
    
    useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        fetchParticipants();
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
    
}, [searchTerm, fetchParticipants]);

    const handleOpenRegisterModal = () => {
        setEditingParticipant(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (id) => {
        const participantToEdit = participants.find(p => p._id === id);
        setEditingParticipant(participantToEdit);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingParticipant(null);
    };

    const handleOpenUserModal = () => setIsUserModalOpen(true);

    const handleCloseUserModal = () => setIsUserModalOpen(false);

    const handleUserSaved = () => {
        console.log("Novo usuário Admin cadastrado com sucesso!");
    };

    const handleParticipantSaved = (savedParticipant) => {
    if (searchTerm) {
        setSearchTerm('');
    }
    
    fetchParticipants(); 
};

    const handleEdit = handleOpenEditModal;

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja remover o participante "${name}"? Esta ação é irreversível e exige permissão de Admin.`)) {
            try {
                setLoading(true);
                await remove(id);
                
                setParticipants(participants.filter(p => p._id !== id));
                alert(`Participante ${name} removido com sucesso.`);

            } catch (err) {
                alert(err.message || 'Erro ao remover participante.');
            } finally {
                setLoading(false);
            }
        }
    };
    

    if (loading) {
        return (
            <main className="ld-dashboard-main">
                <div className="ld-container">
                    <h2>Carregando Participantes...</h2>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="ld-dashboard-main">
                <div className="ld-container">
                    <h2 style={{color: 'red'}}>Erro ao carregar dados: {error}</h2>
                </div>
            </main>
        );
    }
    
    if (participants.length === 0 && searchTerm.length > 0) {
         return (
            <main className="ld-dashboard-main">
                <div className="ld-container">
                    <h1 className="ld-dashboard-title">Lista de Participantes Ativos</h1>
                    
                    <div className="ld-dashboard-controls">
                        <div className="ld-search-bar">
                            <FaSearch className="ld-search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou e-mail..."
                                className="ld-input ld-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            className="ld-btn ld-btn-search ld-btn-primary" 
                            onClick={handleOpenRegisterModal}
                        >
                            <FaPlus /> Cadastrar Novo
                        </button>
                    </div>
                    <h2>Nenhum participante encontrado para o termo "{searchTerm}".</h2>
                </div>
                <ParticipantFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    initialData={editingParticipant}
                    onParticipantSaved={handleParticipantSaved}
                />
            </main>
        );
    }
    
    return (
        <main className="ld-dashboard-main">
            <div className="ld-container">
                <h1 className="ld-dashboard-title">Lista de Participantes Ativos ({participants.length})</h1>

                <div className="ld-dashboard-controls ld-dashboard-actions">
                    <button 
                        className="ld-btn ld-btn-search ld-btn-secondary" 
                        onClick={handleOpenUserModal}
                        style={{ background: '#f0f0f0', color: '#111' }}
                    >
                        <FaPlus /> Cadastrar Novo Usuário
                    </button>
                </div>
                
                <div className="ld-dashboard-controls">
                    <div className="ld-search-bar">
                        <FaSearch className="ld-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou e-mail..."
                            className="ld-input ld-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        className="ld-btn ld-btn-search ld-btn-primary" 
                        onClick={handleOpenRegisterModal}
                    >
                        <FaPlus /> Cadastrar Novo
                    </button>
                </div>

                <div className="ld-table-responsive">
                    <table className="ld-participants-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Nascimento</th>
                                <th>Sexo</th>
                                <th>Endereço</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map((p) => (
                                <Participant 
                                    key={p._id || p.email} 
                                    {...p} 
                                    userType={p.type} 
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            
            <ParticipantFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingParticipant}
                onParticipantSaved={handleParticipantSaved}
            />
            <UserFormModal
                isOpen={isUserModalOpen}
                onClose={handleCloseUserModal}
                onUserSaved={handleUserSaved}
            />
        </main>
    );
}