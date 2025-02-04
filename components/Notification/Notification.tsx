import React, { useEffect, useState } from 'react';
import { Text, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './NotificationStyle';

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
                if (onClose) onClose();
            });
        }, duration);

        return () => clearTimeout(timeout);
    }, [fadeAnim, duration, onClose]);

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
        <Animated.View style={[styles.container, { backgroundColor: bgColor, opacity: fadeAnim }]}>
            <MaterialIcons name={icon} size={24} color={color} style={styles.icon} />
            <Text style={[styles.message, { color }]}>{message}</Text>
        </Animated.View>
    );
};

export default Notification;
