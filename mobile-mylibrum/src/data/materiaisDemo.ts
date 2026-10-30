import { TipoMaterial } from '../types/material';

export type ItemAcervo = {
  id: string;
  titulo: string;
  tipo: TipoMaterial;
  codigo: string;
  disponibilidade: 'DISPONIVEL' | 'INDISPONIVEL' | 'SEM_EXEMPLARES';
  isbn?: string;
  subtitulo?: string;
  anoPublicacao?: number;
  sinopse?: string;
};

// Fallback exclusivamente didático, utilizado quando a API não pode ser consultada.
export const ACERVO_DEMO: ItemAcervo[] = [
  { id: 'demo1', codigo: 'L-00001', titulo: 'Aprendendo Java', tipo: 'LIVRO', disponibilidade: 'DISPONIVEL', sinopse: 'Introdução ao desenvolvimento com Java.' },
  { id: 'demo2', codigo: 'P-00002', titulo: 'Revista Exemplo', tipo: 'PERIODICO', disponibilidade: 'DISPONIVEL' },
  { id: 'demo3', codigo: 'L-00003', titulo: 'Jardins de Papel', tipo: 'LIVRO', disponibilidade: 'DISPONIVEL' },
  { id: 'demo4', codigo: 'L-00004', titulo: 'Caminhos do Tempo', tipo: 'LIVRO', disponibilidade: 'DISPONIVEL' },
  { id: 'demo5', codigo: 'L-00005', titulo: 'Ciência no Cotidiano', tipo: 'LIVRO', disponibilidade: 'DISPONIVEL' },
  { id: 'demo6', codigo: 'L-00006', titulo: 'Código Aberto', tipo: 'LIVRO', disponibilidade: 'DISPONIVEL' },
  { id: 'demo7', codigo: 'L-00007', titulo: 'Versos da Cidade', tipo: 'LIVRO', disponibilidade: 'INDISPONIVEL' },
];
