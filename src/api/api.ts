import axios from 'axios';
import Constants from 'expo-constants';
import Config from 'react-native-config';

const api = axios.create({
    // Pego de dois modos diferentes pois em algum momento tive problemas na passagem dos valores
    baseURL: Config.API_URL || Constants.expoConfig?.extra?.API_URL,
});

console.log('Base URL:', api.defaults.baseURL);

export default api;