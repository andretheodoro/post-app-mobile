import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import styles from './LoginTeacherStyle';
import Constants from 'expo-constants';  // Importando expo-constants
import axios from 'axios';
import api from '@/src/api/api';

const LoginTeacher = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [username, setUsername] = useState('Andre');
  const [password, setPassword] = useState('TC4*2025');

  // const [username, setUsername] = useState('Tiago');
  // const [password, setPassword] = useState('123456');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const handleLogin = async () => {
  //   try {
  //     const response = await api.post('/api/teacher/login', { username, password });



  const handleLogin = async () => {
    // // console.log('LoginTeacher', Constants.expoConfig?.extra?.API_URL);
    // const navigation = useNavigation();
    // Acessando a URL base da API do app.json
    // const apiUrl = Constants.extra.API_URL;
    // console.log('usuario: ', username);
    // console.log('senha: ', password);
    // // console.log('apiUrl: ', apiUrl);

    try {
      if (!username || !password) {
        Alert.alert('Por favor, preencha o Usuário e Senha.');

        return;
      }
      const response = await api.post('/api/teacher/login', { username, password, isMobile: true });
      const token = response.data.token;
      const idTeacher = response.data.idTeacher;
      login(token, idTeacher, (password === "TC4*" + new Date().getFullYear()));
      if (password === "TC4*" + new Date().getFullYear()) {
        // console.log('Senha padrão, redirecionando...');
        navigation.navigate('Profile'); // validar


      }

      // console.log('Token Login: ', token);
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data.errors) {
        const messages = error.response.data.errors.map((err) => {
          const [field, message] = Object.entries(err)[0];

          const fieldName = field === "name" ? "Nome"
            : field === "password" ? "Senha"
              : field === "contact" ? "Contato"
                : field;

          return `${fieldName}: ${message}`;
        }).join('\n');  // Junta as mensagens com quebra de linha



        Alert.alert(`${messages}. Tente novamente.`);
      } else {
        if (error.status == 404)
          Alert.alert('Credenciais inválidas. Tente novamente.');
        else
          Alert.alert(`Ocorreu um erro inesperado. Tente novamente.\n ${error}`);
      }
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login do Professor</Text>

      <View style={styles.inputGroup}>
        <FontAwesome name="user" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View> */}

      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!isPasswordVisible} // Alterna a visibilidade
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color="#555"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.btnlogin}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <FontAwesome name="sign-in" size={24} color="#fff" style={styles.iconButton} />
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginTeacher;
