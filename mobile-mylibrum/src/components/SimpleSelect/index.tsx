import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { SimpleSelectProps } from './types';

export const SimpleSelect = ({ label, options, selectedId, onSelect }: SimpleSelectProps) => {
    const [busca, setBusca] = useState('');

    const labelText = label ?? 'Opções';
    const selecionado = options.find((o) => o.id === selectedId);

    const filtrados = options.filter((o) =>
        o.label.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{labelText}</Text>
            <TextInput
                style={styles.input}
                placeholder={selecionado ? selecionado.label : `Digite para buscar ${labelText.toLowerCase()}...`}
                placeholderTextColor="#666"
                value={busca}
                onChangeText={setBusca}
            />

            {busca.length > 0 && (
                <View style={styles.optionsBox}>
                    <FlatList
                        data={filtrados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.option,
                                    item.id === selectedId && styles.optionSelected,
                                ]}
                                onPress={() => {
                                    onSelect(item.id);
                                    setBusca('');
                                }}
                            >
                                <Text style={styles.optionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};
