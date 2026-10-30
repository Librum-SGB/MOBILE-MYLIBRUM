import { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ItemAcervo } from '../../data/materiaisDemo';
import { useCatalogo } from '../../hooks/useCatalogo';
import { PesquisaVoz } from '../../components/PesquisaVoz';
import { AcervoCard } from '../../components/AcervoCard';

const OPCOES = [
  { id: 'TODOS', label: 'Todos' },
  { id: 'LIVRO', label: 'Livros' },
  { id: 'PERIODICO', label: 'Periódicos' },
  { id: 'OUTROS', label: 'Outros' },
] as const;
const normalizar = (texto: string) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function AcervoScreen() {
  const { itens, carregando, demo, aviso, recarregar } = useCatalogo();
  const [filtro, setFiltro] = useState<string>('TODOS');
  const [pesquisa, setPesquisa] = useState('');
  const [selecionado, setSelecionado] = useState<ItemAcervo | null>(null);
  const filtrados = useMemo(() => itens.filter(item => {
    return (filtro === 'TODOS' || item.tipo === filtro) &&
      normalizar(`${item.titulo} ${item.codigo} ${item.subtitulo || ''} ${item.isbn || ''}`).includes(normalizar(pesquisa.trim()));
  }), [itens, filtro, pesquisa]);

  return (
    <View style={styles.fundo}>
      <FlatList
        data={filtrados} keyExtractor={item => item.id}
        contentContainerStyle={styles.conteudo}
        refreshing={carregando} onRefresh={recarregar}
        ListHeaderComponent={<View>
          <Text style={styles.sobretitulo}>CATÁLOGO MYLIBRUM</Text>
          <Text style={styles.titulo}>Todos os materiais</Text>
          <Text style={styles.descricao}>Pesquise livros, periódicos e outros materiais do acervo.</Text>
          <View style={styles.busca}>
            <MaterialCommunityIcons name="magnify" color="#ADB8C5" size={23} />
            <TextInput style={styles.input} placeholder="Buscar material..." placeholderTextColor="#8F9CAC" value={pesquisa} onChangeText={setPesquisa} returnKeyType="search" />
            {pesquisa.length > 0 && <TouchableOpacity onPress={() => setPesquisa('')}><MaterialCommunityIcons name="close-circle" color="#AAB4C1" size={19} /></TouchableOpacity>}
            <PesquisaVoz onTexto={setPesquisa} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
            {OPCOES.map(opcao => <TouchableOpacity key={opcao.id} onPress={() => setFiltro(opcao.id)}
              style={[styles.filtro, filtro === opcao.id && styles.filtroAtivo]}>
              <Text style={[styles.filtroTexto, filtro === opcao.id && styles.filtroTextoAtivo]}>{opcao.label}</Text>
            </TouchableOpacity>)}
          </ScrollView>
          {!!aviso && <View style={styles.aviso}><MaterialCommunityIcons name="information-outline" color="#F8CA6E" size={17} /><Text style={styles.avisoTexto}>{aviso}</Text></View>}
          <View style={styles.contagem}><Text style={styles.contagemTexto}>Exibindo {filtrados.length} de {itens.length} materiais</Text>{demo && <Text style={styles.demo}>Demonstração</Text>}</View>
        </View>}
        renderItem={({item}) => <AcervoCard item={item} onAbrir={setSelecionado} />}
        ListEmptyComponent={carregando ? <ActivityIndicator color="#5C9FFF" size="large" /> : <Text style={styles.vazio}>Nenhum material encontrado.</Text>}
      />
      <Modal visible={!!selecionado} transparent animationType="fade" onRequestClose={() => setSelecionado(null)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalTituloRow}>
              <MaterialCommunityIcons name="book-open-page-variant-outline" color="#86BAFF" size={27} />
              <Text style={styles.modalTitulo}>Detalhes do material</Text>
              <TouchableOpacity onPress={() => setSelecionado(null)}><MaterialCommunityIcons name="close" size={24} color="#E5E7EC" /></TouchableOpacity>
            </View>
            <Text style={styles.modalCodigo}>{selecionado?.codigo}</Text>
            <Text style={styles.modalNome}>{selecionado?.titulo}</Text>
            <Text style={styles.modalTexto}>Tipo: {selecionado?.tipo === 'LIVRO' ? 'Livro' : selecionado?.tipo === 'PERIODICO' ? 'Periódico' : 'Outros'}</Text>
            <Text style={styles.modalTexto}>Situação: {selecionado?.disponibilidade === 'DISPONIVEL' ? 'Disponível' : selecionado?.disponibilidade === 'SEM_EXEMPLARES' ? 'Sem informação' : 'Indisponível'}</Text>
            {!!selecionado?.isbn && <Text style={styles.modalTexto}>ISBN: {selecionado.isbn}</Text>}
            {!!selecionado?.anoPublicacao && <Text style={styles.modalTexto}>Ano: {selecionado.anoPublicacao}</Text>}
            {!!selecionado?.sinopse && <Text style={styles.modalTexto}>{selecionado.sinopse}</Text>}
            <TouchableOpacity style={styles.fechar} onPress={() => setSelecionado(null)}><Text style={styles.fecharTexto}>Fechar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#20252A' },
  conteudo: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 30 },
  sobretitulo: { fontSize: 11, color: '#76AFFF', fontWeight: '700', letterSpacing: 1.2 },
  titulo: { color: '#F8FBFF', fontSize: 25, fontWeight: '800', marginTop: 7 },
  descricao: { color: '#A9B4C2', fontSize: 13, lineHeight: 20, marginTop: 6, marginBottom: 20 },
  busca: { backgroundColor: '#292F36', borderWidth: 1, borderColor: '#48515A', borderRadius: 12, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, color: '#fff', paddingVertical: 11, fontSize: 14 },
  filtros: { paddingVertical: 15, gap: 7 },
  filtro: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderColor: '#48515C', borderWidth: 1 },
  filtroAtivo: { backgroundColor: '#176AF3', borderColor: '#176AF3' },
  filtroTexto: { color: '#C4CFDB', fontWeight: '600', fontSize: 12 },
  filtroTextoAtivo: { color: '#fff' },
  contagem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 3 },
  contagemTexto: { fontSize: 12, color: '#ABB9C6' },
  demo: { color: '#D5BC84', fontSize: 11 },
  aviso: { backgroundColor: '#3E3525', borderRadius: 9, padding: 11, marginBottom: 12, flexDirection: 'row', gap: 9, alignItems: 'center' },
  avisoTexto: { color: '#F3D391', flex: 1, fontSize: 12, lineHeight: 16 },
  vazio: { color: '#A9B4C2', textAlign: 'center', paddingVertical: 45 },
  overlay: { flex: 1, backgroundColor: '#000B', justifyContent: 'center', paddingHorizontal: 20 },
  modal: { backgroundColor: '#2A3039', borderRadius: 16, padding: 20 },
  modalTituloRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 18 },
  modalTitulo: { color: '#F8FBFF', fontSize: 18, fontWeight: '700', flex: 1 },
  modalCodigo: { color: '#A4B0BE', marginBottom: 8 },
  modalNome: { fontWeight: '800', fontSize: 22, color: '#fff', marginBottom: 13 },
  modalTexto: { color: '#CFD8E3', fontSize: 14, lineHeight: 22, marginBottom: 4 },
  fechar: { backgroundColor: '#176AF3', borderRadius: 10, alignItems: 'center', padding: 13, marginTop: 20 },
  fecharTexto: { color: '#fff', fontWeight: '700' },
});
