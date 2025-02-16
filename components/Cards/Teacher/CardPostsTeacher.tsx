import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import usePost, { IPost } from '@/src/model/Post';
import ConfirmDeleteModal from '@/components/ModalConfirmDel/ModalConfirmDel';
import CardPostTeacherStyle from './CardPostTeacherStyle';
import styles from '../CardStyle';
import Notification, { INotification } from '@/components/Notification/Notification';

interface CardPostsTeacherProps {
    item: IPost;
    handleLoadPosts: () => void;
}
const CardPostsTeacher = ({ item, handleLoadPosts }: CardPostsTeacherProps) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [notification, setNotification] = useState<INotification | null>(null);

    // Chama o hook usePostController diretamente aqui
    const { deletarPost } = usePost();

    const truncatedDescription = item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description;

    const handleEditPost = () => {
        const _post = item as IPost;
        navigation.navigate('CreatePost', { _post });
    };

    // Passando deletarPost como callback
    const deleteRecordFromApi = async (idPost: number) => {
        // // console.log('Chamada API de exclusão');
        // Simulando uma chamada API com um atraso de 2 segundos
        // await new Promise(resolve => {
        //     deletarPost(idPost); // Aqui é onde a exclusão é chamada
        //     setTimeout(resolve, 2000);
        //     // listarPosts();
        // });
        var response = await deletarPost(idPost);
        if (response && response.status === 200) {
            // console.log('Chamada API de exclusão', response);
            setNotification({
                type: 'success',
                message: 'Post excluído com sucesso.',
                onClose: () => {
                    // if (navigation.canGoBack())
                    //     navigation.goBack();
                    // navigation.dispatch(DrawerActions.closeDrawer());

                    navigation.navigate('ListPostsTeacher', { refresh: true }); // validar
                    setNotification(null)
                    handleLoadPosts();
                },
            });
        } else {
            setNotification({
                type: 'error',
                message: 'Erro ao excluir o post. Tente novamente.',
                onClose: () => setNotification(null),
            });
        }

        // // console.log('Registro excluído com sucesso');
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
