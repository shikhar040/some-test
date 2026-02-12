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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState({});
  const [conversations, setConversations] = useState({});
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);
  const [viewingUserId, setViewingUserId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    id: 'user-1',
    name: 'Alex Morgan',
    title: 'Creative Designer & Developer',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=33',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
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

  // Helper function to generate sample posts
  const getSamplePosts = () => {
    return [
        {
          id: '1',
          author: 'Sarah Miller',
          authorId: 'user-2',
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
          authorId: 'user-3',
          avatar: 'https://i.pravatar.cc/150?img=12',
          time: '5h ago',
          content: 'Excited to announce that I\'ve completed my AWS Solutions Architect certification! 🎉 Hard work pays off. Looking forward to implementing cloud solutions at scale.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
          likes: 567,
          comments: 89,
          shares: 34,
          type: 'professional',
          liked: false
        },
        {
          id: '3',
          author: 'Emma Wilson',
          authorId: 'user-4',
          avatar: 'https://i.pravatar.cc/150?img=9',
          time: '8h ago',
          content: 'New design system is live! 🎨 Spent the last 3 months building this from scratch. Can\'t wait to see what amazing products we\'ll create with it.',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          likes: 456,
          comments: 67,
          shares: 23,
          type: 'professional',
          liked: false
        },
        {
          id: '4',
          author: 'James Brown',
          authorId: 'user-5',
          avatar: 'https://i.pravatar.cc/150?img=13',
          time: '12h ago',
          content: 'Friday vibes! 🎉 Team lunch at this amazing new restaurant downtown. Great food, even better company!',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
          likes: 321,
          comments: 34,
          shares: 8,
          type: 'social',
          liked: false
        },
        {
          id: '5',
          author: 'Lisa Anderson',
          authorId: 'user-6',
          avatar: 'https://i.pravatar.cc/150?img=20',
          time: '1d ago',
          content: 'Just published my latest research on machine learning optimization techniques. Link in the comments! 📊 #DataScience #ML',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          likes: 789,
          comments: 123,
          shares: 56,
          type: 'professional',
          liked: false
        },
        {
          id: '6',
          author: 'David Lee',
          authorId: 'user-7',
          avatar: 'https://i.pravatar.cc/150?img=15',
          time: '1d ago',
          content: 'Minimalism at its finest. Sometimes less really is more. 🎯',
          image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800',
          likes: 543,
          comments: 45,
          shares: 19,
          type: 'social',
          liked: false
        },
        {
          id: '7',
          author: 'Rachel Green',
          authorId: 'user-8',
          avatar: 'https://i.pravatar.cc/150?img=25',
          time: '2d ago',
          content: 'New blog post: "10 SEO Strategies That Actually Work in 2026" 📝 Check it out and let me know your thoughts!',
          likes: 432,
          comments: 78,
          shares: 45,
          type: 'professional',
          liked: false
        },
        {
          id: '8',
          author: 'Tom Harris',
          authorId: 'user-9',
          avatar: 'https://i.pravatar.cc/150?img=18',
          time: '2d ago',
          content: 'Successfully migrated our entire infrastructure to Kubernetes! 🚀 Zero downtime migration. Proud of the team!',
          image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
          likes: 678,
          comments: 91,
          shares: 34,
          type: 'professional',
          liked: false
        },
        {
          id: '9',
          author: 'Sophia Martinez',
          authorId: 'user-10',
          avatar: 'https://i.pravatar.cc/150?img=27',
          time: '3d ago',
          content: 'Weekend getaway to the beach! 🏖️ Perfect weather, perfect vibes. Sometimes you just need to recharge.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
          likes: 234,
          comments: 23,
          shares: 6,
          type: 'social',
          liked: false
        },
        {
          id: '10',
          author: 'Chris Taylor',
          authorId: 'user-11',
          avatar: 'https://i.pravatar.cc/150?img=52',
          time: '3d ago',
          content: 'Cybersecurity tip of the day: Always use 2FA! 🔐 Your future self will thank you. #CyberSecurity #InfoSec',
          likes: 567,
          comments: 89,
          shares: 67,
          type: 'professional',
          liked: false
        },
        {
          id: '11',
          author: 'Sarah Miller',
          authorId: 'user-2',
          avatar: 'https://i.pravatar.cc/150?img=5',
          time: '4d ago',
          content: 'Morning coffee and brainstorming sessions are the best combo! ☕✨ Ready to tackle this new campaign.',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
          likes: 412,
          comments: 56,
          shares: 15,
          type: 'social',
          liked: false
        },
        {
          id: '12',
          author: 'Michael Chen',
          authorId: 'user-3',
          avatar: 'https://i.pravatar.cc/150?img=12',
          time: '4d ago',
          content: 'Code review best practices: Always be constructive, focus on the code not the person, and celebrate good solutions! 💻',
          likes: 823,
          comments: 134,
          shares: 89,
          type: 'professional',
          liked: false
        },
        {
          id: '13',
          author: 'Emma Wilson',
          authorId: 'user-4',
          avatar: 'https://i.pravatar.cc/150?img=9',
          time: '5d ago',
          content: 'Sunset views from my balcony never get old 🌅 Grateful for moments like these.',
          image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800',
          likes: 678,
          comments: 45,
          shares: 21,
          type: 'social',
          liked: false
        },
        {
          id: '14',
          author: 'David Lee',
          authorId: 'user-7',
          avatar: 'https://i.pravatar.cc/150?img=15',
          time: '5d ago',
          content: 'Just wrapped up a logo design for an amazing startup. The creative process is always rewarding! 🎨',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
          likes: 891,
          comments: 102,
          shares: 43,
          type: 'professional',
          liked: false
        },
        {
          id: '15',
          author: 'Rachel Green',
          authorId: 'user-8',
          avatar: 'https://i.pravatar.cc/150?img=25',
          time: '6d ago',
          content: 'Exploring the streets of New York. The city that never sleeps continues to inspire! 🗽',
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
          likes: 534,
          comments: 67,
          shares: 28,
          type: 'social',
          liked: false
        }
      ];
  };

  // Helper function to generate sample stories
  const getSampleStories = () => {
    return [
        { 
          id: 1, 
          user: 'Your Story', 
          avatar: 'https://i.pravatar.cc/150?img=33', 
          isYou: true,
          media: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
          timestamp: new Date().toISOString(),
          viewed: false
        },
        { 
          id: 2, 
          user: 'Sarah Miller', 
          avatar: 'https://i.pravatar.cc/150?img=5',
          media: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          viewed: false
        },
        { 
          id: 3, 
          user: 'Michael Chen', 
          avatar: 'https://i.pravatar.cc/150?img=12',
          media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          viewed: false
        },
        { 
          id: 4, 
          user: 'Emma Wilson', 
          avatar: 'https://i.pravatar.cc/150?img=9',
          media: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          viewed: false
        },
        { 
          id: 5, 
          user: 'James Brown', 
          avatar: 'https://i.pravatar.cc/150?img=13',
          media: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          viewed: false
        },
        { 
          id: 6, 
          user: 'Lisa Anderson', 
          avatar: 'https://i.pravatar.cc/150?img=20',
          media: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800',
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          viewed: false
        },
        { 
          id: 7, 
          user: 'David Lee', 
          avatar: 'https://i.pravatar.cc/150?img=15',
          media: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
          timestamp: new Date(Date.now() - 21600000).toISOString(),
          viewed: false
        },
        { 
          id: 8, 
          user: 'Rachel Green', 
          avatar: 'https://i.pravatar.cc/150?img=25',
          media: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
          timestamp: new Date(Date.now() - 25200000).toISOString(),
          viewed: false
        },
        { 
          id: 9, 
          user: 'Tom Harris', 
          avatar: 'https://i.pravatar.cc/150?img=18',
          media: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          timestamp: new Date(Date.now() - 28800000).toISOString(),
          viewed: false
        },
        { 
          id: 10, 
          user: 'Sophia Martinez', 
          avatar: 'https://i.pravatar.cc/150?img=27',
          media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          timestamp: new Date(Date.now() - 32400000).toISOString(),
          viewed: false
        }
      ];
  };

  useEffect(() => {
    const savedPosts = localStorage.getItem('userPosts');
    const savedSettings = localStorage.getItem('userSettings');
    const savedProfile = localStorage.getItem('userProfile');
    const savedComments = localStorage.getItem('postComments');
    const savedConversations = localStorage.getItem('conversations');
    const savedStories = localStorage.getItem('stories');

    // Check if saved posts exist and are not empty
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      if (parsedPosts && parsedPosts.length > 0) {
        setPosts(parsedPosts);
      } else {
        // If saved posts are empty, load dummy data
        setPosts(getSamplePosts());
      }
    } else {
      setPosts(getSamplePosts());
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }

    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      if (parsedConversations && Object.keys(parsedConversations).length > 0) {
        setConversations(parsedConversations);
      } else {
        // If saved conversations are empty, load dummy data
        setConversations(getDummyConversations());
      }
    } else {
      setConversations(getDummyConversations());
    }

    function getDummyConversations() {
      return {
        '1': [
          {
            id: '1-1',
            text: 'Hey! Did you see the new project requirements?',
            sender: 'Sarah Miller',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            isOwn: false
          },
          {
            id: '1-2',
            text: 'Yes! Just reviewed them. Looking pretty comprehensive.',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 7000000).toISOString(),
            isOwn: true,
            status: 'delivered'
          },
          {
            id: '1-3',
            text: 'Do you think we can deliver by next Friday?',
            sender: 'Sarah Miller',
            timestamp: new Date(Date.now() - 6800000).toISOString(),
            isOwn: false
          },
          {
            id: '1-4',
            text: 'It\'ll be tight, but I think we can make it if we prioritize the core features first',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 6600000).toISOString(),
            isOwn: true,
            status: 'received'
          },
          {
            id: '1-5',
            text: 'Perfect! Let\'s catch up tomorrow to finalize the timeline',
            sender: 'Sarah Miller',
            timestamp: new Date(Date.now() - 6400000).toISOString(),
            isOwn: false
          },
          {
            id: '1-6',
            text: 'Sounds good! I\'ll prepare a draft schedule tonight',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 6200000).toISOString(),
            isOwn: true,
            status: 'sent'
          },
          {
            id: '1-7',
            text: 'Great! Also, can you share those design mockups you mentioned?',
            sender: 'Sarah Miller',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            isOwn: false
          }
        ],
        '2': [
          {
            id: '2-1',
            text: 'Thanks for the feedback on the design!',
            sender: 'Michael Chen',
            timestamp: new Date(Date.now() - 14400000).toISOString(),
            isOwn: false
          },
          {
            id: '2-2',
            text: 'Of course! The new interface looks amazing 🎨',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 14200000).toISOString(),
            isOwn: true,
            status: 'delivered'
          },
          {
            id: '2-3',
            text: 'I made some tweaks based on your suggestions',
            sender: 'Michael Chen',
            timestamp: new Date(Date.now() - 14000000).toISOString(),
            isOwn: false
          },
          {
            id: '2-4',
            text: 'The color palette really works well now',
            sender: 'Michael Chen',
            timestamp: new Date(Date.now() - 13800000).toISOString(),
            isOwn: false
          },
          {
            id: '2-5',
            text: 'Can\'t wait to see the final version! When can you share it?',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            isOwn: true,
            status: 'received'
          },
          {
            id: '2-6',
            text: 'I\'ll have it ready by end of day tomorrow',
            sender: 'Michael Chen',
            timestamp: new Date(Date.now() - 7000000).toISOString(),
            isOwn: false
          }
        ],
        '3': [
          {
            id: '3-1',
            text: 'Hey! How did the user testing session go?',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 21600000).toISOString(),
            isOwn: true,
            status: 'delivered'
          },
          {
            id: '3-2',
            text: 'The user testing went really well!',
            sender: 'Emma Wilson',
            timestamp: new Date(Date.now() - 21400000).toISOString(),
            isOwn: false
          },
          {
            id: '3-3',
            text: 'Users loved the new navigation flow',
            sender: 'Emma Wilson',
            timestamp: new Date(Date.now() - 21200000).toISOString(),
            isOwn: false
          },
          {
            id: '3-4',
            text: 'That\'s fantastic news! Any pain points we should address?',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 21000000).toISOString(),
            isOwn: true,
            status: 'sent'
          },
          {
            id: '3-5',
            text: 'Just a few minor issues with the search functionality',
            sender: 'Emma Wilson',
            timestamp: new Date(Date.now() - 20800000).toISOString(),
            isOwn: false
          }
        ],
        '4': [
          {
            id: '4-1',
            text: 'Thanks for connecting! Would love to discuss potential collaboration',
            sender: 'James Brown',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            isOwn: false
          },
          {
            id: '4-2',
            text: 'Absolutely! I\'m interested in hearing more about your product vision',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 86200000).toISOString(),
            isOwn: true,
            status: 'delivered'
          },
          {
            id: '4-3',
            text: 'Great! Let\'s schedule a call for Monday',
            sender: 'James Brown',
            timestamp: new Date(Date.now() - 86000000).toISOString(),
            isOwn: false
          }
        ],
        '5': [
          {
            id: '5-1',
            text: 'I sent you the analytics report',
            sender: 'Lisa Anderson',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            isOwn: false
          },
          {
            id: '5-2',
            text: 'Perfect! I\'ll review it this afternoon',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 172600000).toISOString(),
            isOwn: true,
            status: 'received'
          },
          {
            id: '5-3',
            text: 'The engagement metrics are looking really strong',
            sender: 'Lisa Anderson',
            timestamp: new Date(Date.now() - 172400000).toISOString(),
            isOwn: false
          },
          {
            id: '5-4',
            text: 'That\'s great to hear! Especially the conversion rate improvement',
            sender: 'Alex Morgan',
            timestamp: new Date(Date.now() - 172200000).toISOString(),
            isOwn: true,
            status: 'delivered'
          }
        ]
      };
    }

    // Check if saved stories exist and are not empty
    if (savedStories) {
      const parsedStories = JSON.parse(savedStories);
      if (parsedStories && parsedStories.length > 0) {
        setStories(parsedStories);
      } else {
        // If saved stories are empty, load dummy data
        setStories(getSampleStories());
      }
    } else {
      setStories(getSampleStories());
    }

    // Initialize dummy users
    const dummyUsers = [
      {
        id: 'user-2',
        name: 'Sarah Miller',
        title: 'Marketing Director',
        location: 'Los Angeles, CA',
        avatar: 'https://i.pravatar.cc/150?img=5',
        coverImage: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200',
        bio: 'Digital marketing strategist | Content creator | Coffee enthusiast ☕',
        posts: 24,
        followers: 3456,
        following: 892,
        isFollowing: false
      },
      {
        id: 'user-3',
        name: 'Michael Chen',
        title: 'Software Engineer',
        location: 'Seattle, WA',
        avatar: 'https://i.pravatar.cc/150?img=12',
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
        bio: 'Full-stack developer | Cloud enthusiast | Tech blogger',
        posts: 45,
        followers: 5678,
        following: 1234,
        isFollowing: false
      },
      {
        id: 'user-4',
        name: 'Emma Wilson',
        title: 'UX Designer',
        location: 'Austin, TX',
        avatar: 'https://i.pravatar.cc/150?img=9',
        coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200',
        bio: 'Creating delightful user experiences | Design systems advocate',
        posts: 32,
        followers: 2890,
        following: 654,
        isFollowing: false
      },
      {
        id: 'user-5',
        name: 'James Brown',
        title: 'Product Manager',
        location: 'Boston, MA',
        avatar: 'https://i.pravatar.cc/150?img=13',
        coverImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200',
        bio: 'Building products people love | Ex-Google | Stanford MBA',
        posts: 18,
        followers: 4321,
        following: 789,
        isFollowing: false
      },
      {
        id: 'user-6',
        name: 'Lisa Anderson',
        title: 'Data Scientist',
        location: 'Chicago, IL',
        avatar: 'https://i.pravatar.cc/150?img=20',
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
        bio: 'ML & AI enthusiast | Python lover | Making data beautiful',
        posts: 56,
        followers: 6543,
        following: 1876,
        isFollowing: false
      },
      {
        id: 'user-7',
        name: 'David Lee',
        title: 'Graphic Designer',
        location: 'Portland, OR',
        avatar: 'https://i.pravatar.cc/150?img=15',
        coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
        bio: 'Visual storyteller | Brand identity specialist | Minimalism advocate',
        posts: 67,
        followers: 4567,
        following: 987,
        isFollowing: false
      },
      {
        id: 'user-8',
        name: 'Rachel Green',
        title: 'Content Writer',
        location: 'New York, NY',
        avatar: 'https://i.pravatar.cc/150?img=25',
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
        bio: 'Wordsmith | SEO specialist | Travel blogger ✈️',
        posts: 89,
        followers: 7890,
        following: 2345,
        isFollowing: false
      },
      {
        id: 'user-9',
        name: 'Tom Harris',
        title: 'DevOps Engineer',
        location: 'Denver, CO',
        avatar: 'https://i.pravatar.cc/150?img=18',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
        bio: 'Infrastructure automation | Kubernetes enthusiast | Open source contributor',
        posts: 41,
        followers: 3210,
        following: 876,
        isFollowing: false
      },
      {
        id: 'user-10',
        name: 'Sophia Martinez',
        title: 'Business Analyst',
        location: 'Miami, FL',
        avatar: 'https://i.pravatar.cc/150?img=27',
        coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
        bio: 'Analytics expert | Data-driven decisions | MBA candidate',
        posts: 29,
        followers: 2345,
        following: 543,
        isFollowing: false
      },
      {
        id: 'user-11',
        name: 'Chris Taylor',
        title: 'Cybersecurity Specialist',
        location: 'Washington, DC',
        avatar: 'https://i.pravatar.cc/150?img=52',
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
        bio: 'Protecting digital assets | Ethical hacker | Security researcher',
        posts: 33,
        followers: 4890,
        following: 1234,
        isFollowing: false
      }
    ];
    setUsers(dummyUsers);

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
        lastMessage: 'Great! Also, can you share those design mockups you mentioned?',
        time: '10m ago',
        unread: 1
      },
      {
        id: '2',
        user: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        lastMessage: 'I\'ll have it ready by end of day tomorrow',
        time: '2h ago',
        unread: 0
      },
      {
        id: '3',
        user: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=9',
        lastMessage: 'The user testing went really well!',
        time: '5h ago',
        unread: 2
      },
      {
        id: '4',
        user: 'James Brown',
        avatar: 'https://i.pravatar.cc/150?img=13',
        lastMessage: 'Let\'s schedule a call for Monday',
        time: '1d ago',
        unread: 0
      },
      {
        id: '5',
        user: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=20',
        lastMessage: 'I sent you the analytics report',
        time: '2d ago',
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

  useEffect(() => {
    localStorage.setItem('postComments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      author: userProfile.name,
      authorId: userProfile.id,
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

  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now().toString(),
      author: userProfile.name,
      avatar: userProfile.avatar,
      text: commentText,
      time: new Date().toISOString()
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    // Update comment count in post
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const deleteComment = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || []).filter(c => c.id !== commentId)
    }));

    // Update comment count in post
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: Math.max(0, post.comments - 1) }
        : post
    ));
  };

  const sendMessage = (userId, messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: userProfile.name,
      timestamp: new Date().toISOString(),
      isOwn: true,
      status: 'delivered'
    };

    setConversations(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage]
    }));

    // Update the last message in messages list
    setMessages(messages.map(msg => 
      msg.id === userId
        ? { ...msg, lastMessage: messageText, time: 'Just now', unread: 0 }
        : msg
    ));
  };

  const viewStory = (storyId) => {
    setStories(stories.map(story =>
      story.id === storyId ? { ...story, viewed: true } : story
    ));
  };

  const addStory = (mediaUrl) => {
    const newStory = {
      id: Date.now(),
      user: 'Your Story',
      avatar: userProfile.avatar,
      isYou: true,
      media: mediaUrl,
      timestamp: new Date().toISOString(),
      viewed: false
    };

    setStories([newStory, ...stories.filter(s => !s.isYou)]);
  };

  const viewUserProfile = (userId) => {
    setViewingUserId(userId);
    setCurrentPage('userProfile');
  };

  const getViewingUser = () => {
    if (!viewingUserId) return null;
    return users.find(u => u.id === viewingUserId);
  };

  const followUser = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          isFollowing: !user.isFollowing,
          followers: user.isFollowing ? user.followers - 1 : user.followers + 1
        };
      }
      return user;
    }));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.reduce((sum, msg) => sum + msg.unread, 0);

  const value = {
    currentPage,
    setCurrentPage,
    currentMode,
    setCurrentMode,
    isChatOpen,
    setIsChatOpen,
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
    updateSettings,
    comments,
    addComment,
    deleteComment,
    conversations,
    sendMessage,
    stories,
    viewStory,
    addStory,
    users,
    viewUserProfile,
    viewingUserId,
    getViewingUser,
    followUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
