import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentMode, setCurrentMode] = useState('social');
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Morgan',
    title: 'Creative Designer & Developer',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Passionate about creating beautiful digital experiences',
    posts: 0,
    followers: 1234,
    following: 567
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    socialVisibility: 'public',
    professionalVisibility: 'public'
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem('userPosts');
    const savedSettings = localStorage.getItem('userSettings');
    const savedProfile = localStorage.getItem('userProfile');

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const samplePosts = [
        {
          id: '1',
          author: 'Sarah Miller',
          avatar: 'https://i.pravatar.cc/150?img=5',
          time: '2h ago',
          content: 'Just finished an amazing hike in the mountains! 🏔️ The view was absolutely breathtaking. Nothing beats disconnecting and reconnecting with nature.',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          likes: 234,
          comments: 45,
          shares: 12,
          type: 'social',
          liked: false
        },
        {
          id: '2',
          author: 'Michael Chen',
          avatar: 'https://i.pravatar.cc/150?img=12',
          time: '5h ago',
          content: 'Excited to announce that I\'ve completed my AWS Solutions Architect certification! 🎉 Hard work pays off. Looking forward to implementing cloud solutions at scale.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
          likes: 567,
          comments: 89,
          shares: 34,
          type: 'professional',
          liked: false
        }
      ];
      setPosts(samplePosts);
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    const sampleNotifications = [
      {
        id: '1',
        type: 'like',
        user: 'Sarah Miller',
        avatar: 'https://i.pravatar.cc/150?img=5',
        content: 'liked your post',
        time: '5m ago',
        read: false
      },
      {
        id: '2',
        type: 'comment',
        user: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        content: 'commented on your post',
        time: '1h ago',
        read: false
      },
      {
        id: '3',
        type: 'mention',
        user: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=9',
        content: 'mentioned you in a post',
        time: '3h ago',
        read: false
      }
    ];
    setNotifications(sampleNotifications);

    const sampleMessages = [
      {
        id: '1',
        user: 'Sarah Miller',
        avatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'Hey! Did you see the new project requirements?',
        time: '10m ago',
        unread: 2
      },
      {
        id: '2',
        user: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        lastMessage: 'Thanks for the feedback on the design!',
        time: '2h ago',
        unread: 0
      }
    ];
    setMessages(sampleMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('userPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      author: userProfile.name,
      avatar: userProfile.avatar,
      time: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    };
    setPosts([newPost, ...posts]);
    setUserProfile(prev => ({ ...prev, posts: prev.posts + 1 }));
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    setUserProfile(prev => ({ ...prev, posts: Math.max(0, prev.posts - 1) }));
  };

  const updateProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.reduce((sum, msg) => sum + msg.unread, 0);

  const value = {
    currentPage,
    setCurrentPage,
    currentMode,
    setCurrentMode,
    posts,
    addPost,
    toggleLike,
    deletePost,
    notifications,
    markNotificationAsRead,
    unreadNotifications,
    messages,
    unreadMessages,
    userProfile,
    updateProfile,
    settings,
    updateSettings
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
