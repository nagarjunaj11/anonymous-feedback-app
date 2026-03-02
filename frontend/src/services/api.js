import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Feedback APIs
export const feedbackAPI = {
  createForm: (data) => api.post('/feedback/create', data),
  getMyForms: () => api.get('/feedback/my-forms'),
  getFormResponses: (formId) => api.get(`/feedback/${formId}/responses`),
  markAsRead: (responseId) => api.put(`/feedback/response/${responseId}/read`),
  deleteForm: (formId) => api.delete(`/feedback/${formId}`),
};

// Public APIs
export const publicAPI = {
  getFeedbackForm: (uniqueLink) => api.get(`/public/feedback/${uniqueLink}`),
  submitFeedback: (uniqueLink, data) => api.post(`/public/feedback/${uniqueLink}/submit`, data),
};

export default api;
