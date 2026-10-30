export type TipoMaterial = "LIVRO" | "PERIODICO" | "OUTROS";

export type MaterialRequestDTO = {
    titulo: string;
    editoraId: number;
    tipo?: TipoMaterial;
    subtitulo?: string;
    autorId?: number;
    autorIds?: number[];
    sinopse?: string;
    issn?: string;
    tema?: string;
    descricao?: string;
    observacao?: string;
    isbn?: string; // apenas dígitos, até 13 caracteres
    edicao?: number;
    anoPublicacao?: number;
    quantidadePaginas?: number;
    generoIds?: number[];
};

export type MaterialResponseDTO = {
    id: number;
    titulo: string;
    tipo: TipoMaterial;
    subtitulo?: string;
    autorId?: number;
    sinopse?: string;
    issn?: string;
    tema?: string;
    descricao?: string;
    observacao?: string;
    isbn?: string;
    edicao?: number;
    anoPublicacao?: number;
    quantidadePaginas?: number;
    editoraId: number;
    autorIds?: number[];
    generoIds?: number[];
    dataCriacao?: string;
    dataUltimaAtualizacao?: string;
};
