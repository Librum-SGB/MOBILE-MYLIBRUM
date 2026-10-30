import { useEffect, useState } from 'react';
import api from '../api/api';
import { MaterialRequestDTO, MaterialResponseDTO } from '../types/material';

export const useMateriais = () => {
    const [materiais, setMateriais] = useState<MaterialResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMateriais = async () => {
        try {
            const response = await api.get<MaterialResponseDTO[]>("/api/materiais");
            setMateriais(response.data);
        } catch (error) {
            console.error("Erro ao carregar materiais:", error);
        } finally {
            setLoading(false);
        }
    };

    const addMaterial = async (dto: MaterialRequestDTO) => {
        const response = await api.post<MaterialResponseDTO>("/api/materiais", dto);
        setMateriais([...materiais, response.data]);
    };

    const updateMaterial = async (id: number, dto: MaterialRequestDTO) => {
        const response = await api.put<MaterialResponseDTO>(`/api/materiais/${id}`, dto);
        setMateriais(materiais.map((m) => (m.id === id ? response.data : m)));
    };

    const deleteMaterial = async (id: number) => {
        await api.delete(`/api/materiais/${id}`);
        setMateriais(materiais.filter((m) => m.id !== id));
    };

    useEffect(() => {
        fetchMateriais();
    }, []);

    return { materiais, loading, addMaterial, updateMaterial, deleteMaterial };
};
