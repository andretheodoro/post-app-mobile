import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './ProfileStyle';
import Notification, { INotification } from '@/components/Notification/Notification';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // Ícones para os botões de visualização e gravação
import useTeacher from '@/src/model/Teacher';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ route }: { route: any }) {
  const { updatePassword } = useTeacher();

  const passwordDefault = route?.params?.hasOwnProperty('passwordDefault') ? route.params.passwordDefault : false;
  const [notification, setNotification] = useState<INotification | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  console.log("Profile", passwordDefault);

  useFocusEffect(
    React.useCallback(() => {
      if (passwordDefault) {
        setNotification({
          type: 'info',
          message: '\nEste é seu primeiro acesso, por segurança recomendamos alterar a senha!\n',
        });
      }
      setPassword('');
      setConfirmPassword('');

      return () => setNotification(null);

    }, [passwordDefault])
  );

  const clearNotification = () => {
    setNotification(null);
  };

  const handleSave = async () => {
    if (!password || !confirmPassword) {
      setNotification({ type: 'warning', message: 'Ambos os campos são obrigatórios!' });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({ type: 'warning', message: 'As senhas não coincidem!' });
      return;
    }

    try {
      const idTeacher = await AsyncStorage.getItem('idTeacher');
      console.log('route.params.id', idTeacher);
      if (idTeacher) {
        const response = await updatePassword(Number(idTeacher), password);
        console.log('response', response);
        if (response && response.status === 200) {
          setNotification({
            type: 'success', message: 'Senha alterada com sucesso!', onClose: () => {
              clearNotification();
              navigation.navigate('ListPostTeacher');
            }
          });
        } else {
          setNotification({
            type: 'warning', message: response, onClose: () => {
              clearNotification();
            }
          });
        }
      } else {
        setNotification({
          type: 'error', message: 'Erro ao obter o ID do professor.', onClose: () => {
            clearNotification();
          }
        });
      }
    } catch (error) {
      console.log('Erro ao alterar a senha', error);
      setNotification({
        type: 'error', message: 'Erro ao alterar a senha. Tente novamente.', onClose: () => {
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
            duration={8000}
            onClose={clearNotification}
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
            <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={24} color="gray" />
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
            <FontAwesome5 name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Botão Gravar */}
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <FontAwesome5 name="save" size={24} color="#fff" style={styles.iconButton} />
            <Text style={styles.buttonText}>Gravar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback >
  );
}
