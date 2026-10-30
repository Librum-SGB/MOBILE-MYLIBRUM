import { useEffect, useState } from 'react';
import api from '../api/api';
import { FilialResponseDTO } from '../types/filial';

// <suavez> confirmar endpoint real de Filial (chutei /filiais pelo mesmo padrão dos outros)
export const useFiliais = () => {
    const [filiais, setFiliais] = useState<FilialResponseDTO[]>([]);

    useEffect(() => {
        const fetchFiliais = async () => {
            try {
                const response = await api.get<FilialResponseDTO[]>("/api/filiais");
                setFiliais(response.data);
            } catch (error) {
                console.error("Erro ao carregar filiais:", error);
            }
        };
        fetchFiliais();
    }, []);

    return { filiais };
};
