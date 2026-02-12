import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import './CommentSection.css';

const CommentSection = ({ postId, initiallyExpanded = false }) => {
  const { comments, addComment, deleteComment, userProfile } = useApp();
  const [commentText, setCommentText] = useState('');
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const postComments = comments[postId] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, commentText);
      setCommentText('');
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="comment-section">
      <button
        className="toggle-comments-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        <span>
          {isExpanded ? 'Hide' : 'View'} comments ({postComments.length})
        </span>
      </button>

      {isExpanded && (
        <div className="comments-container fade-in">
          <form onSubmit={handleSubmit} className="comment-form">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="comment-avatar"
            />
            <div className="comment-input-wrapper">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <button
                type="submit"
                className="btn-send"
                disabled={!commentText.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>

          <div className="comments-list">
            {postComments.length > 0 ? (
              postComments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-time">{formatTime(comment.time)}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                  {comment.author === userProfile.name && (
                    <button
                      className="btn-delete-comment"
                      onClick={() => deleteComment(postId, comment.id)}
                      title="Delete comment"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="no-comments">
                <i className="far fa-comment"></i>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
