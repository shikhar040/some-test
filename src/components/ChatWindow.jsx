import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import './ChatWindow.css';

const ChatWindow = ({ contact, onClose }) => {
  const { conversations, sendMessage, userProfile } = useApp();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const commonEmojis = ['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😢', '😭', '😡', '👍', '👎', '❤️', '🔥', '✨', '🎉'];

  const conversation = conversations[contact.id] || [];

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(contact.id, messageText);
      setMessageText('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageText(messageText + emoji);
    inputRef.current?.focus();
  };

  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file attachment - for now just show filename
      setMessageText(messageText + ` 📎 ${file.name}`);
    }
  };

  const getMessageStatus = (msg) => {
    // Own messages: 🙁 (sent), 😐 (received), 🙂 (delivered)
    if (!msg.isOwn) return null;
    return msg.status || 'delivered'; // default to delivered
  };

  const getStatusEmoji = (status) => {
    switch(status) {
      case 'sent':
        return '🙁';
      case 'received':
        return '😐';
      case 'delivered':
        return '🙂';
      default:
        return '🙂';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const groupMessages = () => {
    const grouped = [];
    let currentGroup = null;

    conversation.forEach((msg, index) => {
      if (index === 0 || msg.sender !== conversation[index - 1].sender) {
        if (currentGroup) grouped.push(currentGroup);
        currentGroup = {
          sender: msg.sender,
          isOwn: msg.isOwn,
          messages: [msg]
        };
      } else {
        currentGroup.messages.push(msg);
      }
    });

    if (currentGroup) grouped.push(currentGroup);
    return grouped;
  };

  const messageGroups = groupMessages();

  return (
    <div className="chat-window-overlay" onClick={onClose}>
      <div className="chat-window glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-contact-info">
            <button className="btn-back" onClick={onClose}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <img src={contact.avatar} alt={contact.user} className="chat-contact-avatar" />
            <div className="chat-contact-details">
              <h3 className="chat-contact-name">{contact.user}</h3>
              <span className="chat-status">Active now</span>
            </div>
          </div>
          <div className="chat-actions">
            <button className="btn-icon">
              <i className="fas fa-phone"></i>
            </button>
            <button className="btn-icon">
              <i className="fas fa-video"></i>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {conversation.length === 0 ? (
            <div className="chat-empty">
              <div className="empty-icon">
                <i className="fas fa-comments"></i>
              </div>
              <p>Start a conversation with {contact.user}</p>
            </div>
          ) : (
            <>
              {messageGroups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className={`message-group ${group.isOwn ? 'own' : 'other'}`}
                >
                  {!group.isOwn && (
                    <img
                      src={contact.avatar}
                      alt={contact.user}
                      className="message-avatar"
                    />
                  )}
                  <div className="message-bubbles">
                    {group.messages.map((msg, msgIndex) => (
                      <div key={msg.id} className="message-bubble">
                        <p className="message-text">{msg.text}</p>
                        {msgIndex === group.messages.length - 1 && (
                          <div className="message-footer">
                            <span className="message-time">{formatTime(msg.timestamp)}</span>
                            {getMessageStatus(msg) && (
                              <span className="message-status" title={getMessageStatus(msg)}>
                                {getStatusEmoji(getMessageStatus(msg))}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {group.isOwn && (
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="message-avatar"
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input-container">
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/*,video/*,application/pdf"
          />
          <div className="chat-input-wrapper">
            <button 
              type="button" 
              className="btn-icon-inline"
              onClick={handleAttachment}
              title="Attach file"
            >
              <i className="fas fa-paperclip"></i>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button 
              type="button" 
              className="btn-emoji"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add emoji"
            >
              <i className="far fa-face-smile"></i>
            </button>
          </div>
          {showEmojiPicker && (
            <div className="emoji-picker">
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  className="emoji-btn"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="btn-send-message"
            disabled={!messageText.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
