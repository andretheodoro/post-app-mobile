import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './ModalConfirmDelStyle';


const ModalConfirmDel = ({ isVisible, onCancel, onConfirm, onCallback }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (onCallback) {
            setIsLoading(true);

            try {
                await onCallback();  // Chama a função que faz a chamada API
                onConfirm();
            } catch (error) {
                console.error('Erro na chamada API:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Tem certeza que deseja excluir este registro?</Text>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
                    ) : (
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default ModalConfirmDel;