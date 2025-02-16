import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CommonActions, DrawerActions, RouteProp, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import useTeacher, { ITeacher } from '@/src/model/Teacher';
import { useAuth } from '@/src/context/AuthContext';
import styles from './TeacherStyle';
import Notification, { INotification } from '@/components/Notification/Notification';
import { TextInputMask } from 'react-native-masked-text';

interface TeacherFormProps {
    route: RouteProp<any, any>;
    onSubmit: (data: ITeacher) => void;
}

const TeacherFormScreen: React.FC<TeacherFormProps> = ({ route, onSubmit }) => {
    const { gravarTeacher, atualizarTeacher } = useTeacher();
    const { idTeacher } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [notification, setNotification] = useState<INotification | null>(null);
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<ITeacher>();
    const teacher = route.params?._teacher as ITeacher;
    // console.log("teacher", teacher);
    const navigation = useNavigation();
    // useEffect(() => {
    //     reset({ ...teacher, id: teacher.id ?? 0 });
    //     setIsPasswordVisible(false);
    //     if ((teacher?.id ?? 0) == 0)
    //         setValue("password", "TC4*" + new Date().getFullYear(), { shouldValidate: true });

    // }, [teacher, reset, setValue]);

    useEffect(() => {
        if (teacher) {
            reset({ ...teacher, id: teacher.id ?? 0 });
            setIsPasswordVisible(false);
            // Define a senha padrão apenas se for um novo professor
            if (!teacher.id) {
                setValue("password", "TC4*" + new Date().getFullYear(), { shouldValidate: true });
            }
        }
    }, [teacher]);

    // useEffect(() => {
    //     if (notification) {
    //         const timer = setTimeout(() => {
    //             setNotification(null); // Limpa o erro após 5 segundos
    //         }, 5000); // 5000 ms = 5 segundos

    //         return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    //     }
    // }, [notification]);

    const clearNotification = () => {
        // console.log("clearNotification");
        setNotification(null); // Limpa a notificação
    };


    const handleSave = async (data: ITeacher) => {
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
            let novoTeacher: ITeacher | string;
            debugger;
            if ((data.id ?? 0) > 0)
                novoTeacher = await atualizarTeacher(data);
            else
                novoTeacher = await gravarTeacher(data);

            // console.log("novoTeacher", novoTeacher);
            // console.log("novoTeacher2222", typeof novoTeacher);

            // onSubmit(novoTeacher);
            if (typeof novoTeacher === 'object') {
                // console.log("novoTeacher", novoTeacher);
                setNotification({
                    type: 'success', message: "Professor gravado com sucesso", onClose: () => {
                        clearNotification();
                        if (navigation.canGoBack())
                            navigation.goBack();
                        navigation.dispatch(DrawerActions.closeDrawer());

                        // navigation.navigate('ListTeachersTeacher', { refresh: true }); // validar se está atualizando a lista de Teachers
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'ListTeacher', params: { refresh: true } }],
                            })
                        )
                        // Atualiza a tela de listagem de Teachers
                    }
                });
                // Aqui você pode fazer algo com o novoTeacher, como chamar onSubmit
                // onSubmit(novoTeacher);
                // Navega de volta e sinaliza atualização na outra tela


            } else {
                // Se não for um ITeacher válido, exibe uma mensagem de alerta
                // console.log(novoTeacher);
                if (typeof novoTeacher === 'string')
                    setNotification({ type: 'warning', message: novoTeacher, onClose: clearNotification, });

            }

        } catch (error) {
            // console.log("error", error);
            setNotification({
                type: 'error',
                message: 'Erro ao gravar professor. Tente novamente.',
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
                <Text style={styles.label}>Senha</Text>
                <Controller
                    control={control}
                    defaultValue={(teacher?.id ?? 0) > 0 ? "" : "TC4*" + new Date().getFullYear()} // Defini valor padrão para senha
                    render={({ field: { onChange, value } }) => {
                        return (
                            <View style={[styles.inputContainer, errors.name && { borderColor: "red" }]}>
                                <TextInput
                                    editable={false}
                                    selectTextOnFocus={false}
                                    style={styles.inputpassword}
                                    onChangeText={onChange}
                                    value={value || "TC4*" + new Date().getFullYear()}
                                    returnKeyType="done"
                                    secureTextEntry={!isPasswordVisible} // Alterna a visibilidade da senha
                                />
                                {(teacher?.id ?? 0) == 0 &&
                                    <TouchableOpacity
                                        style={styles.icon}
                                        onPress={() => setIsPasswordVisible((prev) => !prev)}
                                    >
                                        <FontAwesome
                                            name={isPasswordVisible ? "eye" : "eye-slash"}
                                            size={24}
                                            color="gray"
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        );
                    }}
                    name="password"
                    rules={{ required: "A senha é obrigatória" }}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}


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
                    rules={teacher ? undefined : {
                        required: 'O ID do professor é obrigatório',
                        min: {
                            value: 0,
                            message: 'O ID do professor deve ser maior que 0',
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
        </TouchableWithoutFeedback >
    );
};

export default TeacherFormScreen;
