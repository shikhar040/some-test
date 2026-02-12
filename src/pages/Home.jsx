import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import Stories from '../components/Stories';
import PostCard from '../components/PostCard';
import './Home.css';

const Home = () => {
  const { posts, currentMode } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.type === filter;
  });

  const displayPosts = filteredPosts.length > 0
    ? filteredPosts
    : posts.filter(post => post.type === currentMode);

  return (
    <div className="home-page">
      <Stories />

      <div className="feed-container container">
        <div className="feed-header">
          <h2 className="feed-title">Your Feed</h2>
          <div className="feed-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'social' ? 'active' : ''}`}
              onClick={() => setFilter('social')}
            >
              <i className="fas fa-users"></i>
              Social
            </button>
            <button
              className={`filter-btn ${filter === 'professional' ? 'active' : ''}`}
              onClick={() => setFilter('professional')}
            >
              <i className="fas fa-briefcase"></i>
              Professional
            </button>
          </div>
        </div>

        <div className="posts-feed">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <i className="fas fa-inbox"></i>
              </div>
              <h3>No posts yet</h3>
              <p>Start creating posts to see them in your feed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
