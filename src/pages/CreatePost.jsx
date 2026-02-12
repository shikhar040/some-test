import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import './CreatePost.css';

const CreatePost = () => {
  const { addPost, setCurrentPage, currentMode } = useApp();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [postType, setPostType] = useState(currentMode);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPost({
      content: content.trim(),
      image: image || null,
      type: postType
    });

    setContent('');
    setImage(null);
    setCurrentPage('home');
  };

  return (
    <div className="create-post-page">
      <div className="container">
        <div className="create-post-container glass-card">
          <div className="create-post-header">
            <button
              className="btn-icon"
              onClick={() => setCurrentPage('home')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2 className="create-post-title">Create Post</h2>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!content.trim()}
            >
              Post
            </button>
          </div>

          <div className="post-type-selector">
            <button
              className={`type-btn ${postType === 'social' ? 'active social' : ''}`}
              onClick={() => setPostType('social')}
            >
              <i className="fas fa-users"></i>
              <div>
                <div className="type-label">Social</div>
                <div className="type-desc">Personal updates & moments</div>
              </div>
            </button>
            <button
              className={`type-btn ${postType === 'professional' ? 'active professional' : ''}`}
              onClick={() => setPostType('professional')}
            >
              <i className="fas fa-briefcase"></i>
              <div>
                <div className="type-label">Professional</div>
                <div className="type-desc">Work achievements & insights</div>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="create-post-form">
            <textarea
              className="post-textarea"
              placeholder={`What's on your mind? Share your ${postType} update...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              autoFocus
            />

            {image && (
              <div className="image-preview">
                <img src={image} alt="Preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => setImage(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            <div className="post-actions-row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="fas fa-image"></i>
                <span>Add Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
            </div>
          </form>

          <div className="post-tips">
            <div className="tip-item">
              <i className="fas fa-lightbulb"></i>
              <span>Share authentic content that resonates with your audience</span>
            </div>
            <div className="tip-item">
              <i className="fas fa-shield-alt"></i>
              <span>Respect privacy and maintain professional boundaries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
