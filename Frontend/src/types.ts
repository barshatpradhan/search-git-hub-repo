export interface User {
  id: string;
  username: string;
  email: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  language: string;
}

export interface Favorite {
  _id: string;
  repoId: number;
  name: string;
  description: string;
  starCount: number;
  url: string;
  language: string;
}