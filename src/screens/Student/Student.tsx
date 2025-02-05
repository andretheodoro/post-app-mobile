import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CommonActions, DrawerActions, RouteProp, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import useStudent, { IStudent } from '@/src/model/Student';
import { useAuth } from '@/src/context/AuthContext';
import styles from './StudentStyle';
import Notification, { INotification } from '@/components/Notification/Notification';
import { TextInputMask } from 'react-native-masked-text';

interface StudentFormProps {
    route: RouteProp<any, any>;
    onSubmit: (data: IStudent) => void;
}

const StudentFormScreen: React.FC<StudentFormProps> = ({ route, onSubmit }) => {
    const { gravarStudent, atualizarStudent } = useStudent();
    const { idTeacher } = useAuth();

    const [notification, setNotification] = useState<INotification | null>(null);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<IStudent>();
    const student = route.params?._student as IStudent;
    const navigation = useNavigation();
    useEffect(() => {
        reset({ ...student, id: student.id ?? 0 });
    }, [student, reset]);

    // useEffect(() => {
    //     if (notification) {
    //         const timer = setTimeout(() => {
    //             setNotification(null); // Limpa o erro após 5 segundos
    //         }, 5000); // 5000 ms = 5 segundos

    //         return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    //     }
    // }, [notification]);

    const clearNotification = () => {
        console.log("clearNotification");
        setNotification(null); // Limpa a notificação
    };


    const handleSave = async (data: IStudent) => {
        // Verifica se há erros antes de gravar
        if (Object.keys(errors).length > 0) {
            setNotification({
                type: 'warning',
                message: 'Por favor, preencha todos os campos obrigatórios.',
                onClose: clearNotification,
            });
            return;
        }

        try {
            let novoStudent: IStudent | string;
            if ((data.id ?? 0) > 0)
                novoStudent = await atualizarStudent(data);
            else
                novoStudent = await gravarStudent(data);

            console.log("novoStudent", novoStudent);
            console.log("novoStudent2222", typeof novoStudent);

            // onSubmit(novoStudent);
            if (typeof novoStudent === 'object') {
                console.log("novoStudent", novoStudent);
                setNotification({
                    type: 'success', message: "Aluno gravado com sucesso", onClose: () => {
                        clearNotification();
                        if (navigation.canGoBack())
                            navigation.goBack();
                        navigation.dispatch(DrawerActions.closeDrawer());

                        // navigation.navigate('ListStudentsTeacher', { refresh: true }); // validar se está atualizando a lista de Students
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'ListStudent', params: { refresh: true } }],
                            })
                        )
                        // Atualiza a tela de listagem de Students
                    }
                });
                // Aqui você pode fazer algo com o novoStudent, como chamar onSubmit
                // onSubmit(novoStudent);
                // Navega de volta e sinaliza atualização na outra tela


            } else {
                // Se não for um IStudent válido, exibe uma mensagem de alerta
                console.log(novoStudent);
                if (typeof novoStudent === 'string')
                    setNotification({ type: 'warning', message: novoStudent, onClose: clearNotification, });

            }

        } catch (error) {
            console.log("error", error);
            setNotification({
                type: 'error',
                message: 'Erro ao gravar aluno. Tente novamente.',
                onClose: clearNotification,
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
                        onClose={notification.onClose}
                    />
                )}
                <Text style={styles.label}>Nome</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.name && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="name"

                    rules={{ required: 'O Nome é obrigatório' }}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                <Text style={styles.label}>Telefone</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            style={[styles.input, errors.contact && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="phone-pad"
                            returnKeyType="done"
                        />
                    )}
                    name="contact"
                    rules={{ required: 'O telefone é obrigatório' }}
                />
                {errors.contact && <Text style={styles.errorText}>{errors.contact.message}</Text>}

                {/* <Text style={styles.label}>E-mail</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="email"
                    rules={{ required: 'O e-mail é obrigatório' }}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>} */}

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            secureTextEntry={true}
                            style={{ ...styles.input, display: 'none' }} // escondo o ID, não sei se seria a melhor maneira mas atende ao que preciso      
                            keyboardType="numeric"
                            onChangeText={onChange}
                            value={value?.toString() || ''}
                        />
                    )}
                    name="id"
                    rules={student ? undefined : {
                        required: 'O ID do aluno é obrigatório',
                        min: {
                            value: 0,
                            message: 'O ID do aluno deve ser maior que 0',
                        },
                    }}
                />
                {errors.id && <Text style={styles.errorText}>{errors.id.message}</Text>}

                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSave)}>
                        <FontAwesome name="save" size={24} color="#fff" style={styles.iconButton} />
                        <Text style={styles.buttonText}>Gravar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default StudentFormScreen;
