import AsyncStorage from '@react-native-async-storage/async-storage';

class Token {
  token = null;

  constructor() {
    this.init();
  }

  init() {
    AsyncStorage.getItem('token').then(token => (this.token = token));
  }

  getToken = () => this.token;
  setToken = token => (this.token = token);
}

export default new Token();