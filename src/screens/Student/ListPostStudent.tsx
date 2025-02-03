import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, ActivityIndicator, TouchableWithoutFeedback, SafeAreaView, Modal } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import ReadingForm from './PostToRead';
import { IPost } from '@/src/model/Post';
import usePostController from '@/src/controllers/PostController';

import styles from './ListPostStudentStyle';
import CardPostsStudent from '@/components/Cards/Student/CardPostsStudent';
import Pagination from '@/components/Pagination/Pagination';

const ITEMS_PER_PAGE = 8;


const ListPostStudent = () => {
  const { loadAllPosts } = usePostController();
  const [selectedItem, setSelectedItem] = useState<IPost | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [data, setData] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const dataToDisplay = searchText.length > 0 ? filteredData : data;
  const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = dataToDisplay.slice(startIndex, endIndex);


  // Função para carregar os posts
  const handleLoadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Carregando posts..."); // Verifique se entra aqui
      const posts = await loadAllPosts(); // Chama a função para carregar os posts
      console.log("Posts carregados: ", posts); // Verifique os dados aqui
      setData(posts || []); // Atualiza o estado com os posts
    } catch (err) {
      console.log('Erro ao carregar posts:', err);
      setError('Erro ao carregar posts. Tente novamente.'); // Se houver erro, exibe uma mensagem
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  // Chama a função de carregar posts ao abrir a tela
  useEffect(() => {
    console.log("useEffect - Carregar Posts");
    handleLoadPosts(); // Chama a função assim que o componente for montado
  }, []); // Esse useEffect será executado apenas uma vez


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
    handleLoadPosts(); // Chama novamente a função de carregar os posts após limpar
  };

  const handleCardPress = (item: IPost) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (

    <View style={styles.container} >
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
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        {loading && (
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10, fontSize: 16, color: '#555' }}>
              Carregando posts...
            </Text>
          </View>
        )}
        {error && (
          <View
            style={{
              backgroundColor: '#FFD2D2',
              padding: 15,
              borderRadius: 8,
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text style={{ color: '#D8000C', fontWeight: 'bold', fontSize: 16 }}>
              Ocorreu um erro!
            </Text>
            <Text style={{ color: '#D8000C', fontSize: 14, marginTop: 5 }}>
              {error}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={paginatedData.length > 0 ? paginatedData : []}
          renderItem={({ item }) =>
          (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              < CardPostsStudent {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.cardList}
          ListEmptyComponent={searchText.length > 0 && paginatedData.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
          ) : null}
        />

        <Modal
          visible={selectedItem !== null}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCloseModal}>
                  <FontAwesome6 name="xmark" size={26} color="black" />
                </TouchableOpacity>
              </View>

              {selectedItem && (
                <ReadingForm
                  title={selectedItem.title}
                  author={selectedItem.author}
                  description={selectedItem.description}
                  idteacher={selectedItem.idteacher} />
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} recordsPerPage={ITEMS_PER_PAGE} />
    </View>
  );
};

export default ListPostStudent;
