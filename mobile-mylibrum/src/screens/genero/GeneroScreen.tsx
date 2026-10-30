import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useGeneros } from '../../hooks/useGeneros';
import { GeneroItem } from '../../components/GeneroItem';

export const GeneroScreen = () => {
    const { generos, loading, addGenero, deleteGenero } = useGeneros();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSalvar = async () => {
        if (!nome.trim()) return;

        try {
            await addGenero({ nome, descricao: descricao || undefined });
            setNome('');
            setDescricao('');
        } catch (error) {
            console.error("Erro ao salvar gênero:", error);
        }
    };

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.container}
            data={generos}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Cadastrar Gênero</Text>

                    <Text style={styles.label}>Nome *</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666" />

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholderTextColor="#666" />

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {loading && <Text style={styles.label}>Carregando...</Text>}
                </View>
            }
            renderItem={({ item }) => (
                <GeneroItem id={item.id} nome={item.nome} onDelete={deleteGenero} />
            )}
        />
    );
};
