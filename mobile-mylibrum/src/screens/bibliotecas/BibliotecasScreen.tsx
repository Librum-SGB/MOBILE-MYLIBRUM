import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BIBLIOTECAS, Biblioteca } from '../../data/bibliotecas';

export function BibliotecasScreen() {
  const mapRef = useRef<MapView>(null);
  const [selecionada, setSelecionada] = useState('itajai');
  const [temPermissao, setTemPermissao] = useState(false);
  const focar = (biblioteca: Biblioteca) => {
    setSelecionada(biblioteca.id);
    mapRef.current?.animateToRegion({
      latitude: biblioteca.latitude, longitude: biblioteca.longitude,
      latitudeDelta: 0.035, longitudeDelta: 0.035,
    }, 550);
  };
  const minhaLocalizacao = async () => {
    try {
      const permissao = await Location.requestForegroundPermissionsAsync();
      if (permissao.status !== 'granted') {
        Alert.alert('Localização', 'Permita o acesso à localização para visualizar sua posição.');
        return;
      }
      const local = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setTemPermissao(true);
      mapRef.current?.animateToRegion({
        latitude: local.coords.latitude, longitude: local.coords.longitude,
        latitudeDelta: 0.13, longitudeDelta: 0.13,
      }, 600);
    } catch {
      Alert.alert('Localização', 'Não foi possível localizar o aparelho.');
    }
  };
  const abrirRota = async (biblioteca: Biblioteca) => {
    const endereco = encodeURIComponent(biblioteca.endereco);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${endereco}`;
    try { await Linking.openURL(url); }
    catch { Alert.alert('Mapa', 'Não foi possível abrir a navegação externa.'); }
  };

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <Text style={styles.kicker}>REDE DE BIBLIOTECAS</Text>
      <Text style={styles.titulo}>Encontre seu SENAI</Text>
      <Text style={styles.texto}>Explore as bibliotecas da rede SENAI/SC, veja os endereços e abra a rota até a unidade.</Text>
      <View style={styles.mapaContainer}>
        <MapView ref={mapRef} style={StyleSheet.absoluteFillObject}
          initialRegion={{ latitude: -26.99, longitude: -48.82, latitudeDelta: 0.57, longitudeDelta: 0.73 }}
          showsUserLocation={temPermissao} showsCompass>
          {BIBLIOTECAS.map(b => <Marker key={b.id} coordinate={{ latitude: b.latitude, longitude: b.longitude }}
            title={b.nome} description={b.endereco} pinColor={selecionada === b.id ? '#176AF3' : '#D66A50'}
            onPress={() => setSelecionada(b.id)} />)}
        </MapView>
        <TouchableOpacity style={styles.localizacao} onPress={minhaLocalizacao} accessibilityLabel="Ver minha localização">
          <MaterialCommunityIcons name="crosshairs-gps" size={23} color="#176AF3" />
        </TouchableOpacity>
      </View>
      <Text style={styles.ajuda}>Toque em um marcador ou escolha uma biblioteca abaixo. Coordenadas de referência; use “Traçar rota” para o endereço oficial.</Text>
      <Text style={styles.subtitulo}>{BIBLIOTECAS.length} bibliotecas na região</Text>
      {BIBLIOTECAS.map(b => (
        <TouchableOpacity key={b.id} activeOpacity={0.85} onPress={() => focar(b)}
          style={[styles.card, selecionada === b.id && styles.cardAtivo]}>
          <View style={styles.cabecalho}>
            <View style={styles.icone}><MaterialCommunityIcons name="map-marker-radius" color="#74ADFF" size={23} /></View>
            <View style={{ flex: 1 }}><Text style={styles.cardTitulo}>{b.nome}</Text><Text style={styles.cidade}>{b.cidade} · SC</Text></View>
          </View>
          <Text style={styles.detalhe}><MaterialCommunityIcons name="map-marker-outline" size={16} /> {b.endereco}</Text>
          <Text style={styles.detalhe}><MaterialCommunityIcons name="clock-outline" size={16} /> {b.horario}</Text>
          <Text style={styles.detalhe}><MaterialCommunityIcons name="phone-outline" size={16} /> {b.telefone}</Text>
          <TouchableOpacity style={styles.botao} onPress={() => abrirRota(b)}>
            <MaterialCommunityIcons name="directions" size={19} color="#fff" />
            <Text style={styles.botaoTexto}>Traçar rota</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <Text style={styles.fonte}>Fonte de endereços e contatos: Rede de Bibliotecas SENAI/SC.</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  pagina: { flex: 1, backgroundColor: '#20252A' },
  conteudo: { padding: 16, paddingTop: 24, paddingBottom: 40 },
  kicker: { color: '#7FB7FF', fontWeight: '700', fontSize: 11, letterSpacing: 1.1 },
  titulo: { fontSize: 25, fontWeight: '800', color: '#F7F9FE', marginTop: 7 },
  texto: { color: '#ADBBC8', marginTop: 7, fontSize: 13, lineHeight: 20, marginBottom: 17 },
  mapaContainer: { height: 275, borderRadius: 16, overflow: 'hidden', backgroundColor: '#353F4B' },
  localizacao: { position: 'absolute', right: 14, top: 14, backgroundColor: '#fff', borderRadius: 9, padding: 11, elevation: 5 },
  ajuda: { color: '#96A2AF', fontSize: 11, lineHeight: 17, marginTop: 10 },
  subtitulo: { color: '#F3F7FD', fontSize: 18, fontWeight: '700', marginTop: 22, marginBottom: 12 },
  card: { borderWidth: 1, borderColor: '#3D4752', backgroundColor: '#2B323B', borderRadius: 15, padding: 15, marginBottom: 12 },
  cardAtivo: { borderColor: '#327DFA' },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  icone: { width: 43, height: 43, borderRadius: 12, backgroundColor: '#193454', alignItems: 'center', justifyContent: 'center' },
  cardTitulo: { color: '#F6F8FB', fontSize: 15, fontWeight: '700' },
  cidade: { color: '#92A9BF', marginTop: 4, fontSize: 12 },
  detalhe: { color: '#B9C6D2', fontSize: 12, lineHeight: 18, marginBottom: 5 },
  botao: { backgroundColor: '#176AF3', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 11, borderRadius: 8, marginTop: 12 },
  botaoTexto: { color: '#fff', fontWeight: '700' },
  fonte: { color: '#8895A3', fontSize: 11, marginTop: 7, textAlign: 'center' },
});
