import { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './ProfileStyle';
import Notification, { INotification } from '@/components/Notification/Notification';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Ícones para os botões de visualização e gravação
import useTeacher from '@/src/model/Teacher';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ route }: { route: any }) {
  const { updatePassword } = useTeacher();
  console.log('route', route);
  const [passwordDefault, setPasswordDefault] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchPasswordDefault = async () => {
        try {
          const value = await AsyncStorage.getItem('passwordDefault');
          console.log('value from AsyncStorage:', value);
          const isPasswordDefault = value === 'true';
          setPasswordDefault(isPasswordDefault);

          if (isPasswordDefault) {
            setNotification({
              type: 'info',
              duration: 3000,
              message: '\nEste é seu primeiro acesso, por segurança recomendamos alterar a senha!\n',
              onClose: clearNotification
            });
          }
        } catch (error) {
          console.log('Erro ao obter passwordDefault do AsyncStorage:', error);
        }
      };

      fetchPasswordDefault();
      setPassword('');
      setConfirmPassword('');

      return () => setNotification(null);
    }, []));

  const clearNotification = () => {
    setNotification(null);
  };

  const handleSave = async () => {
    if (!password || !confirmPassword) {
      setNotification({ type: 'warning', duration: 3000, message: 'Ambos os campos são obrigatórios!', onClose: clearNotification });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({ type: 'warning', duration: 3000, message: 'As senhas não coincidem!', onClose: clearNotification });
      return;
    }

    try {
      const idTeacher = await AsyncStorage.getItem('idTeacher');
      console.log('route.params.id', idTeacher);
      if (idTeacher) {
        const response = await updatePassword(Number(idTeacher), password);
        console.log('response 1', response.status);
        if (response && response.status === 200) {
          setNotification({
            type: 'success', duration: 3000, message: 'Senha alterada com sucesso!', onClose: async () => {
              clearNotification();
              console.log('close and redirect', response);
              await AsyncStorage.setItem('passwordDefault', "false");

              navigation.navigate('ListPostsTeacher');
            }
          });
        } else {
          setNotification({
            type: 'warning', duration: 3000, message: response, onClose: () => {
              clearNotification();
            }
          });
        }
      } else {
        setNotification({
          type: 'error', duration: 3000, message: 'Erro ao obter o ID do professor.', onClose: () => {
            clearNotification();
          }
        });
      }
    } catch (error) {
      console.log('Erro ao alterar a senha', error);
      setNotification({
        type: 'error', duration: 3000, message: 'Erro ao alterar a senha. Tente novamente.', onClose: () => {
          clearNotification();
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.formContainer}>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            duration={notification.duration}
            onClose={notification.onClose}
          />
        )}

        <Text style={styles.label}>Senha</Text>

        {/* Campo de Senha */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Botão Gravar */}
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <FontAwesome name="save" size={24} color="#fff" style={styles.iconButton} />
            <Text style={styles.buttonText}>Gravar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback >
  );
}
