import { useEffect, useState } from 'react';
import api from '../api/api';
import { EditoraRequestDTO, EditoraResponseDTO } from '../types/editora';

export const useEditoras = () => {
    const [editoras, setEditoras] = useState<EditoraResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEditoras = async () => {
        try {
            const response = await api.get<EditoraResponseDTO[]>("/api/editoras");
            setEditoras(response.data);
        } catch (error) {
            console.error("Erro ao carregar editoras:", error);
        } finally {
            setLoading(false);
        }
    };

    const addEditora = async (dto: EditoraRequestDTO) => {
        const response = await api.post<EditoraResponseDTO>("/api/editoras", dto);
        setEditoras([...editoras, response.data]);
    };

    const updateEditora = async (id: number, dto: EditoraRequestDTO) => {
        const response = await api.put<EditoraResponseDTO>(`/api/editoras/${id}`, dto);
        setEditoras(editoras.map((e) => (e.id === id ? response.data : e)));
    };

    const deleteEditora = async (id: number) => {
        await api.delete(`/api/editoras/${id}`);
        setEditoras(editoras.filter((e) => e.id !== id));
    };

    useEffect(() => {
        fetchEditoras();
    }, []);

    return { editoras, loading, addEditora, updateEditora, deleteEditora };
};
