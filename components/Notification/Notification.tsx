import React, { useEffect, useState } from 'react';
import { Text, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './NotificationStyle';

export interface INotification {
    type: string;
    message: string;
    onClose?: () => void;
}

const Notification = ({ type = 'success', message = '', duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                if (onClose) onClose();  // Callback após o fechamento automático
            });
        }, duration);

        return () => clearTimeout(timeout); // Limpa o timeout se o componente for desmontado
    }, [fadeAnim, duration, onClose]);

    const closeNotification = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            if (onClose) onClose();  // Callback após o clique
        });
    };

    if (!visible) return null;

    const getNotificationStyle = () => {
        switch (type) {
            case 'error':
                return { icon: 'error', color: '#D32F2F', bgColor: '#FFCDD2' };
            case 'warning':
                return { icon: 'warning', color: '#FFA000', bgColor: '#FFECB3' };
            case 'success':
                return { icon: 'check-circle', color: '#388E3C', bgColor: '#C8E6C9' };
            default:
                return { icon: 'info', color: '#1976D2', bgColor: '#BBDEFB' };
        }
    };

    const { icon, color, bgColor } = getNotificationStyle();

    return (
        <TouchableOpacity onPress={closeNotification} style={styles.container}>
            <Animated.View style={[styles.container, { backgroundColor: bgColor, opacity: fadeAnim }]}>
                <MaterialIcons name={icon} size={24} color={color} style={styles.icon} />
                <Text style={[styles.message, { color }]}>{message}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default Notification;
