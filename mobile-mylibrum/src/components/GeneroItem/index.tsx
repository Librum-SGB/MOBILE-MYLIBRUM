import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { GeneroItemProps } from './types';

export const GeneroItem = ({ id, nome, onDelete }: GeneroItemProps) => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{nome}</Text>
            <Button title="Excluir" color="#e74c3c" onPress={() => onDelete(id)} />
        </View>
    );
};
