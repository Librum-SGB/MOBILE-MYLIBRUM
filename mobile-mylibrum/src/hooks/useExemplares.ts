import { useEffect, useState } from 'react';
import api from '../api/api';
import { ExemplarRequestDTO, ExemplarResponseDTO } from '../types/exemplar';

export const useExemplares = () => {
    const [exemplares, setExemplares] = useState<ExemplarResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchExemplares = async () => {
        try {
            const response = await api.get<ExemplarResponseDTO[]>("/api/exemplares");
            setExemplares(response.data);
        } catch (error) {
            console.error("Erro ao carregar exemplares:", error);
        } finally {
            setLoading(false);
        }
    };

    const addExemplar = async (dto: ExemplarRequestDTO) => {
        const response = await api.post<ExemplarResponseDTO>("/api/exemplares", dto);
        setExemplares([...exemplares, response.data]);
    };

    const deleteExemplar = async (id: number) => {
        await api.delete(`/api/exemplares/${id}`);
        setExemplares(exemplares.filter((e) => e.id !== id));
    };

    useEffect(() => {
        fetchExemplares();
    }, []);

    return { exemplares, loading, addExemplar, deleteExemplar };
};
