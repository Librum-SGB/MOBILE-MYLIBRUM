import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 28, backgroundColor: '#171C23' },
  logo: { alignSelf: 'center', width: 78, height: 78, backgroundColor: '#1466EF', borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  title: { fontSize: 31, fontWeight: '800', color: '#F5F7FA', textAlign: 'center' },
  subtitle: { color: '#A6B0BD', fontSize: 14, textAlign: 'center', marginBottom: 35, marginTop: 4 },
  label: { color: '#D7DFEA', marginBottom: 7, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#49515B', backgroundColor: '#242A32', borderRadius: 10, padding: 13, marginBottom: 18, color: '#fff' },
  button: { backgroundColor: '#156CF6', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  erro: { color: '#FF8B95', marginBottom: 16, textAlign: 'center' },
  biometria: { marginTop: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  biometriaText: { color: '#83BFFF', fontWeight: '700' },
  rodape: { color: '#8A94A3', textAlign: 'center', fontSize: 12, marginTop: 30 },
});
