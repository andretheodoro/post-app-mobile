import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import usePostController from '@/src/controllers/PostController';
import { IPost } from '@/src/model/Post';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';
import CardPostTeacherStyle from './CardPostTeacherStyle';
import styles from '../CardStyle';

const CardPostsTeacher = (item: IPost) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    // Chama o hook usePostController diretamente aqui
    const { deletarPost } = usePostController();

    const truncatedDescription = item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description;

    const handleEditPost = () => {
        const _post = item as IPost;
        navigation.navigate('CreatePost', { _post });
    };

    // Passando deletarPost como callback
    const deleteRecordFromApi = async (idPost: number) => {
        // console.log('Chamada API de exclusão');
        // Simulando uma chamada API com um atraso de 2 segundos
        await new Promise(resolve => {
            deletarPost(idPost); // Aqui é onde a exclusão é chamada
            setTimeout(resolve, 2000);
            // listarPosts();
        });
        // console.log('Registro excluído com sucesso');
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
                    <Text style={CardPostTeacherStyle.title}>{item.title}</Text>
                    <Text style={CardPostTeacherStyle.author}>Autor: {item.author}</Text>
                    <Text style={CardPostTeacherStyle.description}>{truncatedDescription}</Text>
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

export default CardPostsTeacher;
