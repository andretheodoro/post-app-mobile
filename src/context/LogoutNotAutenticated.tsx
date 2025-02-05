
import { Alert } from 'react-native';
import { DrawerActions, NavigationProp } from '@react-navigation/native';

export function LogoutNotAutenticated(error: any, logout: () => void, navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & { getState(): NavigationState | undefined; }) {
    console.log("error atual", error.response.status);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        Alert.alert('Sua sessão expirou', 'Efetue login novamente.', [
            {
                text: 'OK',
                onPress: () => {
                    // Não consegui usr o navigation.navigate('home');, então usei o navigation.goBack(); + navigation.dispatch(DrawerActions.closeDrawer());
                    // navigation.navigate('home');
                    logout();
                    console.log("navigation");
                    if (navigation.canGoBack())
                        navigation.goBack();

                    navigation.dispatch(DrawerActions.closeDrawer());
                },
            },
        ]);
    }
}