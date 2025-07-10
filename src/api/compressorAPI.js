import axios from 'axios';

// Get the API URL from environment variables, with a fallback for development
const API_URL = 'http://127.0.0.1:8000';

// Create a configured Axios instance
const api = axios.create({
  baseURL: API_URL,
});

export const compressImageAllAPI = (formData) => {
  return api.post('/compress-all', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};