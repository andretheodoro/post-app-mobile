import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import styles from './LoginTeacherStyle';

const LoginTeacher = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState('professor');
  const [password, setPassword] = useState('1234');


  const handleLogin = () => {
    const token = 'fakeToken';

    if (username === 'professor' && password === '1234') {
      login();
    } else {
      alert('Usuário ou senha inválidos');
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
