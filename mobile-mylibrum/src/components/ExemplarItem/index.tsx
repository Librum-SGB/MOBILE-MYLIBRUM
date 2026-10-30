import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { ExemplarItemProps } from './types';

export const ExemplarItem = ({ id, codigoBarras, status, onDelete }: ExemplarItemProps) => {
    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Text style={styles.text}>{codigoBarras}</Text>
                <Text style={styles.subtext}>{status}</Text>
            </View>
            <Button title="Excluir" color="#e74c3c" onPress={() => onDelete(id)} />
        </View>
    );
};
