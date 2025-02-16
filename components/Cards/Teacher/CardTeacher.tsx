import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../CardStyle';
import stylesTeacher from './CardTeacherStyle';
import useTeacher, { ITeacher } from '@/src/model/Teacher';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';
import Notification, { INotification } from '@/components/Notification/Notification';
import cardTeacherStyle from './CardTeacherStyle';

interface CardTeacherProps {
    item: ITeacher;
    handleLoadTeachers: () => void;
}

const CardTeacher = ({ item, handleLoadTeachers }: CardTeacherProps) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState<INotification | null>(null);
    const { deletarTeacher } = useTeacher();

    const handleEditTeacher = () => {
        const _teacher = item as ITeacher;
        navigation.navigate('CreateTeacher', { _teacher });
    };

    const deleteRecordFromApi = async (idTeacher: number) => {
        var response = await deletarTeacher(idTeacher);
        // console.log('response', response);
        if (response && response.status === 200) {
            // console.log('Ok', response);
            setNotification({
                type: 'success',
                message: 'Professor excluído com sucesso.',
                onClose: () => {
                    navigation.navigate('ListTeacher', { refresh: true });
                    setNotification(null)
                    handleLoadTeachers();
                },
            });
        } else {
            if (response && response.response.data?.message) {
                setNotification({
                    type: 'error',
                    message: `Erro ao excluir o Professor. Tente novamente.\n${response.response.data?.message}`,
                    onClose: () => setNotification(null),
                });
            } else {
                setNotification({
                    type: 'error',
                    message: 'Erro ao excluir o Professor. Tente novamente.',
                    onClose: () => setNotification(null),
                });
            }


        }
    };

    const handleCancel = () => {
        setModalVisible(false);  // Fecha o modal
    };

    const handleConfirm = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.card}>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    duration={8000}
                    onClose={notification.onClose}
                />
            )}
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={cardTeacherStyle.name}>{item.name}</Text>
                    <Text style={cardTeacherStyle.fone}>{item.contact}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditTeacher}>
                        <Text style={styles.buttonText}><FontAwesome5 name="edit" size={24} color="white" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}><FontAwesome5 name="trash" size={24} color="white" /></Text>
                    </TouchableOpacity>
                </View>

                <ConfirmDeleteModal
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    onCallback={() => deleteRecordFromApi(item.id)}
                />
            </View>
        </View>
    );
};
export default CardTeacher;
