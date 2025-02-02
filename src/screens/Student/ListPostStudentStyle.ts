import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  form: {},
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
    height: 40,
  },
  cardList: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '95%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  modalHeader: {
    paddingEnd: 15,
    paddingTop: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
  emptyMessage: { textAlign: 'center', padding: 20, fontSize: 16, color: 'gray' },
});

export default styles;
