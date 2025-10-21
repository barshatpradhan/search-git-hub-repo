// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

// GitHub API types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  public_repos: number;
}

// Favorite repos types
export interface FavoriteRepo {
  id: string;
  userId: string;
  repoId: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  savedAt: Date;
}

export interface SaveRepoRequest {
  repoId: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
}