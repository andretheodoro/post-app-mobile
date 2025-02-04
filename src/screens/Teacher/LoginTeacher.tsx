import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import styles from './LoginTeacherStyle';
import Constants from 'expo-constants';  // Importando expo-constants
import axios from 'axios';
import api from '@/src/api/api';

const LoginTeacher = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [username, setUsername] = useState('Tiago');
  const [password, setPassword] = useState('123456');

  // const handleLogin = async () => {
  //   try {
  //     const response = await api.post('/api/teacher/login', { username, password });


  const handleLogin = async () => {
    console.log('LoginTeacher', Constants.expoConfig?.extra?.API_URL);
    // const navigation = useNavigation();
    // Acessando a URL base da API do app.json
    // const apiUrl = Constants.extra.API_URL;
    console.log('usuario: ', username);
    console.log('senha: ', password);
    // console.log('apiUrl: ', apiUrl);

    try {
      if (!username || !password) {
        Alert.alert('Por favor, preencha o Usuário e Senha.');
        return;
      }
      const response = await api.post('/api/teacher/login', { username, password });
      const token = response.data.token;
      const idTeacher = response.data.idTeacher;
      login(token, idTeacher);
      // await AsyncStorage.setItem('authToken', token);
      // await AsyncStorage.setItem('idTeacher', idTeacher.toString());
      console.log('Token Login: ', token);
    } catch (err) {
      console.log(err);
      Alert.alert('Credenciais inválidas. Tente novamente.');
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

      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
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
