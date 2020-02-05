import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-60e95.firebaseio.com/'
});

export default instance;
