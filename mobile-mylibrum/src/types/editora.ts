export type EditoraRequestDTO = {
    nome: string;
    nacionalidade?: string;
};

export type EditoraResponseDTO = {
    id: number;
    nome: string;
    nacionalidade?: string;
};
