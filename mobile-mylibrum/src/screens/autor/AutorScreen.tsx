import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useAutores } from '../../hooks/useAutores';
import { AutorItem } from '../../components/AutorItem';

export const AutorScreen = () => {
    const { autores, loading, addAutor, deleteAutor } = useAutores();
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataFalecimento, setDataFalecimento] = useState('');
    const [biografia, setBiografia] = useState('');

    const handleSalvar = async () => {
        if (!nome.trim()) return;

        try {
            await addAutor({
                nome,
                nacionalidade: nacionalidade || undefined,
                dataNascimento: dataNascimento || undefined,
                dataFalecimento: dataFalecimento || undefined,
                biografia: biografia || undefined,
            });
            setNome('');
            setNacionalidade('');
            setDataNascimento('');
            setDataFalecimento('');
            setBiografia('');
        } catch (error) {
            console.error("Erro ao salvar autor:", error);
        }
    };

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.container}
            data={autores}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Cadastrar Autor</Text>

                    <Text style={styles.label}>Nome *</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666" />

                    <Text style={styles.label}>Nacionalidade</Text>
                    <TextInput style={styles.input} value={nacionalidade} onChangeText={setNacionalidade} placeholderTextColor="#666" />

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Data de Nascimento</Text>
                            <TextInput
                                style={styles.input}
                                value={dataNascimento}
                                onChangeText={setDataNascimento}
                                placeholder="AAAA-MM-DD"
                                placeholderTextColor="#666"
                            />
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.label}>Data de Falecimento</Text>
                            <TextInput
                                style={styles.input}
                                value={dataFalecimento}
                                onChangeText={setDataFalecimento}
                                placeholder="AAAA-MM-DD"
                                placeholderTextColor="#666"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Biografia</Text>
                    <TextInput
                        style={styles.textArea}
                        value={biografia}
                        onChangeText={setBiografia}
                        multiline
                        placeholderTextColor="#666"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {loading && <Text style={styles.label}>Carregando...</Text>}
                </View>
            }
            renderItem={({ item }) => (
                <AutorItem
                    id={item.id}
                    nome={item.nome}
                    nacionalidade={item.nacionalidade}
                    onDelete={deleteAutor}
                />
            )}
        />
    );
};
