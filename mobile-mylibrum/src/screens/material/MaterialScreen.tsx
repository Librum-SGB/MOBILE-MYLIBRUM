import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useMateriais } from '../../hooks/useMateriais';
import { useAutores } from '../../hooks/useAutores';
import { useEditoras } from '../../hooks/useEditoras';
import { useGeneros } from '../../hooks/useGeneros';
import { TipoMaterial } from '../../types/material';
import { MaterialCard } from '../../components/MaterialCard';
import { SimpleSelect } from '../../components/SimpleSelect';

// Observação: quantidade de exemplares, localização na estante, unidade e data de aquisição
// NÃO fazem parte do Material — pertencem à entidade Exemplar (tela separada).

export const MaterialScreen = () => {
    const { materiais, loading, addMaterial, deleteMaterial } = useMateriais();
    const { autores } = useAutores();
    const { editoras } = useEditoras();
    const { generos } = useGeneros();

    const [tipo, setTipo] = useState<TipoMaterial>("LIVRO");

    const [titulo, setTitulo] = useState('');
    const [editoraId, setEditoraId] = useState<number>();

    const [subtitulo, setSubtitulo] = useState('');
    const [autorId, setAutorId] = useState<number>();
    const [generoId, setGeneroId] = useState<number>();
    const [anoPublicacao, setAnoPublicacao] = useState('');
    const [isbn, setIsbn] = useState('');
    const [edicao, setEdicao] = useState('');
    const [quantidadePaginas, setQuantidadePaginas] = useState('');
    const [sinopse, setSinopse] = useState('');

    const [issn, setIssn] = useState('');
    const [tema, setTema] = useState('');
    const [descricao, setDescricao] = useState('');

    // <suavez> imagem mostra um campo "Tipo" livre (Ex: DVD, Mapa, Jogo) além do tipo LIVRO/PERIODICO/OUTROS,
    // mas a entidade Material não tem esse campo separado — confirmar se deve reaproveitar "tema"
    // ou se precisa de um campo novo no backend (ex: subtipoOutros).
    const [observacao, setObservacao] = useState('');

    const limparCampos = () => {
        setTitulo('');
        setEditoraId(undefined);
        setSubtitulo('');
        setAutorId(undefined);
        setGeneroId(undefined);
        setAnoPublicacao('');
        setIsbn('');
        setEdicao('');
        setQuantidadePaginas('');
        setSinopse('');
        setIssn('');
        setTema('');
        setDescricao('');
        setObservacao('');
    };

    const handleSalvar = async () => {
        if (!titulo.trim() || !editoraId) return;

        try {
            await addMaterial({
                titulo,
                tipo,
                editoraId,
                subtitulo: tipo === "LIVRO" ? subtitulo || undefined : undefined,
                autorId: tipo !== "PERIODICO" ? autorId : undefined,
                generoIds: generoId ? [generoId] : undefined,
                anoPublicacao: anoPublicacao ? Number(anoPublicacao) : undefined,
                isbn: tipo === "LIVRO" ? isbn || undefined : undefined,
                edicao: edicao ? Number(edicao) : undefined,
                quantidadePaginas: quantidadePaginas ? Number(quantidadePaginas) : undefined,
                sinopse: tipo === "LIVRO" ? sinopse || undefined : undefined,
                issn: tipo === "PERIODICO" ? issn || undefined : undefined,
                tema: tipo === "PERIODICO" ? tema || undefined : undefined,
                descricao: tipo !== "LIVRO" ? descricao || undefined : undefined,
                observacao: tipo === "OUTROS" ? observacao || undefined : undefined,
            });
            limparCampos();
        } catch (error) {
            console.error("Erro ao salvar material:", error);
        }
    };

    const autoresOptions = autores.map((a) => ({ id: a.id, label: a.nome }));
    const editorasOptions = editoras.map((e) => ({ id: e.id, label: e.nome }));
    const generosOptions = generos.map((g) => ({ id: g.id, label: g.nome }));

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.container}
            data={materiais}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Cadastrar Material no Acervo</Text>

                    <Text style={styles.label}>Tipo de Material</Text>
                    <View style={styles.tipoRow}>
                        {(["LIVRO", "PERIODICO", "OUTROS"] as TipoMaterial[]).map((opcao) => (
                            <TouchableOpacity
                                key={opcao}
                                style={[styles.tipoButton, tipo === opcao && styles.tipoButtonSelected]}
                                onPress={() => setTipo(opcao)}
                            >
                                <Text style={[styles.tipoButtonText, tipo === opcao && styles.tipoButtonTextSelected]}>
                                    {opcao === "LIVRO" ? "Livro" : opcao === "PERIODICO" ? "Periódico" : "Outros Materiais"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Título *</Text>
                    <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholderTextColor="#666" />

                    {tipo === "LIVRO" && (
                        <>
                            <Text style={styles.label}>Subtítulo</Text>
                            <TextInput style={styles.input} value={subtitulo} onChangeText={setSubtitulo} placeholderTextColor="#666" />

                            <SimpleSelect label="Autor" options={autoresOptions} selectedId={autorId} onSelect={setAutorId} />
                        </>
                    )}

                    <SimpleSelect label="Editora *" options={editorasOptions} selectedId={editoraId} onSelect={setEditoraId} />

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Ano de Publicação *</Text>
                            <TextInput
                                style={styles.input}
                                value={anoPublicacao}
                                onChangeText={setAnoPublicacao}
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                            />
                        </View>

                        {tipo === "LIVRO" && (
                            <View style={styles.half}>
                                <Text style={styles.label}>ISBN *</Text>
                                <TextInput style={styles.input} value={isbn} onChangeText={setIsbn} keyboardType="numeric" placeholderTextColor="#666" />
                            </View>
                        )}

                        {tipo === "PERIODICO" && (
                            <View style={styles.half}>
                                <Text style={styles.label}>ISSN *</Text>
                                <TextInput style={styles.input} value={issn} onChangeText={setIssn} placeholderTextColor="#666" />
                            </View>
                        )}
                    </View>

                    {(tipo === "LIVRO" || tipo === "PERIODICO") && (
                        <>
                            <Text style={styles.label}>{tipo === "LIVRO" ? "Edição" : "Edição/Número *"}</Text>
                            <TextInput
                                style={styles.input}
                                value={edicao}
                                onChangeText={setEdicao}
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                            />
                        </>
                    )}

                    {tipo === "LIVRO" && (
                        <>
                            <SimpleSelect label="Gênero" options={generosOptions} selectedId={generoId} onSelect={setGeneroId} />

                            <Text style={styles.label}>Quantidade de Páginas</Text>
                            <TextInput
                                style={styles.input}
                                value={quantidadePaginas}
                                onChangeText={setQuantidadePaginas}
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                            />

                            <Text style={styles.label}>Sinopse</Text>
                            <TextInput style={styles.textArea} value={sinopse} onChangeText={setSinopse} multiline placeholderTextColor="#666" />
                        </>
                    )}

                    {tipo === "PERIODICO" && (
                        <>
                            <Text style={styles.label}>Tema</Text>
                            <TextInput style={styles.input} value={tema} onChangeText={setTema} placeholderTextColor="#666" />

                            <Text style={styles.label}>Descrição</Text>
                            <TextInput style={styles.textArea} value={descricao} onChangeText={setDescricao} multiline placeholderTextColor="#666" />
                        </>
                    )}

                    {tipo === "OUTROS" && (
                        <>
                            <SimpleSelect label="Autor" options={autoresOptions} selectedId={autorId} onSelect={setAutorId} />

                            <Text style={styles.label}>Descrição</Text>
                            <TextInput style={styles.textArea} value={descricao} onChangeText={setDescricao} multiline placeholderTextColor="#666" />

                            <Text style={styles.label}>Observação</Text>
                            <TextInput style={styles.textArea} value={observacao} onChangeText={setObservacao} multiline placeholderTextColor="#666" />
                        </>
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {loading && <Text style={styles.label}>Carregando...</Text>}
                </View>
            }
            renderItem={({ item }) => (
                <MaterialCard id={item.id} titulo={item.titulo} tipo={item.tipo} onDelete={deleteMaterial} />
            )}
        />
    );
};
