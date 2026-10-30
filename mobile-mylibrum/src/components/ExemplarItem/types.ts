export interface ExemplarItemProps {
    id: number;
    codigoBarras: string;
    status: string;
    onDelete: (id: number) => void;
}
