import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IPost } from '@/src/model/Post';
import CardPostsTeacher from '@/components/Cards/Teacher/CardPostsTeacher';
import Pagination from '@/components/Pagination/Pagination';
import mockPostsTeacher from '../../mockups/Posts.json';

import styles from './ListPostsTeacherStyle';
const ITEMS_PER_PAGE = 5;

type RootStackParamList = {
  CadastrarPost: IPost;
};

const ListPostsTeacher = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [data] = useState(mockPostsTeacher);
  const [currentPage, setCurrentPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const dataToDisplay = searchText.length > 0 ? filteredData : data;
  const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = dataToDisplay.slice(startIndex, endIndex);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const handleSearch = (text: string) => {
    setSearchText(text);
    const searchTerm = text.toLowerCase();

    if (searchTerm === '') {
      setFilteredData([]);
      setCurrentPage(1);
    } else {
      const results = data.filter(item => item.title.toString().toLowerCase().includes(searchTerm));
      setFilteredData(results);
      setCurrentPage(1);
    }
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredData([]);
    setCurrentPage(1);
    Keyboard.dismiss();
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const handleCadastro = () => {
    const _post = {} as IPost;
    navigation.navigate('CreatePost', { _post });
  };

  return (
    <View style={[styles.container, { paddingBottom: isKeyboardVisible ? 0 : 80 }]}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputFilter}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Pesquisar"
          />

          <TouchableOpacity onPress={handleClear} style={styles.button}>
            <FontAwesome6 name="xmark" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCadastro} style={[styles.button, {}]}>
            <FontAwesome6 name="file-circle-plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={paginatedData.length > 0 ? paginatedData : []}
        renderItem={({ item }) => <CardPostsTeacher {...item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cardList}
        ListEmptyComponent={searchText.length > 0 && paginatedData.length === 0 ? (
          <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
        ) : null}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} recordsPerPage={ITEMS_PER_PAGE} />
    </View >
  );
};

export default ListPostsTeacher;
