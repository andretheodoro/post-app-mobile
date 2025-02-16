import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import mockTeacher from '../../mockups/Teacher.json';
import Pagination from '@/components/Pagination/Pagination';
import CardTeacher from '@/components/Cards/Teacher/CardTeacher';
import useTeacher, { ITeacher } from '@/src/model/Teacher';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './ListTeacherStyle';

const ITEMS_PER_PAGE = 5;

type RootStackParamList = {
  CadastrarTeacher: ITeacher;
};

const ListTeacher = () => {
  const { loadAllTeachers } = useTeacher();
  const [data, setData] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<ITeacher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);


  useFocusEffect(
    useCallback(() => {
      handleLoadTeachers();
    }, [])
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleLoadTeachers(); // Atualiza a lista ao voltar para a tela
    }
  }, [isFocused]);

  // Função para carregar os Teachers
  const handleLoadTeachers = async () => {
    setLoading(true);
    setError(null);
    // console.log("handleLoadTeachers");
    try {
      const teachers = await loadAllTeachers(); // Chama a função para carregar os Teachers

      setData(teachers || []); // Atualiza o estado com os Teachers
    } catch (err) {
      setError('Erro ao carregar Professores. Tente novamente.'); // Se houver erro, exibe uma mensagem
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  // Chama a função de carregar Teachers ao abrir a tela
  useEffect(() => {
    handleLoadTeachers(); // Chama a função assim que o componente for montado
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
      const results = data.filter(item => item.name.toString().toLowerCase().includes(searchTerm));
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
    handleLoadTeachers(); // Chama novamente a função de carregar os Teachers após limpar
  };

  const handleCadastro = () => {
    const _teacher = {} as ITeacher;
    navigation.navigate('CreateTeacher', { _teacher });
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
        renderItem={({ item }) => <CardTeacher item={item} handleLoadTeachers={handleLoadTeachers} />}
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

export default ListTeacher;
