import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import usePost, { IPost } from '@/src/model/Post';
import CardPostsTeacher from '@/components/Cards/Teacher/CardPostsTeacher';
import Pagination from '@/components/Pagination/Pagination';
import styles from './ListPostsTeacherStyle';
const ITEMS_PER_PAGE = 5;

type RootStackParamList = {
  CadastrarPost: IPost;
};


const ListPostsTeacher = () => {
  const { loadAllPosts } = usePost();
  const [data, setData] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);


  useFocusEffect(
    useCallback(() => {
      handleLoadPosts(); // Recarrega os posts sempre que a tela for reexibida
    }, [])
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleLoadPosts(); // Atualiza a lista ao voltar para a tela
    }
  }, [isFocused]);

  // Função para carregar os posts
  const handleLoadPosts = async () => {
    setLoading(true);
    setError(null);
    console.log("handleLoadPosts");
    try {
      const posts = await loadAllPosts(); // Chama a função para carregar os posts

      setData(posts || []); // Atualiza o estado com os posts
    } catch (err) {
      setError('Erro ao carregar posts. Tente novamente.'); // Se houver erro, exibe uma mensagem
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  // Chama a função de carregar posts ao abrir a tela
  useEffect(() => {
    handleLoadPosts(); // Chama a função assim que o componente for montado
  }, []); // Esse useEffect será executado apenas uma vez

  // Limpar erro após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Limpa o erro após 5 segundos
      }, 5000); // 5000 ms = 5 segundos

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [error]);

  // Filtro de dados baseado no texto de pesquisa
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

  // Manipula a pesquisa
  const handleSearch = (text: string) => {
    setSearchText(text);
    const searchTerm = text.toLowerCase();

    if (searchTerm === '') {
      setFilteredData([]); // Se a pesquisa estiver vazia, limpa o filtro
      setCurrentPage(1);
    } else {
      const results = data.filter(item => item.title.toString().toLowerCase().includes(searchTerm));
      setFilteredData(results); // Filtra os dados com base na pesquisa
      setCurrentPage(1);
    }
  };

  // Limpar a pesquisa
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

  // Navegar para a tela de cadastro de post
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

          <TouchableOpacity onPress={handleCadastro} style={styles.button}>
            <FontAwesome6 name="file-circle-plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
        renderItem={({ item }) => <CardPostsTeacher item={item} handleLoadPosts={handleLoadPosts} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cardList}
        ListEmptyComponent={searchText.length > 0 && paginatedData.length === 0 ? (
          <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
        ) : null}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} recordsPerPage={ITEMS_PER_PAGE} />
    </View>
  );
};

export default ListPostsTeacher;
