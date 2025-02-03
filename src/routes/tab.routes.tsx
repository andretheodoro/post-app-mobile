import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome6 } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { useAuth } from '../context/AuthContext'
import ListPostStudent from '../screens/Student/ListPostStudent'
import LoginTeacher from '../screens/Teacher/LoginTeacher'
import ListPostsTeacher from '../screens/Teacher/ListPostsTeacher'


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>

            {isAuthenticated ? (
                <>
                    <Tab.Screen name="home" component={ListPostsTeacher} options={{
                        tabBarIcon: ({ color, size }) => <FontAwesome6 name="person-chalkboard" color={color} size={size} />,
                        tabBarLabel: 'Posts Professor',
                        headerShown: false,
                        tabBarStyle: { display: 'none' }
                    }} />
                </>
            ) : (
                <>
                    <Tab.Screen name="LoginTeacher" component={LoginTeacher} options={{
                        tabBarIcon: ({ color, size }) => <FontAwesome6 name="person-chalkboard" color={color} size={size} />,
                        tabBarLabel: 'Professor'
                    }} />
                    <Tab.Screen name="ListPostStudent" component={ListPostStudent} options={{
                        tabBarIcon: ({ color, size }) => <FontAwesome6 name="chalkboard" color={color} size={size} />,
                        tabBarLabel: 'Aluno'
                    }} />
                </>
            )}
        </Tab.Navigator>
    );
}