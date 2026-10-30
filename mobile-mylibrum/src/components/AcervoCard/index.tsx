import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ItemAcervo } from '../../data/materiaisDemo';

const TIPO = { LIVRO: 'Livro', PERIODICO: 'Periódico', OUTROS: 'Outros' };

export function AcervoCard({ item, onAbrir }: { item: ItemAcervo; onAbrir: (item: ItemAcervo) => void }) {
  const disponivel = item.disponibilidade === 'DISPONIVEL';
  const semExemplares = item.disponibilidade === 'SEM_EXEMPLARES';
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.icone}><MaterialCommunityIcons name={item.tipo === 'PERIODICO' ? 'newspaper-variant-outline' : 'book-outline'} color="#81B4FF" size={21} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.codigo}>{item.codigo}</Text>
          <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        </View>
      </View>
      <View style={styles.tags}>
        <View style={[styles.pill, { backgroundColor: item.tipo === 'PERIODICO' ? '#403300' : '#092853' }]}>
          <Text style={[styles.pillText, { color: item.tipo === 'PERIODICO' ? '#FFCA2B' : '#67A6FF' }]}>{TIPO[item.tipo]}</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: disponivel ? '#053C2A' : semExemplares ? '#3C3440' : '#481A23' }]}>
          <View style={[styles.dot, { backgroundColor: disponivel ? '#37D995' : semExemplares ? '#BBAABF' : '#FF5B68' }]} />
          <Text style={[styles.pillText, { color: disponivel ? '#54E2A1' : semExemplares ? '#D1C4D5' : '#FF8791' }]}>
            {disponivel ? 'Disponível' : semExemplares ? 'Sem status' : 'Indisponível'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => onAbrir(item)}>
        <Text style={styles.botaoTexto}>Mais informações</Text>
        <MaterialCommunityIcons name="chevron-right" color="#fff" size={19} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#2B3139', borderRadius: 16, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#343C45' },
  topo: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 62 },
  icone: { width: 42, height: 42, borderRadius: 11, justifyContent: 'center', alignItems: 'center', backgroundColor: '#182D47' },
  codigo: { fontSize: 12, color: '#ACB8CA' },
  titulo: { fontSize: 16, fontWeight: '700', color: '#F8FAFF', marginTop: 3 },
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginVertical: 12 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 9, borderRadius: 20, gap: 5 },
  pillText: { fontSize: 11, fontWeight: '700' },
  dot: { width: 7, height: 7, borderRadius: 4 },
  botao: { backgroundColor: '#176FF5', borderRadius: 9, paddingVertical: 11, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5 },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
