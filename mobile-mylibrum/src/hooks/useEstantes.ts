import { useEffect, useState } from 'react';
import api from '../api/api';
import { EstanteResponseDTO } from '../types/estante';

// <suavez> confirmar endpoint real de Estante (chutei /estantes pelo mesmo padrão dos outros)
export const useEstantes = () => {
    const [estantes, setEstantes] = useState<EstanteResponseDTO[]>([]);

    useEffect(() => {
        const fetchEstantes = async () => {
            try {
                const response = await api.get<EstanteResponseDTO[]>("/api/estantes");
                setEstantes(response.data);
            } catch (error) {
                console.error("Erro ao carregar estantes:", error);
            }
        };
        fetchEstantes();
    }, []);

    return { estantes };
};
