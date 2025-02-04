import { useEffect, useRef, useState } from 'react';
import { IPost } from '../model/Post';
// import postsData from '../mockups/Posts.json';
import api from '../api/api';
import { AxiosResponse, HttpStatusCode } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, NavigationProp, NavigationState, useNavigation } from '@react-navigation/native';
import { verifyExpirationAndRefreshToken } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';
const usePostController = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const navigation = useNavigation();


    // useEffect(() => {
    //     const fetchData = async () => {
    //         await loadAllPosts();
    //     };
    //     fetchData();
    // }, []);

    // // Função para listar posts
    // const listarPosts = async () => {
    //     const data = require('../mockups/Posts.json');
    //     if (posts == undefined) {
    //         setPosts(data);

    //         console.log(posts[0]);
    //     }
    //     return posts;
    // };


    // api.post('/posts',
    //     newPost, // Dados do post 
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Enviando o token no header
    //       },
    //     }
    //   )
    //     .then((response: AxiosResponse) => {
    //       verifyExpirationAndRefreshToken(response);
    //       console.log('Post criado com sucesso');
    //       navigate('/teacherPostsList'); // Redireciona para a lista de posts do professor após a criação
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.data.errors) {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         const errorMessages = (() => {
    //           const [firstError] = error.response.data.errors;
    //           const [field, message] = Object.entries(firstError)[0];
    //           return `${field === "title" ? "Título" : field === "description" ? "Descrição" : "Autor"}: ${message}`;
    //         })();
    //         setError(errorMessages); // Define todas as mensagens de erro no estado
    //       } else {
    //         setError('Ocorreu um erro inesperado.');
    //       }
    //     });


    const { logout } = useAuth();

    const loadAllPosts = async (): Promise<IPost[]> => {
        let result: IPost[] = [];

        try {
            const token = await AsyncStorage.getItem('authToken');

            let response: AxiosResponse<any, any>;
            const idTeacher = await AsyncStorage.getItem('idTeacher');
            console.log("idTeacher", idTeacher);
            if ((token != null && token != "") || (idTeacher != null && Number(idTeacher) > 0)) {
                response = await api.get(`/api/posts/teacher/${idTeacher}`, {
                }).then((_response: AxiosResponse) => {
                    verifyExpirationAndRefreshToken(_response);
                    return _response;
                })
                    .catch((error) => {
                        logoutNotAutenticated(error, logout, navigation);
                        // throw error;
                        return error;
                    });

            } else {
                response = await api.get('/api/posts');
            }
            result = response.data as IPost[];
            setPosts(result);  // Atualiza o estado
        } catch (error) {
            result = [];
        }
        setPosts([] as IPost[]);  // Defina como uma lista vazia em caso de erro
        return result;
    };

    const gravarPost = async (post: IPost): Promise<IPost | string> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            // setError('Token não encontrado. Usuário não autenticado.');
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
        }
        const newPost = { title: post.title, author: post.author, description: post.description, creation: new Date(), update_date: new Date(), idteacher: post.idteacher, };

        var response = await api.post('/api/posts', newPost).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            // navigate('/teacherPostsList'); // Redireciona para a lista de posts do professor após a criação
            // navigation.navigate('ListPostsTeacher'); // Fecha o drawer após o timeout
            return response.data;
        })
            .catch((error) => {
                logoutNotAutenticated(error, logout, navigation);

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


                    console.log("errorMessages", messages);
                    return messages;
                    // setError(errorMessages); // Define todas as mensagens de erro no estado
                } else {
                    // setError('Ocorreu um erro inesperado.');
                    console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as IPost | string;
    };

    const atualizarPost = async (post: IPost): Promise<IPost | string> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            // setError('Token não encontrado. Usuário não autenticado.');
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
        }
        const newPost = { title: post.title, author: post.author, description: post.description, creation: new Date(), update_date: new Date(), idteacher: post.idteacher, };


        var response = await api.put(`/api/posts/${post.id}`, newPost).then((response: AxiosResponse) => {

            verifyExpirationAndRefreshToken(response);
            // navigate('/teacherPostsList'); // Redireciona para a lista de posts do professor após a criação
            // navigation.navigate('ListPostsTeacher'); // Fecha o drawer após o timeout
            return response.data;
        })
            .catch((error) => {
                logoutNotAutenticated(error, logout, navigation);

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


                    console.log("errorMessages", messages);
                    return messages;
                    // setError(errorMessages); // Define todas as mensagens de erro no estado
                } else {
                    // setError('Ocorreu um erro inesperado.');
                    console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as IPost | string;
    };


    const deletarPost = async (id: number): Promise<AxiosResponse | void> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            // setError('Token não encontrado. Usuário não autenticado.');
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
        }

        var response = await api.delete(`/api/posts/${id}`).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            console.log('Post deletado com sucesso', response);
            return response;
        })
            .catch((error) => {
                console.log("error Delete Post", error);
                logoutNotAutenticated(error, logout, navigation);

                return error;
            });
        console.log("response", response);
        return response;
    };


    return { gravarPost, deletarPost, loadAllPosts, atualizarPost };
};

export default usePostController;

function logoutNotAutenticated(error: any, logout: () => void, navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & { getState(): NavigationState | undefined; }) {
    console.log("error", error.response.status);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        Alert.alert('Sua sessão expirou', 'Efetue login novamente.', [
            {
                text: 'OK',
                onPress: () => {
                    // Não consegui usr o navigation.navigate('home');, então usei o navigation.goBack(); + navigation.dispatch(DrawerActions.closeDrawer());
                    // navigation.navigate('home');
                    logout();
                    console.log("navigation");
                    if (navigation.canGoBack())
                        navigation.goBack();

                    navigation.dispatch(DrawerActions.closeDrawer());
                },
            },
        ]);
    }
}

