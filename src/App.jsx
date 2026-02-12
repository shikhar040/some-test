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
import './App.css';

function App() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'notifications':
        return <Notifications />;
      case 'create':
        return <CreatePost />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
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
      <BottomNav />
    </div>
  );
}

export default App;
