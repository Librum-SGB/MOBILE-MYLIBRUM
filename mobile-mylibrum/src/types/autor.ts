export type AutorRequestDTO = {
    nome: string;
    nacionalidade?: string;
    // <suavez> confirmar formato esperado pelo backend (a entidade usa LocalDate — provavelmente "yyyy-MM-dd")
    dataNascimento?: string;
    dataFalecimento?: string;
    biografia?: string;
};

export type AutorResponseDTO = {
    id: number;
    nome: string;
    nacionalidade?: string;
    dataNascimento?: string;
    dataFalecimento?: string;
    biografia?: string;
};
