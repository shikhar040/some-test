import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import StoryViewer from './StoryViewer';
import './Stories.css';

const Stories = () => {
  const { stories, addStory } = useApp();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleStoryClick = (index, story) => {
    if (story.isYou) {
      // Show options modal
      setShowOptionsModal(true);
    } else {
      setCurrentStoryIndex(index);
    }
  };

  const handleAddStory = () => {
    setShowOptionsModal(false);
    fileInputRef.current?.click();
  };

  const handleViewMyStory = () => {
    setShowOptionsModal(false);
    const myStoryIndex = stories.findIndex(s => s.isYou);
    if (myStoryIndex !== -1) {
      setCurrentStoryIndex(myStoryIndex);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addStory(e.target.result);
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        // Reset file input
        fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setCurrentStoryIndex(null);
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <>
      <div className="stories-container">
        {showSuccess && (
          <div className="story-success-toast">
            <i className="fas fa-check-circle"></i>
            <span>Story added successfully!</span>
          </div>
        )}
        <div className="stories-scroll">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`story-item ${story.isYou ? 'your-story' : ''} ${story.viewed ? 'viewed' : ''}`}
              onClick={() => handleStoryClick(index, story)}
            >
              <div className="story-ring">
                <div className="story-avatar">
                  <img src={story.avatar} alt={story.user} />
                  {story.isYou && (
                    <div className="add-story-btn">
                      <i className="fas fa-plus"></i>
                    </div>
                  )}
                </div>
              </div>
              <span className="story-name">{story.user}</span>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {currentStoryIndex !== null && (
        <StoryViewer
          story={stories[currentStoryIndex]}
          onClose={handleClose}
          onNext={currentStoryIndex < stories.length - 1 ? handleNext : null}
          onPrevious={currentStoryIndex > 0 ? handlePrevious : null}
        />
      )}

      {showOptionsModal && (
        <div className="story-options-overlay" onClick={() => setShowOptionsModal(false)}>
          <div className="story-options-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <h3>Your Story</h3>
            <div className="story-options">
              <button className="story-option-btn" onClick={handleAddStory}>
                <i className="fas fa-plus"></i>
                <span>Add Story</span>
              </button>
              <button className="story-option-btn" onClick={handleViewMyStory}>
                <i className="fas fa-eye"></i>
                <span>View My Story</span>
              </button>
            </div>
            <button className="btn-cancel" onClick={() => setShowOptionsModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
