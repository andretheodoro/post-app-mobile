// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Profile from '../screens/Teacher/Profile';
// import { useAuth } from '../context/AuthContext';
// import React from 'react';

// const Stack = createNativeStackNavigator();

// export default function StackRoutes() {
//     const { isAuthenticated } = useAuth();
//     console.log(isAuthenticated);
//     return (
//         <>
//             {isAuthenticated ? (
//                 <Stack.Navigator screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name='Profile' component={Profile} />
//                 </Stack.Navigator>
//             ) : (<></>)
//             }
//         </>
//     );
// }