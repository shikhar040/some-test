import React from 'react';
import { useApp } from './contexts/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import CreatePost from './pages/CreatePost';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Search from './pages/Search';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  const { currentPage, isChatOpen } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'notifications':
        return <Notifications />;
      case 'create':
        return <CreatePost />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'userProfile':
        return <UserProfile />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content fade-in">
        {renderPage()}
      </main>
      {!isChatOpen && <BottomNav />}
    </div>
  );
}

export default App;
