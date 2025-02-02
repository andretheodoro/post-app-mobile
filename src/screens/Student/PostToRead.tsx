import { IPost } from '@/src/model/Post';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './PostToReadStyle';

const PostToRead = (post: IPost) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Autor: {post.author}</Text>

            <ScrollView style={styles.descriptionContainer}>
                <Text style={styles.description}>{post.description}</Text>
            </ScrollView>
        </View>
    );
};

export default PostToRead;
