import axios from 'axios';

const http = axios.create({
  baseURL: 'https://eyedroot.com/api/gg',
  headers: {
    'Content-type': 'application/json',
  },
});

export default http;
