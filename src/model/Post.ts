import { useEffect, useRef, useState } from 'react';
// import postsData from '../mockups/Posts.json';
import api from '../api/api';
import { AxiosResponse, HttpStatusCode } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, NavigationProp, NavigationState, useNavigation } from '@react-navigation/native';
import { verifyExpirationAndRefreshToken } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';
import { LogoutNotAutenticated } from '../context/LogoutNotAutenticated';

export interface IPost {
    id?: number | null;
    title: string;
    author: string;
    description: string;
    creation?: Date | null;
    update_date?: Date | null;
    idteacher: number;
}




const usePost = () => {
    const navigation = useNavigation();


    const { logout } = useAuth();

    const loadAllPosts = async (): Promise<IPost[]> => {
        let result: IPost[] = [];

        try {
            const token = await AsyncStorage.getItem('authToken');

            let response: AxiosResponse<any, any>;
            const idTeacher = await AsyncStorage.getItem('idTeacher');
            // console.log("idTeacher", idTeacher);
            if ((token != null && token != "") || (idTeacher != null && Number(idTeacher) > 0)) {
                response = await api.get(`/api/posts/teacher/${idTeacher}`, {
                }).then((_response: AxiosResponse) => {
                    verifyExpirationAndRefreshToken(_response);
                    return _response;
                })
                    .catch((error) => {
                        LogoutNotAutenticated(error, logout, navigation);
                        // throw error;
                        return error;
                    });

            } else {
                response = await api.get('/api/posts');
            }
            result = response.data as IPost[];
        } catch (error) {
            result = [];
        }
        return result;
    };

    const seachPosts = async (searchTerm: string): Promise<IPost[]> => {
        let result: IPost[] = [];

        try {

            let response: AxiosResponse<any, any>;
            const idTeacher = await AsyncStorage.getItem('idTeacher');
            // console.log("idTeacher", idTeacher);

            response = await api.get('/api/posts/search', { params: { keyword: searchTerm } }).then((_response: AxiosResponse) => {
                verifyExpirationAndRefreshToken(_response);
                return _response;
            })
                .catch((error) => {
                    LogoutNotAutenticated(error, logout, navigation);
                    // throw error;
                    return error;
                });

            result = response.data as IPost[];
        } catch (error) {
            result = [];
        }
        return result;
    };

    const gravarPost = async (post: IPost): Promise<IPost | string> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return 'Token não encontrado. Usuário não autenticado.';
        }
        const newPost = { title: post.title, author: post.author, description: post.description, creation: new Date(), update_date: new Date(), idteacher: post.idteacher, };

        var response = await api.post('/api/posts', newPost).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            return response.data;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        // Substituindo o nome do campo por uma versão mais amigável
                        const fieldName = field === "title" ? "Título"
                            : field === "description" ? "Descrição"
                                : field === "author" ? "Autor"
                                    : field;

                        return `${fieldName}: ${message}`;
                    }).join('\n');  // Junta as mensagens com quebra de linha


                    // console.log("errorMessages", messages);
                    return messages;
                } else {
                    // console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as IPost | string;
    };

    const atualizarPost = async (post: IPost): Promise<IPost | string> => {
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return 'Token não encontrado. Usuário não autenticado.';
        }
        const newPost = { title: post.title, author: post.author, description: post.description, creation: new Date(), update_date: new Date(), idteacher: post.idteacher, };


        var response = await api.put(`/api/posts/${post.id}`, newPost).then((response: AxiosResponse) => {

            verifyExpirationAndRefreshToken(response);
            return response.data;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        // Substituindo o nome do campo por uma versão mais amigável
                        const fieldName = field === "title" ? "Título"
                            : field === "description" ? "Descrição"
                                : field === "author" ? "Autor"
                                    : field;

                        return `${fieldName}: ${message}`;
                    }).join('\n');  // Junta as mensagens com quebra de linha


                    // console.log("errorMessages", messages);
                    return messages;
                } else {
                    // console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as IPost | string;
    };


    const deletarPost = async (id: number): Promise<AxiosResponse | void> => {
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return;
        }

        var response = await api.delete(`/api/posts/${id}`).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            // console.log('Post deletado com sucesso', response);
            return response;
        })
            .catch((error) => {
                // console.log("error Delete Post", error);
                LogoutNotAutenticated(error, logout, navigation);

                return error;
            });
        // console.log("response", response);
        return response;
    };


    return { gravarPost, deletarPost, loadAllPosts, seachPosts, atualizarPost };
};

export default usePost;
