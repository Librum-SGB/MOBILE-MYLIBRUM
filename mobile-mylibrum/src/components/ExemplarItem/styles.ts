import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingBottom: 8,
    },
    info: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: "#fff",
    },
    subtext: {
        fontSize: 12,
        color: "#999",
    },
});
