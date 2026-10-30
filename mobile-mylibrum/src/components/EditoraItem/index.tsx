import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { EditoraItemProps } from './types';

export const EditoraItem = ({ id, nome, nacionalidade, onDelete }: EditoraItemProps) => {
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
