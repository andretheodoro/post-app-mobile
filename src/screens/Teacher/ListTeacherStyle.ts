import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  form: {

  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  inputFilter: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#046fe1',
    width: 40,
    height: 40
  },
  cardList: {
    marginTop: 10,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
  },
  emptyMessage: { textAlign: 'center', padding: 20, fontSize: 16, color: 'gray' },
});

export default styles;
