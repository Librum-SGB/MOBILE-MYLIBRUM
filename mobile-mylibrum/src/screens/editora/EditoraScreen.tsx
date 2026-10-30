import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useEditoras } from '../../hooks/useEditoras';
import { EditoraItem } from '../../components/EditoraItem';

export const EditoraScreen = () => {
    const { editoras, loading, addEditora, deleteEditora } = useEditoras();
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');

    const handleSalvar = async () => {
        if (!nome.trim()) return;

        try {
            await addEditora({ nome, nacionalidade: nacionalidade || undefined });
            setNome('');
            setNacionalidade('');
        } catch (error) {
            console.error("Erro ao salvar editora:", error);
        }
    };

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.container}
            data={editoras}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Cadastrar Editora</Text>

                    <Text style={styles.label}>Nome *</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666" />

                    <Text style={styles.label}>Nacionalidade</Text>
                    <TextInput style={styles.input} value={nacionalidade} onChangeText={setNacionalidade} placeholderTextColor="#666" />

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {loading && <Text style={styles.label}>Carregando...</Text>}
                </View>
            }
            renderItem={({ item }) => (
                <EditoraItem
                    id={item.id}
                    nome={item.nome}
                    nacionalidade={item.nacionalidade}
                    onDelete={deleteEditora}
                />
            )}
        />
    );
};
