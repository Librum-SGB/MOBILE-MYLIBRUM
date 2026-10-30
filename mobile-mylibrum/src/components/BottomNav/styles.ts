import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#39424C', backgroundColor: '#1A2026', paddingBottom: 5 },
  item: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', gap: 4 },
  itemAtivo: { borderTopWidth: 2, borderTopColor: '#2F8BFF' },
  text: { color: '#A2ADBA', fontSize: 11, fontWeight: '600' },
  textAtivo: { color: '#7DB8FF', fontWeight: '800' },
});
