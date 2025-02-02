import { useEffect, useState } from 'react';
import { IPost } from '../model/Post';
import postsData from '../mockups/Posts.json';

const usePostController = () => {
    const [posts, setPosts] = useState<IPost[]>(postsData as IPost[] | []);

    // Função para listar posts
    const listarPosts = () => {
        const data = require('../mockups/Posts.json');
        if (posts == undefined) {
            setPosts(data);

            console.log(posts[0]);
        }
        return posts;
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


    return { listarPosts, gravarPost, deletarPost };
};

export default usePostController;
