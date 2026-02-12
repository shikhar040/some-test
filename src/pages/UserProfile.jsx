import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import PostCard from '../components/PostCard';
import './UserProfile.css';

const UserProfile = () => {
  const { getViewingUser, posts, setCurrentPage, followUser } = useApp();
  const [activeTab, setActiveTab] = useState('social');

  const user = getViewingUser();

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <div className="empty-state glass-card">
            <div className="empty-icon">
              <i className="fas fa-user-slash"></i>
            </div>
            <h3>User not found</h3>
            <p>This profile doesn't exist or has been removed</p>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage('search')}
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Search</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.authorId === user.id);
  const socialPosts = userPosts.filter(post => post.type === 'social');
  const professionalPosts = userPosts.filter(post => post.type === 'professional');

  const displayPosts = activeTab === 'social' ? socialPosts : professionalPosts;

  return (
    <div className="user-profile-page">
      <div className="container">
        <button
          className="btn-back-to-search"
          onClick={() => setCurrentPage('search')}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Search</span>
        </button>

        <div className="user-profile-header glass-card">
          <div 
            className="user-profile-cover"
            style={{
              backgroundImage: user.coverImage ? `url(${user.coverImage})` : 'linear-gradient(135deg, var(--primary), var(--secondary))'
            }}
          ></div>
          <div className="user-profile-info">
            <div className="user-profile-avatar-container">
              <img
                src={user.avatar}
                alt={user.name}
                className="user-profile-avatar"
              />
            </div>
            <div className="user-profile-details">
              <h1 className="user-profile-name">{user.name}</h1>
              <p className="user-profile-title">{user.title}</p>
              <p className="user-profile-location">
                <i className="fas fa-location-dot"></i>
                {user.location}
              </p>
              {user.bio && (
                <p className="user-profile-bio">{user.bio}</p>
              )}
            </div>
            <div className="user-profile-stats">
              <div className="stat-item">
                <div className="stat-value">{user.posts}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <div className="user-profile-actions">
              <button 
                className={`btn ${user.isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => followUser(user.id)}
              >
                <i className={`fas ${user.isFollowing ? 'fa-user-check' : 'fa-user-plus'}`}></i>
                <span>{user.isFollowing ? 'Following' : 'Follow'}</span>
              </button>
              <button className="btn btn-secondary">
                <i className="fas fa-comment"></i>
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>

        <div className="user-profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'social' ? 'active social' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="fas fa-users"></i>
            <span>Social Posts</span>
            <span className="tab-count">{socialPosts.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'professional' ? 'active professional' : ''}`}
            onClick={() => setActiveTab('professional')}
          >
            <i className="fas fa-briefcase"></i>
            <span>Professional</span>
            <span className="tab-count">{professionalPosts.length}</span>
          </button>
        </div>

        <div className="user-profile-content">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <i className={`fas ${activeTab === 'social' ? 'fa-users' : 'fa-briefcase'}`}></i>
              </div>
              <h3>No {activeTab} posts yet</h3>
              <p>{user.name} hasn't shared any {activeTab} updates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
