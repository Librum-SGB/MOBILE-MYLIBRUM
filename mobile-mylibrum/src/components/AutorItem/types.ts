export interface AutorItemProps {
    id: number;
    nome: string;
    nacionalidade?: string;
    onDelete: (id: number) => void;
}
