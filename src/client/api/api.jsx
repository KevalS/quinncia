import axios from 'axios';
import Config from '../common/config';

// eslint-disable-next-line no-underscore-dangle
const _instance = axios.create({
  baseURL: Config.BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const APIInstance = {
  shared() {
    return _instance;
  },
};

module.exports = [APIInstance];
