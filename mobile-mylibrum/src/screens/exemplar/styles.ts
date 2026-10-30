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
    statusRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
    },
    statusButton: {
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    statusButtonSelected: {
        backgroundColor: "#2e86de",
        borderColor: "#2e86de",
    },
    statusButtonText: {
        color: "#ccc",
        fontSize: 12,
    },
    statusButtonTextSelected: {
        color: "#fff",
        fontWeight: "bold",
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
