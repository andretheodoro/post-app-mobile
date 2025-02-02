import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    textarea: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textAlignVertical: 'top',
        height: 240,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 4,
    },
    btn: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    iconButton: {
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default styles;