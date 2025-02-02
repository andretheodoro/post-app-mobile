
import { StyleSheet } from 'react-native';

const cardStyle = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 5,
        width: 40,
        height: 40,
    },
    editButton: {
        backgroundColor: '#28a745',
        borderColor: '#17a137',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        borderColor: '#cc1527',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default cardStyle;
