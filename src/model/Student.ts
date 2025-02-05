import { useEffect, useRef, useState } from 'react';
// import studentsData from '../mockups/Student.json';
import api from '../api/api';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useAuth, verifyExpirationAndRefreshToken } from '../context/AuthContext';
import { Alert } from 'react-native';
import { LogoutNotAutenticated } from '../context/LogoutNotAutenticated';


export interface IStudent {
    id?: number | null;
    name: string;
    contact: string;
    // email: string;
}

const useStudent = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const navigation = useNavigation();
    const { logout } = useAuth();

    const loadAllStudents = async (): Promise<IStudent[]> => {
        let result: IStudent[] = [];

        try {
            const response = await api.get('/api/student').then((_response: AxiosResponse) => {
                verifyExpirationAndRefreshToken(_response);
                return _response;
            }).catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);
                return error;
            });

            result = response.data as IStudent[];
            setStudents(result);  // Atualiza o estado
        } catch (error) {
            result = [];
        }
        setStudents([] as IStudent[]);  // Defina como uma lista vazia em caso de erro
        return result;
    };

    const gravarStudent = async (student: IStudent): Promise<IStudent | string> => {
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
        const newStudent = { name: student.name, contact: student.contact };

        var response = await api.post('/api/student', newStudent).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            return response.data;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        const fieldName = field === "name" ? "Nome"
                            : field === "contact" ? "Contato"
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

        return response as unknown as IStudent | string;
    };

    const atualizarStudent = async (student: IStudent): Promise<IStudent | string> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            // setError('Token não encontrado. Usuário não autenticado.');
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return 'Token não encontrado. Usuário não autenticado.';
        }
        const newStudent = { name: student.name, contact: student.contact };


        var response = await api.put(`/api/student/${student.id}`, newStudent).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            return response.data;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        const fieldName = field === "name" ? "Nome"
                            : field === "contact" ? "Contato"
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

        return response as unknown as IStudent | string;
    };


    const deletarStudent = async (id: number): Promise<AxiosResponse | void> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            // setError('Token não encontrado. Usuário não autenticado.');
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return;
        }

        var response = await api.delete(`/api/student/${id}`).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            console.log('Aluno deletado com sucesso', response);
            return response;
        })
            .catch((error) => {
                console.log("error Delete Aluno", error);
                LogoutNotAutenticated(error, logout, navigation);

                return error;
            });
        console.log("response", response);
        return response;
    };


    return { gravarStudent, deletarStudent, loadAllStudents, atualizarStudent };
};

export default useStudent;