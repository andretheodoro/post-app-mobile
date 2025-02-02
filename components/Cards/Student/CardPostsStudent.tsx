import { IPost } from '@/src/model/Post';
import React from 'react';
import { View, Text } from 'react-native';
import styles from './CardPostsStudentStyle';

const CardPostsStudent = (item: IPost) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Autor: {item.author}</Text>
            <Text style={styles.description}>{item.description.substring(0, 50)}</Text>
        </View>
    );
};

export default CardPostsStudent;
