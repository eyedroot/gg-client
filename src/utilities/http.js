import axios from 'axios';

const http = axios.create({
  baseURL: 'https://php.beauty/api/phpgg',
  headers: {
    'Content-type': 'application/json',
  },
});

export default http;
