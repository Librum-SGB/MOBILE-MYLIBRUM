import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { BottomNavProps } from './types';

export const BottomNav = ({ itens }: BottomNavProps) => {
  const navigation = useNavigation<any>();
  const rotaAtual = useNavigationState(state => state?.routes[state.index]?.name);
  const rotaDestacada = ['Exemplar', 'Autor', 'Editora', 'Genero'].includes(rotaAtual ?? '') ? 'Mais' : rotaAtual;
  return <View style={styles.container}>
    {itens.map(item => {
      const ativo = rotaDestacada === item.rota;
      return <TouchableOpacity key={item.rota} accessibilityLabel={`Abrir ${item.label}`}
        style={[styles.item, ativo && styles.itemAtivo]} onPress={() => navigation.navigate(item.rota)}>
        <MaterialCommunityIcons name={item.icone as any} size={23} color={ativo ? '#79B5FF' : '#A4B1C0'} />
        <Text style={[styles.text, ativo && styles.textAtivo]}>{item.label}</Text>
      </TouchableOpacity>;
    })}
  </View>;
};
