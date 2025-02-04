import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { IPost } from '@/src/model/Post';
import usePostController from '@/src/controllers/PostController';
import { useAuth } from '@/src/context/AuthContext';
import styles from './PostStyle';
import PopupNotification from '@/components/Notification/Notification';


interface PostFormProps {
    route: RouteProp<any, any>;
    onSubmit: (data: IPost) => void;
}

const PostFormScreen: React.FC<PostFormProps> = ({ route, onSubmit }) => {
    const { gravarPost, loadAllPosts } = usePostController();
    const { idTeacher } = useAuth();
    interface Notification {
        type: string;
        message: string;
    }

    const [notification, setNotification] = useState<Notification | null>(null);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<IPost>();
    const post = route.params?._post as IPost;
    useEffect(() => {
        reset({ ...post, idteacher: idTeacher ?? 0 });
    }, [post, reset]);

    // useEffect(() => {
    //     if (notification) {
    //         const timer = setTimeout(() => {
    //             setNotification(null); // Limpa o erro após 5 segundos
    //         }, 5000); // 5000 ms = 5 segundos

    //         return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    //     }
    // }, [notification]);

    const showNotification = (type: string, message: string) => {
        setNotification({ type, message });

        // Remover a notificação após o tempo definido
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const handleSave = async (data: IPost) => {
        try {
            const novoPost = await gravarPost(data);
            // onSubmit(novoPost);
            if (novoPost && novoPost.hasOwnProperty('id')) {
                console.log("novoPost", novoPost);
                // Aqui você pode fazer algo com o novoPost, como chamar onSubmit
                // onSubmit(novoPost);
            } else {
                // Se não for um IPost válido, exibe uma mensagem de alerta
                console.log(novoPost);
                if (typeof novoPost === 'string')
                    setNotification({ type: 'warning', message: novoPost });

            }

        } catch (error) {
            // console.error('Erro ao gravar post:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.formContainer}>
                {/* {error && (
                    <View
                        style={{
                            backgroundColor: '#FFD2D2',
                            padding: 15,
                            borderRadius: 8,
                            marginVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: '#D8000C', fontWeight: 'bold', fontSize: 16 }}>
                            Ocorreu um erro!
                        </Text>
                        <Text style={{ color: '#D8000C', fontSize: 14, marginTop: 5 }}>
                            {error}
                        </Text>
                    </View>
                )} */}
                {notification && (
                    <PopupNotification
                        type={notification.type}
                        message={notification.message}
                        duration={3000}
                        onClose={() => setNotification(null)}
                    />
                )}
                <Text style={styles.label}>Título</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.title && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="title"
                    rules={{ required: 'O título é obrigatório' }}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

                <Text style={styles.label}>Autor</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.author && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="author"
                    rules={{ required: 'O autor é obrigatório' }}
                />
                {errors.author && <Text style={styles.errorText}>{errors.author.message}</Text>}

                <Text style={styles.label}>Descrição</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.textarea, errors.description && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            numberOfLines={15}
                        />
                    )}
                    name="description"
                    rules={{ required: 'A descrição é obrigatória' }}
                />
                {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            secureTextEntry={true}
                            style={{ ...styles.input, display: 'none' }} // escondo o ID, não sei se seria a melhor maneira mas atende ao que preciso      
                            keyboardType="numeric"
                            onChangeText={(text) => onChange(text)}
                            value={idTeacher ? String(idTeacher) : ''}
                        />
                    )}
                    name="idteacher"
                    rules={{
                        required: 'O ID do professor é obrigatório',
                        min: {
                            value: 0,
                            message: 'O ID do professor deve ser maior que 0',
                        },
                    }}
                />
                {errors.idteacher && <Text style={styles.errorText}>{errors.idteacher.message}</Text>}

                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSave)}>
                        <FontAwesome name="save" size={24} color="#fff" style={styles.iconButton} />
                        <Text style={styles.buttonText}>Gravar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PostFormScreen;
