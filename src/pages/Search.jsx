import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import './Search.css';

const Search = () => {
  const { users, viewUserProfile } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (activeFilter) {
      case 'followers':
        return b.followers - a.followers;
      case 'posts':
        return b.posts - a.posts;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="search-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Search</h1>
        </div>

        <div className="search-controls">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search users by name, title, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="btn-clear"
                onClick={() => setSearchQuery('')}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          <div className="filter-tabs">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <i className="fas fa-users"></i>
              <span>All</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === 'followers' ? 'active' : ''}`}
              onClick={() => setActiveFilter('followers')}
            >
              <i className="fas fa-star"></i>
              <span>Popular</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveFilter('posts')}
            >
              <i className="fas fa-fire"></i>
              <span>Active</span>
            </button>
          </div>
        </div>

        <div className="search-results">
          {sortedUsers.length > 0 ? (
            <>
              <div className="results-header">
                <span className="results-count">
                  {sortedUsers.length} {sortedUsers.length === 1 ? 'person' : 'people'} found
                </span>
              </div>
              <div className="users-grid">
                {sortedUsers.map((user) => (
                  <div key={user.id} className="user-card glass-card">
                    <div className="user-card-avatar">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                    <div className="user-card-info">
                      <h3 className="user-card-name">{user.name}</h3>
                      <p className="user-card-title">{user.title}</p>
                    </div>
                    <button 
                      className="btn btn-primary btn-view-profile"
                      onClick={() => viewUserProfile(user.id)}
                    >
                      <span>View Profile</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <i className="fas fa-user-slash"></i>
              </div>
              <h3>No users found</h3>
              <p>
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Start searching to find people'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
