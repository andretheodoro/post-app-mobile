import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 999,
    },
    icon: {
        marginRight: 8,
    },
    message: {
        fontSize: 16,
        fontWeight: '500',
        padding: 8,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default styles;
