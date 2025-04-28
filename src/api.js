import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;