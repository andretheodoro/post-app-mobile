import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import api from "../api/api";
import { useAuth, verifyExpirationAndRefreshToken } from "../context/AuthContext";
import { LogoutNotAutenticated } from "../context/LogoutNotAutenticated";

export interface ITeacher {
    id?: number | null;
    name: string;
    contact: string;
    password: string;
}

const useTeacher = () => {
    const navigation = useNavigation();
    const { logout } = useAuth();

    const loadAllTeachers = async (): Promise<ITeacher[]> => {
        let result: ITeacher[] = [];

        try {
            const response = await api.get('/api/teacher').then((_response: AxiosResponse) => {
                verifyExpirationAndRefreshToken(_response);
                return _response;
            }).catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);
                return error;
            });

            result = response.data as ITeacher[];
        } catch (error) {
            result = [];
        }

        return result;
    };

    const gravarTeacher = async (teacher: ITeacher): Promise<ITeacher | string> => {
        // setError('');
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
        }
        const newTeacher = { name: teacher.name, contact: teacher.contact, password: teacher.password };

        var response = await api.post('/api/teacher', newTeacher).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            return response.data;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        const fieldName = field === "name" ? "Nome"
                            : field === "password" ? "Senha"
                                : field === "contact" ? "Contato"
                                    : field;

                        return `${fieldName}: ${message}`;
                    }).join('\n');  // Junta as mensagens com quebra de linha


                    console.log("errorMessages", messages);
                    return messages;
                } else {
                    console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as ITeacher | string;
    };

    const atualizarTeacher = async (teacher: ITeacher): Promise<ITeacher | string> => {
        const token = await AsyncStorage.getItem('authToken'); // Pegando o token do localStorage

        if (!token) {
            Alert.alert('Token não encontrado. Usuário não autenticado.');
            logout();
            if (navigation.canGoBack())
                navigation.goBack();
            navigation.dispatch(DrawerActions.closeDrawer());
            return 'Token não encontrado. Usuário não autenticado.';
        }
        const newTeacher = { name: teacher.name, contact: teacher.contact, password: teacher.password };

        var response = await api.put(`/api/teacher/${teacher.id}`, newTeacher).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            return response;
        })
            .catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);

                if (error.response && error.response.data.errors) {
                    const messages = error.response.data.errors.map((err) => {
                        const [field, message] = Object.entries(err)[0];

                        const fieldName = field === "name" ? "Nome"
                            : field === "password" ? "Senha"
                                : field === "contact" ? "Contato"
                                    : field;

                        return `${fieldName}: ${message}`;
                    }).join('\n');  // Junta as mensagens com quebra de linha


                    console.log("errorMessages", messages);
                    return messages;
                } else {
                    console.log("errorMessages", error);
                }

                return error;

            });

        return response as unknown as ITeacher | string;
    };


    const updatePassword = async (id: number, newPassword: string): Promise<ITeacher> => {
        let result: ITeacher | string;

        try {
            let response = await api.get(`/api/teacher/${id}`).then((_response: AxiosResponse) => {
                verifyExpirationAndRefreshToken(_response);
                return _response;
            }).catch((error) => {
                LogoutNotAutenticated(error, logout, navigation);
                return error;
            });

            result = response.data as ITeacher;
            console.log('Professoraaaa', result);
            if (result.id && result.id > 0) {
                result.password = newPassword;
                console.log('Professor', result);
                result = await atualizarTeacher(result);
            }
        } catch (error) {
            result = {} as ITeacher
        }

        return result as ITeacher;
    };

    const deletarTeacher = async (id: number): Promise<AxiosResponse | void> => {
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

        var response = await api.delete(`/api/teacher/${id}`).then((response: AxiosResponse) => {
            verifyExpirationAndRefreshToken(response);
            console.log('Professor deletado com sucesso', response);
            return response;
        })
            .catch((error) => {
                console.log("error Delete Professor", error.response.data?.message || error.response.data);
                LogoutNotAutenticated(error, logout, navigation);

                return error;
            });
        console.log("response", response);
        return response;
    };


    return { gravarTeacher, deletarTeacher, loadAllTeachers, atualizarTeacher, updatePassword };
};

export default useTeacher;