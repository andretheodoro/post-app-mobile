import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    descriptionContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});

export default styles;
