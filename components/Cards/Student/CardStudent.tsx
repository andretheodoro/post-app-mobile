import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useStudent, { IStudent } from '@/src/model/Student';
import styles from '../CardStyle';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';
import cardStudentStyle from './CardStudentStyle';
import Notification, { INotification } from '@/components/Notification/Notification';

interface CardStudentProps {
    item: IStudent;
    handleLoadStudents: () => void;
}
const CardStudent = ({ item, handleLoadStudents }: CardStudentProps) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState<INotification | null>(null);

    // Chama o hook useStudentController diretamente aqui
    const { deletarStudent } = useStudent();

    const handleEditStudent = () => {
        const _student = item as IStudent;
        navigation.navigate('CreateStudent', { _student });
    };

    // Passando deletarStudent como callback
    const deleteRecordFromApi = async (idStudent: number) => {
        console.log('Chamada API de exclusão', idStudent);
        var response = await deletarStudent(idStudent);
        if (response && response.status === 200) {
            console.log('Chamada API de exclusão', response);
            setNotification({
                type: 'success',
                message: 'Aluno excluído com sucesso.',
                onClose: () => {
                    // if (navigation.canGoBack())
                    //     navigation.goBack();
                    // navigation.dispatch(DrawerActions.closeDrawer());

                    navigation.navigate('ListStudent', { refresh: true }); // validar
                    setNotification(null)
                    handleLoadStudents();
                },
            });
        } else {
            setNotification({
                type: 'error',
                message: 'Erro ao excluir o Aluno. Tente novamente.',
                onClose: () => setNotification(null),
            });
        }

        // console.log('Registro excluído com sucesso');
    };

    const handleCancel = () => {
        setModalVisible(false);  // Fecha o modal
    };

    const handleConfirm = () => {
        setModalVisible(false);
        // Alert.alert('Registro excluído com sucesso!');  // Mensagem de confirmação
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
                    <Text style={cardStudentStyle.name}>{item.name}</Text>
                    <Text style={cardStudentStyle.fone}>{item.contact}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditStudent}>
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
                    onCallback={() => deleteRecordFromApi(item.id)} // Passando a função aqui
                />
            </View>
        </View>
    );
};

export default CardStudent;
