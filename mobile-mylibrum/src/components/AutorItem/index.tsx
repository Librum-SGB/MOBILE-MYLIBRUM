import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { AutorItemProps } from './types';

export const AutorItem = ({ id, nome, nacionalidade, onDelete }: AutorItemProps) => {
    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Text style={styles.text}>{nome}</Text>
                {nacionalidade ? <Text style={styles.subtext}>{nacionalidade}</Text> : null}
            </View>
            <Button title="Excluir" color="#e74c3c" onPress={() => onDelete(id)} />
        </View>
    );
};
