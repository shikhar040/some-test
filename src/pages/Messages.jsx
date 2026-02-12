import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import ChatWindow from '../components/ChatWindow';
import './Messages.css';

const Messages = () => {
  const { messages, setIsChatOpen } = useApp();
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChatOpen = (message) => {
    setSelectedContact(message);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setSelectedContact(null);
    setIsChatOpen(false);
  };

  return (
    <div className="messages-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Messages</h1>
          <button className="btn-icon">
            <i className="fas fa-pen-to-square"></i>
          </button>
        </div>

        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search conversations..."
          />
        </div>

        <div className="messages-list">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className="message-item glass-card"
                onClick={() => handleChatOpen(message)}
              >
                <div className="message-avatar">
                  <img src={message.avatar} alt={message.user} />
                  {message.unread > 0 && (
                    <div className="badge">{message.unread}</div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <h4 className="message-user">{message.user}</h4>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p className={`message-preview ${message.unread > 0 ? 'unread' : ''}`}>
                    {message.lastMessage}
                  </p>
                </div>
                <button className="btn-icon">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>No messages yet</h3>
              <p>Start a conversation with someone from your network</p>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                <span>New Message</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedContact && (
        <ChatWindow contact={selectedContact} onClose={handleChatClose} />
      )}
    </div>
  );
};

export default Messages;
