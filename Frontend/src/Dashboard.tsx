import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { github, favorites } from './api';
import type { GitHubRepo, Favorite } from './types';

const Dashboard: React.FC = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [userFavorites, setUserFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await favorites.get();
      setUserFavorites(response.data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const searchRepos = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUsername.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('Searching for GitHub user:', githubUsername);
      const response = await github.getUserRepos(githubUsername.trim());
      console.log('Repos found:', response.data.length);
      setRepos(response.data);
      
      if (response.data.length === 0) {
        setError('No repositories found for this user');
      }
    } catch (error: any) {
      console.error('Error fetching repos:', error);
      
      if (error.response?.status === 404) {
        setError(`GitHub user "${githubUsername}" not found. Please check the username.`);
      } else if (error.response?.status === 403) {
        setError('GitHub API rate limit exceeded. Please try again later.');
      } else {
        setError('Error fetching repositories. Please try again.');
      }
      
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (repo: GitHubRepo) => {
    try {
      await favorites.add({
        repoId: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        starCount: repo.stargazers_count,
        url: repo.html_url,
        language: repo.language || 'Not specified'
      });
      loadFavorites();
    } catch (error: any) {
      console.error('Error adding favorite:', error);
      if (error.response?.status === 400) {
        alert('This repository is already in your favorites');
      }
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await favorites.remove(id);
      loadFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorited = (repoId: number) => {
    return userFavorites.some(fav => fav.repoId === repoId);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Welcome, {user?.username}!</h1>
        <button 
          onClick={logout}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px' 
      }}>
        <h2 style={{ marginTop: 0 }}>Search GitHub Repositories</h2>
        <form onSubmit={searchRepos} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., torvalds, facebook, microsoft)"
            value={githubUsername}
            onChange={(e) => {
              setGithubUsername(e.target.value);
              setError('');
            }}
            style={{ 
              padding: '10px', 
              marginRight: '10px', 
              width: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Searching...' : 'Search Repos'}
          </button>
        </form>
        
        {error && (
          <div style={{
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
            marginTop: '10px'
          }}>
            {error}
          </div>
        )}

        <p style={{ fontSize: '14px', color: '#6c757d', margin: '10px 0 0 0' }}>
          💡 Try searching: <strong>torvalds</strong>, <strong>github</strong>, <strong>facebook</strong>, or <strong>microsoft</strong>
        </p>
      </div>

      {repos.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2>Repositories for @{githubUsername} ({repos.length})</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {repos.map((repo) => (
              <div 
                key={repo.id} 
                style={{ 
                  border: '1px solid #dee2e6', 
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{repo.name}</h3>
                    <p style={{ color: '#6c757d', margin: '0 0 10px 0' }}>
                      {repo.description || 'No description available'}
                    </p>
                    <p style={{ margin: '0 0 10px 0' }}>
                      ⭐ {repo.stargazers_count.toLocaleString()} | 
                      Language: {repo.language || 'Not specified'}
                    </p>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                      View on GitHub →
                    </a>
                  </div>
                  <button
                    onClick={() => addToFavorites(repo)}
                    disabled={isFavorited(repo.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: isFavorited(repo.id) ? '#28a745' : '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isFavorited(repo.id) ? 'default' : 'pointer',
                      marginLeft: '15px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isFavorited(repo.id) ? '✓ Favorited' : '+ Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userFavorites.length > 0 && (
        <div>
          <h2>My Favorites ({userFavorites.length})</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {userFavorites.map((favorite) => (
              <div 
                key={favorite._id} 
                style={{ 
                  border: '1px solid #dee2e6', 
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#fff3cd'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>⭐ {favorite.name}</h3>
                    <p style={{ color: '#6c757d', margin: '0 0 10px 0' }}>
                      {favorite.description}
                    </p>
                    <p style={{ margin: '0 0 10px 0' }}>
                      ⭐ {favorite.starCount.toLocaleString()} | 
                      Language: {favorite.language}
                    </p>
                    <a 
                      href={favorite.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                      View on GitHub →
                    </a>
                  </div>
                  <button
                    onClick={() => removeFavorite(favorite._id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '15px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userFavorites.length === 0 && repos.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#6c757d' 
        }}>
          <p>Search for a GitHub user to explore their repositories!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;