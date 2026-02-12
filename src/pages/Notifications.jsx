import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import './Notifications.css';

const Notifications = () => {
  const { notifications, markNotificationAsRead } = useApp();

  useEffect(() => {
    notifications.forEach(notif => {
      if (!notif.read) {
        setTimeout(() => markNotificationAsRead(notif.id), 1000);
      }
    });
  }, [notifications, markNotificationAsRead]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { icon: 'fa-heart', color: 'social' };
      case 'comment':
        return { icon: 'fa-comment', color: 'primary' };
      case 'mention':
        return { icon: 'fa-at', color: 'professional' };
      case 'follow':
        return { icon: 'fa-user-plus', color: 'secondary' };
      default:
        return { icon: 'fa-bell', color: 'primary' };
    }
  };

  return (
    <div className="notifications-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Notifications</h1>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="unread-count">
              {notifications.filter(n => !n.read).length} new
            </span>
          )}
        </div>

        <div className="notifications-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const { icon, color } = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`notification-item glass-card ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-avatar">
                    <img src={notification.avatar} alt={notification.user} />
                    <div className={`notification-icon ${color}`}>
                      <i className={`fas ${icon}`}></i>
                    </div>
                  </div>
                  <div className="notification-content">
                    <p>
                      <strong>{notification.user}</strong> {notification.content}
                    </p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              );
            })
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <i className="fas fa-bell-slash"></i>
              </div>
              <h3>No notifications</h3>
              <p>You're all caught up! Check back later for new updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
