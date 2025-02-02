import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../CardStyle';
import stylesTeacher from './CardTeacherStyle';
import { ITeacher } from '@/src/model/Teacher';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';

const CardTeacher = (item: ITeacher) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleEditPost = () => {
        const _teacher = item as ITeacher;
        navigation.navigate('CreateTeacher', { _teacher });
    };

    // Passando deletarPost como callback
    const deleteRecordFromApi = async (idPost: number) => {
        console.log('Chamada API de exclusão');
        // Simulando uma chamada API com um atraso de 2 segundos
        await new Promise(resolve => {
            // deletarPost(idPost); // Aqui é onde a exclusão é chamada
            setTimeout(resolve, 2000);
            // listarPosts();
        });
        console.log('Registro excluído com sucesso');
    };

    const handleCancel = () => {
        setModalVisible(false);  // Fecha o modal
    };

    const handleConfirm = () => {
        setModalVisible(false);
        Alert.alert('Registro excluído com sucesso!');  // Mensagem de confirmação
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={stylesTeacher.name}>{item.name}</Text>
                    <Text style={stylesTeacher.fone}>{item.fone}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditPost}>
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

export default CardTeacher;
