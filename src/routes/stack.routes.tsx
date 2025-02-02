import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Teacher/Profile';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);
    return (
        <>
            {isLoggedIn ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Profile' component={Profile} />
                </Stack.Navigator>
            ) : (<></>)
            }
        </>
    );
}