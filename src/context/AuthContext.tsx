import React, { createContext, useState, useContext, ReactNode } from 'react';

// Criação do contexto
const AuthContext = createContext({
    isLoggedIn: false,
    idTeacher: 0,
    login: () => { },
    logout: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idTeacher, setIdTeacher] = useState(0);

    const login = () => {
        setIsLoggedIn(true);
        setIdTeacher(1);

    };

    const logout = () => {
        setIsLoggedIn(false);
        setIdTeacher(0);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, idTeacher, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
