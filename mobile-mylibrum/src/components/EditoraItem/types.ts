export interface EditoraItemProps {
    id: number;
    nome: string;
    nacionalidade?: string;
    onDelete: (id: number) => void;
}
