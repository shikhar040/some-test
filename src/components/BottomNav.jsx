import React from 'react';
import { useApp } from '../contexts/AppContext';
import './BottomNav.css';

const BottomNav = () => {
  const {
    currentPage,
    setCurrentPage,
    unreadMessages
  } = useApp();

  const navItems = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'search', icon: 'fa-magnifying-glass', label: 'Search' },
    { id: 'create', icon: 'fa-plus', label: 'Create', special: true },
    { id: 'messages', icon: 'fa-comment', label: 'Messages', badge: unreadMessages },
    { id: 'profile', icon: 'fa-user', label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''} ${item.special ? 'special' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            {item.badge > 0 && <span className="badge">{item.badge}</span>}
            <i className={`fas ${item.icon}`}></i>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
