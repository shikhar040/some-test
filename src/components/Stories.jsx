import React from 'react';
import { useApp } from '../contexts/AppContext';
import './Stories.css';

const Stories = () => {
  const { userProfile } = useApp();

  const stories = [
    { id: 1, user: 'Your Story', avatar: userProfile.avatar, isYou: true },
    { id: 2, user: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, user: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, user: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, user: 'James Brown', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 6, user: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=20' },
    { id: 7, user: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=15' }
  ];

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {stories.map((story) => (
          <div key={story.id} className={`story-item ${story.isYou ? 'your-story' : ''}`}>
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
    </div>
  );
};

export default Stories;
