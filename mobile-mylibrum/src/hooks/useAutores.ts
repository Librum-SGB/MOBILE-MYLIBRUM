import { useEffect, useState } from 'react';
import api from '../api/api';
import { AutorRequestDTO, AutorResponseDTO } from '../types/autor';

export const useAutores = () => {
    const [autores, setAutores] = useState<AutorResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAutores = async () => {
        try {
            const response = await api.get<AutorResponseDTO[]>("/api/autores");
            setAutores(response.data);
        } catch (error) {
            console.error("Erro ao carregar autores:", error);
        } finally {
            setLoading(false);
        }
    };

    const addAutor = async (dto: AutorRequestDTO) => {
        const response = await api.post<AutorResponseDTO>("/api/autores", dto);
        setAutores([...autores, response.data]);
    };

    const updateAutor = async (id: number, dto: AutorRequestDTO) => {
        const response = await api.put<AutorResponseDTO>(`/api/autores/${id}`, dto);
        setAutores(autores.map((a) => (a.id === id ? response.data : a)));
    };

    const deleteAutor = async (id: number) => {
        await api.delete(`/api/autores/${id}`);
        setAutores(autores.filter((a) => a.id !== id));
    };

    useEffect(() => {
        fetchAutores();
    }, []);

    return { autores, loading, addAutor, updateAutor, deleteAutor };
};
