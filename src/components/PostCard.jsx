import React from 'react';
import { useApp } from '../contexts/AppContext';
import './PostCard.css';

const PostCard = ({ post }) => {
  const { toggleLike, userProfile, deletePost } = useApp();
  const isOwnPost = post.author === userProfile.name;

  return (
    <div className="post-card glass-card">
      <div className="post-header">
        <div className="post-author">
          <img src={post.avatar} alt={post.author} className="post-avatar" />
          <div className="post-meta">
            <h4 className="author-name">{post.author}</h4>
            <div className="post-info">
              <span className="post-time">{post.time}</span>
              <span className="post-separator">•</span>
              <span className={`post-type ${post.type}`}>
                <i className={`fas ${post.type === 'social' ? 'fa-users' : 'fa-briefcase'}`}></i>
                {post.type}
              </span>
            </div>
          </div>
        </div>
        {isOwnPost && (
          <button
            className="btn-icon btn-delete"
            onClick={() => deletePost(post.id)}
            title="Delete post"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post" loading="lazy" />
        </div>
      )}

      <div className="post-stats">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
        <span>{post.shares} shares</span>
      </div>

      <div className="post-actions">
        <button
          className={`action-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => toggleLike(post.id)}
        >
          <i className={`${post.liked ? 'fas' : 'far'} fa-heart`}></i>
          <span>Like</span>
        </button>
        <button className="action-btn">
          <i className="far fa-comment"></i>
          <span>Comment</span>
        </button>
        <button className="action-btn">
          <i className="far fa-share-from-square"></i>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
