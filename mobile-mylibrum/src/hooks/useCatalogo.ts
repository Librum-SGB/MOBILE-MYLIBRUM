import { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import { ItemAcervo, ACERVO_DEMO } from '../data/materiaisDemo';
import { MaterialResponseDTO } from '../types/material';
import { ExemplarResponseDTO } from '../types/exemplar';
import axios from 'axios';

const PREFIXOS = { LIVRO: 'L', PERIODICO: 'P', OUTROS: 'O' } as const;

export function useCatalogo() {
  const [itens, setItens] = useState<ItemAcervo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [demo, setDemo] = useState(false);
  const [aviso, setAviso] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const materiaisResp = await api.get<MaterialResponseDTO[]>('/api/materiais', { timeout: 7000 });
      if (!Array.isArray(materiaisResp.data)) throw Error('A API não retornou uma lista de materiais');
      let exemplares: ExemplarResponseDTO[] = [];
      let avisoExemplar = '';
      try {
        const exemplarResp = await api.get<ExemplarResponseDTO[]>('/api/exemplares', { timeout: 7000 });
        if (Array.isArray(exemplarResp.data)) exemplares = exemplarResp.data;
      } catch {
        avisoExemplar = 'Não foi possível consultar o status dos exemplares.';
      }
      const catalogo = materiaisResp.data.map((material): ItemAcervo => {
        const relacionados = exemplares.filter(e => e.materialId === material.id);
        const disponibilidade = relacionados.length === 0 || avisoExemplar
          ? 'SEM_EXEMPLARES'
          : relacionados.some(e => e.status === 'DISPONIVEL') ? 'DISPONIVEL' : 'INDISPONIVEL';
        return {
          id: String(material.id),
          codigo: `${PREFIXOS[material.tipo] || 'O'}-${String(material.id).padStart(5, '0')}`,
          titulo: material.titulo,
          tipo: material.tipo,
          subtitulo: material.subtitulo,
          isbn: material.isbn,
          anoPublicacao: material.anoPublicacao,
          sinopse: material.sinopse,
          disponibilidade,
        };
      });
      setItens(catalogo);
      setDemo(false);
      setAviso(avisoExemplar);
    } catch (err) {
      // Somente falha de conexão: permite apresentar os sete cards da referência.
      // Não substitui erros HTTP (ex.: 401/403) por dados fictícios.
      const semResposta = axios.isAxiosError(err) && !err.response;
      if (semResposta) {
        setItens(ACERVO_DEMO);
        setDemo(true);
        setAviso('Modo demonstração — não foi possível conectar à API.');
      } else {
        setItens([]);
        setDemo(false);
        setAviso('Não foi possível carregar o acervo. Verifique sua permissão e o servidor.');
      }
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);
  return { itens, carregando, demo, aviso, recarregar: carregar };
}
