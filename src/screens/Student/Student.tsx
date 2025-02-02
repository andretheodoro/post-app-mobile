import React, { useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { IStudent } from '@/src/model/Student';
import { useAuth } from '@/src/context/AuthContext';
import styles from './StudentStyle';

interface StudentFormProps {
    route: RouteProp<any, any>;
    onSubmit: (data: IStudent) => void;
}

const StudentFormScreen: React.FC<StudentFormProps> = ({ route, onSubmit }) => {
    const { idTeacher } = useAuth();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<IStudent>();
    const student = route.params?._student as IStudent;

    console.log(idTeacher);
    console.log(student);

    useEffect(() => {
        reset(student ?? {});
    }, [student, reset]);

    const handleSave = async (data: IStudent) => {
        try {
            console.log('Dados do formulário:', data);
            // const novoStudent = await gravarStudent(data);
            // console.log('Student gravado:', novoStudent);
            // onSubmit(novoStudent);
        } catch (error) {
            console.error('Erro ao gravar post:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.formContainer}>
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
                        <TextInput
                            style={[styles.input, errors.fone && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="fone"
                    rules={{ required: 'O telefone é obrigatório' }}
                />
                {errors.fone && <Text style={styles.errorText}>{errors.fone.message}</Text>}

                <Text style={styles.label}>E-mail</Text>
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
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

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
