import { View, Alert, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from './src/hooks/useAuth';
import { LoginScreen } from './src/screens/login/LoginScreen';
import { GeneroScreen } from './src/screens/genero/GeneroScreen';
import { AutorScreen } from './src/screens/autor/AutorScreen';
import { EditoraScreen } from './src/screens/editora/EditoraScreen';
import { MaterialScreen } from './src/screens/material/MaterialScreen';
import { ExemplarScreen } from './src/screens/exemplar/ExemplarScreen';
import { AcervoScreen } from './src/screens/acervo/AcervoScreen';
import { BibliotecasScreen } from './src/screens/bibliotecas/BibliotecasScreen';
import { MaisScreen } from './src/screens/mais/MaisScreen';
import { BottomNav } from './src/components/BottomNav';

const Stack = createNativeStackNavigator();
const ITENS_NAV = [
  { label: 'Acervo', rota: 'Acervo', icone: 'bookshelf' },
  { label: 'Mapa', rota: 'Bibliotecas', icone: 'map-marker-radius-outline' },
  { label: 'Cadastro', rota: 'Material', icone: 'plus-box-outline' },
  { label: 'Mais', rota: 'Mais', icone: 'dots-horizontal-circle-outline' },
];

export default function App() {
  const { loggedIn, login, loginComDigital, logout, desativarDigital, biometriaAtivada, carregando, erro } = useAuth();
  const confirmarLogout = () => Alert.alert('Sair do MyLibrum', 'Deseja encerrar sua sessão?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Sair', style: 'destructive', onPress: logout },
  ]);

  if (!loggedIn) {
    return <LoginScreen onLogin={(email, senha) => login({ email, senha })}
      onBiometria={loginComDigital} biometriaAtivada={biometriaAtivada} carregando={carregando} erro={erro} />;
  }

  const logoutHeader = () => <TouchableOpacity onPress={confirmarLogout} accessibilityLabel="Sair do MyLibrum"
    style={{ paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
    <MaterialCommunityIcons name="logout" color="#F1F4F9" size={21} />
    <Text style={{ color: '#F1F4F9', fontSize: 12 }}>Sair</Text>
  </TouchableOpacity>;

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Acervo" screenOptions={{
          headerStyle: { backgroundColor: '#1A2026' },
          headerTintColor: '#fff', headerTitleStyle: { fontWeight: '700' },
          headerRight: logoutHeader,
          contentStyle: { backgroundColor: '#20252A' },
        }}>
          <Stack.Screen name="Acervo" component={AcervoScreen} options={{ title: 'MyLibrum · Acervo' }} />
          <Stack.Screen name="Bibliotecas" component={BibliotecasScreen} options={{ title: 'Bibliotecas SENAI' }} />
          <Stack.Screen name="Material" component={MaterialScreen} options={{ title: 'Cadastro de material' }} />
          <Stack.Screen name="Mais" options={{ title: 'Mais opções' }}>
            {() => <MaisScreen onLogout={logout} biometriaAtivada={biometriaAtivada} onDesativarBiometria={desativarDigital} />}
          </Stack.Screen>
          <Stack.Screen name="Exemplar" component={ExemplarScreen} options={{ title: 'Exemplares' }} />
          <Stack.Screen name="Autor" component={AutorScreen} options={{ title: 'Autores' }} />
          <Stack.Screen name="Editora" component={EditoraScreen} options={{ title: 'Editoras' }} />
          <Stack.Screen name="Genero" component={GeneroScreen} options={{ title: 'Gêneros' }} />
        </Stack.Navigator>
        <BottomNav itens={ITENS_NAV} />
      </View>
    </NavigationContainer>
  );
}
