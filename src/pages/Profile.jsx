import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import PostCard from '../components/PostCard';
import './Profile.css';

const Profile = () => {
  const { userProfile, updateProfile, posts, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('social');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    title: userProfile.title,
    location: userProfile.location,
    bio: userProfile.bio
  });
  const [customAvatar, setCustomAvatar] = useState(null);
  const [customCover, setCustomCover] = useState(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const presetAvatars = [
    'https://i.pravatar.cc/150?img=33',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=68',
    'https://i.pravatar.cc/150?img=47'
  ];

  const presetCovers = [
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'
  ];

  const userPosts = posts.filter(post => 
    post.authorId === userProfile.id || post.author === userProfile.name
  );
  const socialPosts = userPosts.filter(post => post.type === 'social');
  const professionalPosts = userPosts.filter(post => post.type === 'professional');

  const displayPosts = activeTab === 'social' ? socialPosts : professionalPosts;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setShowEditModal(false);
  };

  const handleAvatarSelect = (avatar) => {
    updateProfile({ avatar });
    setShowAvatarModal(false);
  };

  const handleCustomAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomAvatar(e.target.result);
        updateProfile({ avatar: e.target.result });
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverSelect = (cover) => {
    updateProfile({ coverImage: cover });
    setShowCoverModal(false);
  };

  const handleCustomCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomCover(e.target.result);
        updateProfile({ coverImage: e.target.result });
        setShowCoverModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header glass-card">
          <div 
            className="profile-cover"
            style={{
              backgroundImage: userProfile.coverImage ? `url(${userProfile.coverImage})` : 'linear-gradient(135deg, var(--primary), var(--secondary), var(--professional))'
            }}
          >
            <button
              className="change-cover-btn"
              onClick={() => setShowCoverModal(true)}
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="profile-avatar"
              />
              <button
                className="change-avatar-btn"
                onClick={() => setShowAvatarModal(true)}
              >
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{userProfile.name}</h1>
              <p className="profile-title">{userProfile.title}</p>
              <p className="profile-location">
                <i className="fas fa-location-dot"></i>
                {userProfile.location}
              </p>
              {userProfile.bio && (
                <p className="profile-bio">{userProfile.bio}</p>
              )}
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{userProfile.posts}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userProfile.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userProfile.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={() => setShowEditModal(true)}
              >
                <i className="fas fa-pen"></i>
                <span>Edit Profile</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage('settings')}
              >
                <i className="fas fa-gear"></i>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
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

        <div className="profile-content">
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
              <p>Start sharing your {activeTab} updates with your network</p>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal glass-card slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button
                className="btn-icon"
                onClick={() => setShowEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAvatarModal && (
        <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="modal glass-card slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Avatar</h2>
              <button
                className="btn-icon"
                onClick={() => setShowAvatarModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="avatar-options">
              <button
                className="btn btn-primary upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="fas fa-upload"></i>
                <span>Upload Custom Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomAvatar}
                style={{ display: 'none' }}
              />
              <div className="preset-avatars">
                <p className="preset-label">Or choose a preset:</p>
                <div className="avatar-grid">
                  {presetAvatars.map((avatar, index) => (
                    <button
                      key={index}
                      className="avatar-option"
                      onClick={() => handleAvatarSelect(avatar)}
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCoverModal && (
        <div className="modal-overlay" onClick={() => setShowCoverModal(false)}>
          <div className="modal glass-card slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Cover Photo</h2>
              <button
                className="btn-icon"
                onClick={() => setShowCoverModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="avatar-options">
              <button
                className="btn btn-primary upload-btn"
                onClick={() => coverInputRef.current?.click()}
              >
                <i className="fas fa-upload"></i>
                <span>Upload Custom Photo</span>
              </button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomCover}
                style={{ display: 'none' }}
              />
              <div className="preset-avatars">
                <p className="preset-label">Or choose a preset:</p>
                <div className="cover-grid">
                  {presetCovers.map((cover, index) => (
                    <button
                      key={index}
                      className="cover-option"
                      onClick={() => handleCoverSelect(cover)}
                    >
                      <img src={cover} alt={`Cover ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
