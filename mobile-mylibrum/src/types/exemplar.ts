export type StatusExemplar = "DISPONIVEL" | "EMPRESTADO" | "RESERVADO" | "MANUTENCAO" | "EXTRAVIADO";

export type ExemplarRequestDTO = {
    materialId: number;
    filialId: number;
    estanteId: number;
    codigoBarras: string;
    prateleira?: string;
    posicao?: string;
    status?: StatusExemplar;
    dataAquisicao?: string; // LocalDate — formato "AAAA-MM-DD"
    observacoes?: string;
};

export type ExemplarResponseDTO = {
    id: number;
    materialId: number;
    filialId: number;
    estanteId: number;
    prateleira?: string;
    posicao?: string;
    codigoBarras: string;
    status: StatusExemplar;
    dataAquisicao?: string;
    observacoes?: string;
    dataCriacao?: string;
    dataUltimaAtualizacao?: string;
};
