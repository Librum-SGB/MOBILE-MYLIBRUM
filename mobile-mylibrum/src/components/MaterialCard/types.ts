import { TipoMaterial } from '../../types/material';

export interface MaterialCardProps {
    id: number;
    titulo: string;
    tipo: TipoMaterial;
    onDelete: (id: number) => void;
}
