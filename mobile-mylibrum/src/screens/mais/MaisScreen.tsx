import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = { onLogout: () => void; biometriaAtivada: boolean; onDesativarBiometria: () => Promise<void> };
const OPCOES = [
  { titulo: 'Cadastrar material', rota: 'Material', icone: 'book-plus-outline' },
  { titulo: 'Exemplares', rota: 'Exemplar', icone: 'bookshelf' },
  { titulo: 'Autores', rota: 'Autor', icone: 'account-edit-outline' },
  { titulo: 'Editoras', rota: 'Editora', icone: 'domain' },
  { titulo: 'Gêneros', rota: 'Genero', icone: 'tag-multiple-outline' },
] as const;
export function MaisScreen({ onLogout, biometriaAtivada, onDesativarBiometria }: Props) {
  const navigation = useNavigation<any>();
  const confirmarLogout = () => Alert.alert('Sair do MyLibrum', 'Deseja encerrar sua sessão?', [
    { text: 'Cancelar', style: 'cancel' }, { text: 'Sair', style: 'destructive', onPress: onLogout },
  ]);
  return <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
    <Text style={styles.titulo}>Administração</Text>
    <Text style={styles.subtitulo}>Acesso às funcionalidades originais do sistema.</Text>
    {OPCOES.map(opcao => <TouchableOpacity key={opcao.rota} style={styles.link} onPress={() => navigation.navigate(opcao.rota)}>
      <MaterialCommunityIcons name={opcao.icone} size={23} color="#81B8FF" />
      <Text style={styles.linkTexto}>{opcao.titulo}</Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color="#B5C0CF" />
    </TouchableOpacity>)}
    <Text style={styles.secundario}>Segurança</Text>
    {biometriaAtivada && <TouchableOpacity style={styles.link} onPress={() =>
      Alert.alert('Desativar biometria', 'Excluir o acesso biométrico salvo neste aparelho?', [
        { text: 'Cancelar', style: 'cancel' }, { text: 'Desativar', onPress: () => { onDesativarBiometria().catch(() => Alert.alert('Erro', 'Não foi possível desativar a biometria.')); } },
      ])}>
      <MaterialCommunityIcons name="fingerprint-off" size={23} color="#F1CA86" />
      <Text style={styles.linkTexto}>Desativar acesso biométrico</Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color="#B5C0CF" />
    </TouchableOpacity>}
    <TouchableOpacity style={styles.sair} onPress={confirmarLogout}>
      <MaterialCommunityIcons name="logout" size={21} color="#fff" /><Text style={styles.sairTexto}>Sair da conta</Text>
    </TouchableOpacity>
  </ScrollView>;
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#20252A' },
  conteudo: { padding: 16, paddingTop: 25, paddingBottom: 40 },
  titulo: { fontSize: 25, fontWeight: '800', color: '#fff' },
  subtitulo: { color: '#A9B7C5', marginTop: 8, marginBottom: 24 },
  link: { backgroundColor: '#2C333B', borderColor: '#3B4550', borderWidth: 1, borderRadius: 11, paddingHorizontal: 15, paddingVertical: 17, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12 },
  linkTexto: { color: '#F0F4F9', fontSize: 15, fontWeight: '600', flex: 1 },
  secundario: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginTop: 26, marginBottom: 13 },
  sair: { backgroundColor: '#A1323B', borderRadius: 11, flexDirection: 'row', gap: 10, justifyContent: 'center', padding: 15, marginTop: 18 },
  sairTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
