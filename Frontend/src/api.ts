import axios from 'axios';
import type { GitHubRepo, Favorite } from './types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE });

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const favorites = {
  get: () => api.get<Favorite[]>('/favorites'),
  add: (repo: Omit<Favorite, '_id'>) => api.post('/favorites', repo),
  remove: (id: string) => api.delete(`/favorites/${id}`),
};

export const github = {
  getUserRepos: (username: string) =>
    axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`),
};
