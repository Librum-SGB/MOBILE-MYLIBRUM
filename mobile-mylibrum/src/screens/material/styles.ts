import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 16,
    },
    tipoRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
    },
    tipoButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        paddingVertical: 14,
        alignItems: "center",
    },
    tipoButtonSelected: {
        backgroundColor: "#2e86de",
        borderColor: "#2e86de",
    },
    tipoButtonText: {
        color: "#ccc",
    },
    tipoButtonTextSelected: {
        color: "#fff",
        fontWeight: "bold",
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
        marginBottom: 12,
        color: "#fff",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        color: "#fff",
        minHeight: 80,
        textAlignVertical: "top",
    },
    row: {
        flexDirection: "row",
        gap: 10,
    },
    half: {
        flex: 1,
    },
    button: {
        backgroundColor: "#2ecc71",
        padding: 14,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
