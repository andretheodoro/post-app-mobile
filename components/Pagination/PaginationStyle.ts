import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    pageInfo: {
        alignContent: 'center',
        alignItems: 'center',
    },
    pageButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: '#007bff',
        borderRadius: 8,
        marginHorizontal: 10,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    pageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 15,
    },
    recordsInfoText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default styles;
