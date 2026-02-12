import React from 'react';
import { useApp } from '../contexts/AppContext';
import './Header.css';

const Header = () => {
  const {
    currentMode,
    setCurrentMode,
    setCurrentPage,
    unreadNotifications,
    userProfile
  } = useApp();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <i className="fas fa-bolt"></i>
          <span className="gradient-text">SOME</span>
        </div>

        <div className="mode-toggle">
          <button
            className={`mode-btn ${currentMode === 'social' ? 'active social' : ''}`}
            onClick={() => setCurrentMode('social')}
          >
            <i className="fas fa-users"></i>
            <span className="mode-text">Social</span>
          </button>
          <button
            className={`mode-btn ${currentMode === 'professional' ? 'active professional' : ''}`}
            onClick={() => setCurrentMode('professional')}
          >
            <i className="fas fa-briefcase"></i>
            <span className="mode-text">Professional</span>
          </button>
        </div>

        <div className="header-actions">
          <button
            className="btn-icon notification-btn"
            onClick={() => setCurrentPage('notifications')}
          >
            <i className="fas fa-bell"></i>
            {unreadNotifications > 0 && (
              <span className="badge">{unreadNotifications}</span>
            )}
          </button>
          <button
            className="avatar-btn"
            onClick={() => setCurrentPage('profile')}
          >
            <img src={userProfile.avatar} alt={userProfile.name} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
