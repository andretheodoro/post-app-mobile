import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import TabRoutes from './tab.routes';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DrawerActions, useNavigation, } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import ListStudent from '../screens/Student/ListStudent';
import ListTeacher from '../screens/Teacher/ListTeacher';
import PostFormScreen from '../screens/Post/Post';
import StudentFormScreen from '../screens/Student/Student';
import TeacherFormScreen from '../screens/Teacher/Teacher';
import Profile from '../screens/Teacher/Profile';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const navigation = useNavigation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigation.dispatch(DrawerActions.closeDrawer());
        // talvez eu precise fazer isso nos metodos onde desloga o usuario por token invalido
        // Tiago - 2025-02-05
        navigation.navigate('ListPostsTeacher' as never); // mando para lista de post, para que não bugue a tela, sumindo o drawer e ficando na profile
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function DrawerRoutes() {
    const navigation = useNavigation();
    const { isAuthenticated } = useAuth();

    return (
        <Drawer.Navigator
            screenOptions={{ swipeEnabled: isAuthenticated, headerShown: isAuthenticated }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >

            {isAuthenticated ? (
                <>
                    <Drawer.Screen
                        name="ListPostsTeacher"
                        component={TabRoutes}
                        options={{
                            drawerIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
                            drawerLabel: 'Lista de Posts',
                            title: 'Lista de Posts',
                        }}
                    />

                    <Drawer.Screen
                        name="ListStudent"
                        component={ListStudent}
                        options={{
                            drawerIcon: ({ color, size }) => <FontAwesome5 name="list" color={color} size={size} />,
                            drawerLabel: 'Lista de Alunos',
                            title: 'Lista de Alunos'
                        }}
                    />
                    <Drawer.Screen
                        name="ListTeacher"
                        component={ListTeacher}
                        options={{
                            drawerIcon: ({ color, size }) => <FontAwesome5 name="list" color={color} size={size} />,
                            drawerLabel: 'Lista de Professores',
                            title: 'Lista de Professores'
                        }}
                    />

                    <Drawer.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            drawerIcon: ({ color, size }) => <FontAwesome5 name="user" color={color} size={size} />,
                            drawerLabel: 'Meu Perfil',
                            title: 'Meu Perfil',
                        }}
                    />
                </>
            ) : (
                <><Drawer.Screen
                    name="home"
                    component={TabRoutes}
                    options={{
                        drawerIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />,
                        drawerLabel: 'Home',
                    }} />
                    <Drawer.Screen name="Profile"
                        component={Profile}
                        options={{
                            drawerItemStyle: { display: isAuthenticated ? 'flex' : 'none' }, // Esconder a Rota
                            drawerIcon: ({ color, size }) => <FontAwesome5 name="user" color={color} size={size} />,
                            drawerLabel: 'Meu Perfil',
                            title: 'Meu Perfil',
                        }} /></>
            )}

            <Drawer.Screen name='CreatePost'
                options={{
                    drawerItemStyle: { display: 'none' }, // Esconder a Rota
                    title: 'Cadastro de Post',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ListPostsTeacher' as never)} style={styles.goBackButton}>
                            <FontAwesome6 name="arrow-turn-up" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}>
                {props => <PostFormScreen {...props} onSubmit={data => // console.log(data)} />}
            </Drawer.Screen>
            <Drawer.Screen name='CreateStudent'
                options={{
                    drawerItemStyle: { display: 'none' },// Esconder a Rota
                    title: 'Cadastro de Alunos',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ListStudent' as never)} style={styles.goBackButton}>
                            <FontAwesome6 name="arrow-turn-up" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}>
                {props => <StudentFormScreen {...props} onSubmit={data => // console.log(data)} />}
            </Drawer.Screen>
            <Drawer.Screen name='CreateTeacher'
                options={{
                    drawerItemStyle: { display: 'none' }, // Esconder a Rota
                    title: 'Cadastro de Professores',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ListTeacher' as never)} style={styles.goBackButton}>
                            <FontAwesome6 name="arrow-turn-up" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}>
                {props => <TeacherFormScreen {...props} onSubmit={data => // console.log(data)} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}


const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'flex-start',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d9534f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
    goBackButton: {
        transform: [{ rotate: '-90deg' }],
        marginRight: 20,
        marginLeft: 10,
    }
});