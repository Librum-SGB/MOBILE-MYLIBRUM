import { useEffect, useState } from 'react';
import api from '../api/api';
import { GeneroRequestDTO, GeneroResponseDTO } from '../types/genero';

export const useGeneros = () => {
    const [generos, setGeneros] = useState<GeneroResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchGeneros = async () => {
        try {
            const response = await api.get<GeneroResponseDTO[]>("/api/generos");
            setGeneros(response.data);
        } catch (error) {
            console.error("Erro ao carregar gêneros:", error);
        } finally {
            setLoading(false);
        }
    };

    const addGenero = async (dto: GeneroRequestDTO) => {
        const response = await api.post<GeneroResponseDTO>("/api/generos", dto);
        setGeneros([...generos, response.data]);
    };

    const updateGenero = async (id: number, dto: GeneroRequestDTO) => {
        const response = await api.put<GeneroResponseDTO>(`/api/generos/${id}`, dto);
        setGeneros(generos.map((g) => (g.id === id ? response.data : g)));
    };

    const deleteGenero = async (id: number) => {
        await api.delete(`/api/generos/${id}`);
        setGeneros(generos.filter((g) => g.id !== id));
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    return { generos, loading, addGenero, updateGenero, deleteGenero };
};
