import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { MaterialCardProps } from './types';

export const MaterialCard = ({ id, titulo, tipo, onDelete }: MaterialCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.tipo}>{tipo}</Text>
            <Button title="Excluir" color="#e74c3c" onPress={() => onDelete(id)} />
        </View>
    );
};
