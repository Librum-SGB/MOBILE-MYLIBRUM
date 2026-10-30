import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useExemplares } from '../../hooks/useExemplares';
import { useMateriais } from '../../hooks/useMateriais';
import { useFiliais } from '../../hooks/useFiliais';
import { useEstantes } from '../../hooks/useEstantes';
import { StatusExemplar } from '../../types/exemplar';
import { SimpleSelect } from '../../components/SimpleSelect';
import { ExemplarItem } from '../../components/ExemplarItem';

const STATUS_OPCOES: StatusExemplar[] = ["DISPONIVEL", "EMPRESTADO", "RESERVADO", "MANUTENCAO", "EXTRAVIADO"];

export const ExemplarScreen = () => {
    const { exemplares, loading, addExemplar, deleteExemplar } = useExemplares();
    const { materiais } = useMateriais();
    const { filiais } = useFiliais();
    const { estantes } = useEstantes();

    const [materialId, setMaterialId] = useState<number>();
    const [filialId, setFilialId] = useState<number>();
    const [estanteId, setEstanteId] = useState<number>();
    const [codigoBarras, setCodigoBarras] = useState('');
    const [prateleira, setPrateleira] = useState('');
    const [posicao, setPosicao] = useState('');
    const [status, setStatus] = useState<StatusExemplar>("DISPONIVEL");
    const [dataAquisicao, setDataAquisicao] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const handleSalvar = async () => {
        if (!materialId || !filialId || !estanteId || !codigoBarras.trim()) return;

        try {
            await addExemplar({
                materialId,
                filialId,
                estanteId,
                codigoBarras,
                prateleira: prateleira || undefined,
                posicao: posicao || undefined,
                status,
                dataAquisicao: dataAquisicao || undefined,
                observacoes: observacoes || undefined,
            });
            setMaterialId(undefined);
            setFilialId(undefined);
            setEstanteId(undefined);
            setCodigoBarras('');
            setPrateleira('');
            setPosicao('');
            setStatus("DISPONIVEL");
            setDataAquisicao('');
            setObservacoes('');
        } catch (error) {
            console.error("Erro ao salvar exemplar:", error);
        }
    };

    const materiaisOptions = materiais.map((m) => ({ id: m.id, label: m.titulo }));
    const filiaisOptions = filiais.map((f) => ({ id: f.id, label: f.nomeFantasia }));
    const estantesOptions = estantes.map((e) => ({ id: e.id, label: e.localizacao }));

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.container}
            data={exemplares}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Cadastrar Exemplar</Text>

                    <SimpleSelect label="Material *" options={materiaisOptions} selectedId={materialId} onSelect={setMaterialId} />
                    <SimpleSelect label="Filial *" options={filiaisOptions} selectedId={filialId} onSelect={setFilialId} />
                    <SimpleSelect label="Estante *" options={estantesOptions} selectedId={estanteId} onSelect={setEstanteId} />

                    <Text style={styles.label}>Código de Barras *</Text>
                    <TextInput style={styles.input} value={codigoBarras} onChangeText={setCodigoBarras} placeholderTextColor="#666" />

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Prateleira</Text>
                            <TextInput style={styles.input} value={prateleira} onChangeText={setPrateleira} placeholderTextColor="#666" />
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.label}>Posição</Text>
                            <TextInput style={styles.input} value={posicao} onChangeText={setPosicao} placeholderTextColor="#666" />
                        </View>
                    </View>

                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusRow}>
                        {STATUS_OPCOES.map((opcao) => (
                            <TouchableOpacity
                                key={opcao}
                                style={[styles.statusButton, status === opcao && styles.statusButtonSelected]}
                                onPress={() => setStatus(opcao)}
                            >
                                <Text style={[styles.statusButtonText, status === opcao && styles.statusButtonTextSelected]}>
                                    {opcao}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Data de Aquisição</Text>
                    <TextInput
                        style={styles.input}
                        value={dataAquisicao}
                        onChangeText={setDataAquisicao}
                        placeholder="AAAA-MM-DD"
                        placeholderTextColor="#666"
                    />

                    <Text style={styles.label}>Observações</Text>
                    <TextInput style={styles.textArea} value={observacoes} onChangeText={setObservacoes} multiline placeholderTextColor="#666" />

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    {loading && <Text style={styles.label}>Carregando...</Text>}
                </View>
            }
            renderItem={({ item }) => (
                <ExemplarItem
                    id={item.id}
                    codigoBarras={item.codigoBarras}
                    status={item.status}
                    onDelete={deleteExemplar}
                />
            )}
        />
    );
};
