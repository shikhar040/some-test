import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import './StoryViewer.css';

const StoryViewer = ({ story, onClose, onNext, onPrevious }) => {
  const { viewStory } = useApp();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    viewStory(story.id);
  }, [story.id, viewStory]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNext) {
            setTimeout(onNext, 100);
          } else {
            onClose();
          }
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total (50ms * 100)

    return () => clearInterval(interval);
  }, [isPaused, onClose, onNext]);

  const handlePrevNext = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 2 && onPrevious) {
      onPrevious();
    } else if (x >= width / 2 && onNext) {
      onNext();
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="story-viewer-overlay" onClick={onClose}>
      <div className="story-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="story-progress-bars">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="story-header">
          <div className="story-author-info">
            <img src={story.avatar} alt={story.user} className="story-author-avatar" />
            <div className="story-author-details">
              <span className="story-author-name">{story.user}</span>
              <span className="story-time">{formatTime(story.timestamp)}</span>
            </div>
          </div>
          <button className="btn-close-story" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div
          className="story-content"
          onClick={handlePrevNext}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <img src={story.media} alt="Story" className="story-media" />
          
          {onPrevious && (
            <div className="story-nav story-nav-left">
              <i className="fas fa-chevron-left"></i>
            </div>
          )}
          {onNext && (
            <div className="story-nav story-nav-right">
              <i className="fas fa-chevron-right"></i>
            </div>
          )}
        </div>

        <div className="story-actions">
          <button 
            className={`story-action-btn ${liked ? 'liked' : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
          </button>
          <button className="story-action-btn">
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
