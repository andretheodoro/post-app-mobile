import { AxiosResponse } from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    idTeacher: number | null;
    login: (token: string, idTeacher: number) => void;
    logout: () => void;
    loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [idTeacher, setIdTeacher] = useState<number | null>(null);

    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('authToken');
            if (storedToken) {
                await checkIsAuthenticated(storedToken);
                setToken(storedToken);
                setIdTeacher(Number(await AsyncStorage.getItem('idTeacher')));
            }
            setLoading(false);
        };

        loadToken();
    }, []);

    const login = async (token: string, idTeacher: number) => {
        setToken(token);
        setIdTeacher(idTeacher);

        setAuthenticated(true);
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('idTeacher', idTeacher.toString());
    };

    const logout = async () => {
        setToken(null);
        setIdTeacher(0);

        setAuthenticated(false);
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('idTeacher');
    };

    const checkIsAuthenticated = async (token: string) => {
        try {
            const response = await api.get('/api/teacher/isAuthenticated', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status >= 200 && response.status < 300) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        } catch (error) {
            console.log('Erro ao verificar o token:', error);
            setAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, token, idTeacher, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Verifica a expiração do token e tenta atualizá-lo
export const verifyExpirationAndRefreshToken = async (response: AxiosResponse) => {
    try {
        const newToken = response.headers['authorization']; // Algumas APIs podem usar um nome diferente, verifique com a sua API
        if (newToken) {
            console.log('Novo token recebido:', newToken);
            await AsyncStorage.setItem('authToken', newToken);
        }

        const storedToken = await AsyncStorage.getItem('authToken');
        console.log('Token Atual:', storedToken);

        await AsyncStorage.setItem('authToken', storedToken?.toString() ?? '');
    } catch (error) {
        console.error('Erro ao verificar expiração do token:', error);
    }
};