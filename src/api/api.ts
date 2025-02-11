import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { API_URL } from '@env';
import { verifyExpirationAndRefreshToken } from '../context/AuthContext';

const api = axios.create({
    baseURL: API_URL,
});

console.log('Base URL:', api.defaults.baseURL);

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        // console.log('Interceptor request:', token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



// api.interceptors.response.use(
//     async response => {
//         const token = await AsyncStorage.getItem('authToken');
//         console.log('Interceptor response:', token);
//         if (token)
//             verifyExpirationAndRefreshToken(response);
//         return response;
//     },
//     (error) => Promise.reject(error)
//     // async error => {
//     //     console.log(error);
//     //     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//     //         Alert.alert('Sua sessão expirou', 'Efetue login novamente.');

//     //         // Aguarda 5 segundos antes de deslogar
//     //         setTimeout(() => {
//     //             logout();
//     //             navigation.dispatch(DrawerActions.closeDrawer());
//     //         }, 5000);
//     //     }
//     //     return Promise.reject(error);
//     // }
// );


// Tentativa de criar um interceptor para tratar erros de autenticação, e desligar o usuário caso token invalido
// Mas não tive sucesso, pois o navigator apresentava erro

// export const setupInterceptors = (navigation, logout) => {
//     api.interceptors.response.use(
//         response => response,
//         async error => {
//             console.log(error);
//             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                 Alert.alert('Sua sessão expirou', 'Efetue login novamente.');

//                 // Aguarda 5 segundos antes de deslogar
//                 setTimeout(() => {
//                     logout();
//                     navigation.dispatch(DrawerActions.closeDrawer());
//                 }, 5000);
//             }
//             return Promise.reject(error);
//         }
//     );
// };

export default api;