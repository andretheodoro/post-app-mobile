import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { IStudent } from '@/src/model/Student';
import CardStudentStyle from './CardStudentStyle';
import stylesCard from '../CardStyle';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';


const CardStudent = (item: IStudent) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleEditPost = () => {
        const _student = item as IStudent;
        navigation.navigate('CreateStudent', { _student });
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
        Alert.alert('Registro excluído com sucesso!');
    };

    return (
        <View style={stylesCard.card}>
            <View style={stylesCard.cardContent}>
                <View style={stylesCard.textContainer}>
                    <Text style={CardStudentStyle.name}>{item.name}</Text>
                    <Text style={CardStudentStyle.fone}>{item.fone}</Text>
                    <Text style={CardStudentStyle.email}>{item.email}</Text>
                </View>

                <View style={stylesCard.buttonContainer}>
                    <TouchableOpacity style={[stylesCard.button, stylesCard.editButton]} onPress={handleEditPost}>
                        <Text style={stylesCard.buttonText}><FontAwesome5 name="edit" size={24} color="white" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[stylesCard.button, stylesCard.deleteButton]} onPress={() => setModalVisible(true)}>
                        <Text style={stylesCard.buttonText}><FontAwesome5 name="trash" size={24} color="white" /></Text>
                    </TouchableOpacity>
                </View>

                <ConfirmDeleteModal
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    onCallback={() => deleteRecordFromApi(item.id)} // Passando a função aqui
                />
            </View>
        </View >
    );
};

export default CardStudent;
