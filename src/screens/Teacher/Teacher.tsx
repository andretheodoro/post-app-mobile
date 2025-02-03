import React, { useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { ITeacher } from '@/src/model/Teacher';
import { useAuth } from '@/src/context/AuthContext';
import styles from './TeacherStyle';


interface TeacherFormProps {
    route: RouteProp<any, any>;
    onSubmit: (data: ITeacher) => void;
}

const TeacherFormScreen: React.FC<TeacherFormProps> = ({ route, onSubmit }) => {
    // const { gravarTeacher } = useTeacherController();
    const { idTeacher } = useAuth();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ITeacher>();
    const teacher = route.params?._teacher as ITeacher;

    useEffect(() => {
        reset({ ...teacher, id: teacher.id ?? 0 });
    }, [teacher, reset]);


    const handleSave = async (data: ITeacher) => {
        try {
            console.log('Dados do formulário:', data);
            // const novoTeacher = await gravarTeacher(data);
            // console.log('Teacher gravado:', novoTeacher);
            // onSubmit(novoTeacher);
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

                <Text style={styles.label}>Senha</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.password && { borderColor: 'red' }]}
                            onChangeText={onChange}
                            secureTextEntry
                            value={value}
                            returnKeyType="done"
                        />
                    )}
                    name="password"
                    rules={{ required: 'A senha é obrigatório' }}
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
                    rules={{
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

export default TeacherFormScreen;
