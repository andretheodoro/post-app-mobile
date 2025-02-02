import React, { useEffect } from 'react';
import { Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from './PaginationStyle';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    recordsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, recordsPerPage, onPageChange }) => {
    const keyboardVisible = useSharedValue(0); // 0 = visível, 1 = oculto

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            keyboardVisible.value = withTiming(1, { duration: 100 });
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            keyboardVisible.value = withTiming(0, { duration: 100 });
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: 1 - keyboardVisible.value,
        transform: [{ translateY: keyboardVisible.value * 100 }],
    }));

    return (
        totalPages > 1 && (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
                <Animated.View style={[styles.pagination, animatedStyle]}>
                    <TouchableOpacity
                        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
                        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <Text style={styles.pageButtonText}>Anterior</Text>
                    </TouchableOpacity>

                    <View style={styles.pageInfo}>
                        <Text style={styles.pageText}>Página {currentPage} de {totalPages}</Text>
                        <Text style={styles.recordsInfoText}>{recordsPerPage} registros por página</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
                        onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <Text style={styles.pageButtonText}>Próximo</Text>
                    </TouchableOpacity>
                </Animated.View>

            </KeyboardAvoidingView>
        )
    );
};

export default Pagination;
