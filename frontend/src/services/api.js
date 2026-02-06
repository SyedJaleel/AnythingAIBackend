import axios from 'axios';

const API_URL = 'https://anythingaibackend.onrender.com/api/v1';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to request headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me')
};

// Task Services
export const taskService = {
  createTask: (title, description) => api.post('/tasks', { title, description }),
  getAllTasks: () => api.get('/tasks'),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  updateTask: (id, title, description, status) =>
    api.put(`/tasks/${id}`, { title, description, status }),
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export default api;
