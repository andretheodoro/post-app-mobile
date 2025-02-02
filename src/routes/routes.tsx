import { NavigationContainer } from '@react-navigation/native'
import DrawerRoutes from './drawer.routes';
import { AuthProvider } from '../context/AuthContext';

export default function Routes() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <DrawerRoutes />
            </NavigationContainer>
        </AuthProvider>
    );
}