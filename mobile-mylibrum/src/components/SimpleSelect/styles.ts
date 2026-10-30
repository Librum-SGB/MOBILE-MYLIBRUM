import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        color: "#ccc",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        padding: 10,
        color: "#fff",
    },
    optionsBox: {
        borderWidth: 1,
        borderColor: "#444",
        borderTopWidth: 0,
        maxHeight: 140,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    optionSelected: {
        backgroundColor: "#2e86de",
    },
    optionText: {
        color: "#fff",
    },
});
