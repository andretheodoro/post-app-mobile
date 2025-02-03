import { useEffect, useState } from 'react';
import { IPost } from '../model/Post';
// import postsData from '../mockups/Posts.json';
import api from '../api/api';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { verifyExpirationAndRefreshToken } from '../context/AuthContext';

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
    const loadAllPosts = async (): Promise<IPost[]> => {
        let result: IPost[] = [];
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log(token);
            let response: AxiosResponse<any, any>;
            const idTeacher = await AsyncStorage.getItem('idTeacher');

            if ((token != null && token != "") || (idTeacher != null && Number(idTeacher) > 0)) {
                console.log("idTeacher", idTeacher);
                response = await api.get(`/api/posts/teacher/${idTeacher}`, {
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                }).then((_response: AxiosResponse) => {
                    verifyExpirationAndRefreshToken(_response);
                    return _response;
                })
                    .catch((error) => {
                        console.log(error);
                        // if (error.response && error.response.data.errors) {
                        //     const errorMessages = (() => {
                        //         const [firstError] = error.response.data.errors;
                        //         const [field, message] = Object.entries(firstError)[0];
                        //         return `${field === "title" ? "Título" : field === "description" ? "Descrição" : "Autor"}: ${message}`;
                        //     })();
                        //     setError(errorMessages); // Define todas as mensagens de erro no estado
                        // } else {
                        //     setError('Ocorreu um erro inesperado.');
                        // }
                        throw error;
                    });

            } else {
                response = await api.get('/api/posts');
            }

            // console.clear();
            console.log("Estou Aqui", response.data);

            result = response.data as IPost[];
            setPosts(result);  // Atualiza o estado
        } catch (error) {
            result = [];
        }
        setPosts([] as IPost[]);  // Defina como uma lista vazia em caso de erro
        return result;
    };

    const gravarPost = (post: IPost) => {
        console.log(post);
        if (post) {
            if (post.title.trim() && post.author.trim() && post.description.trim() && post.idteacher) {
                const novoPost = {
                    id: posts.length + 1,
                    title: post.title,
                    author: post.author,
                    description: post.description,
                    creation: new Date(),
                    update_date: new Date(),
                    idteacher: post.idteacher,
                };

                setPosts((prevPosts: IPost[]) => [...prevPosts, novoPost]);
                return novoPost;
            } else {
                throw new Error('Todos os campos são obrigatórios!');
            }
        } else {
            throw new Error('Todos os campos são obrigatórios!');
        }

    };

    const deletarPost = (id: number) => {
        const postIndex = posts.findIndex((post) => post.id === id);

        if (postIndex !== -1) {

            const postDeletado = posts[postIndex];
            const novosPosts = posts.filter((post) => post.id !== id);
            setPosts(novosPosts);
            return postDeletado;
        } else {
            throw new Error('Post não encontrado!');
        }
    };


    return { gravarPost, deletarPost, loadAllPosts };
};

export default usePostController;
