import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ theme, setTheme }) {
  const location = useLocation();
  const [aiStatus, setAiStatus] = useState('connected');
  
  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/editor', label: '💻 Editor', icon: '💻' },
    { path: '/problems', label: '📚 Problems', icon: '📚' },
    { path: '/profile', label: '👤 Profile', icon: '👤' },
  ];
  
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">⟁</div>
          <div className="logo-text">
            <h1>CodeCompanionnnn AI</h1>
            <div className="logo-subtitle">Your Dynamic Coding Partner</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Right Actions */}
        <div className="header-actions">
          {/* AI Status */}
          <div className="ai-status">
            <div className={`status-dot ${aiStatus}`}></div>
            <span className="status-text">
              {aiStatus === 'connected' ? '🤖 AI Ready' : '🤖 Connecting...'}
            </span>
          </div>
          
          {/* Theme Toggle */}
          <button 
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          
          {/* Settings Link */}
          <Link to="/settings" className="settings-btn">
            ⚙️
          </Link>
        </div>
      </div>
    </header>
  );
}