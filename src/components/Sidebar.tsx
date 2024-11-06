import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  CompassIcon,
  StarIcon,
  InfoIcon,
  UserIcon
} from '../icons';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { path: '/dashboard/home', icon: HomeIcon, label: 'Home' },
    { path: '/dashboard/explore', icon: CompassIcon, label: 'Explore' },
    { path: '/dashboard/favorites', icon: StarIcon, label: 'Favorites' },
    { path: '/dashboard/about', icon: InfoIcon, label: 'About' },
    { path: '/dashboard/profile', icon: UserIcon, label: 'Profile' },
  ];

  return (
    <aside 
      className={`
        bg-white dark:bg-gray-800 h-screen transition-all duration-300
        ${isExpanded ? 'w-64' : 'w-20'} flex flex-col justify-between
      `}
    >
      <div>
        <div className="p-4">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 w-auto mx-auto"
          />
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-3 rounded-lg mb-2
                ${isActive 
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              <item.icon className="w-6 h-6" />
              {isExpanded && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center p-2 rounded-lg 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ExpandIcon className={`w-6 h-6 transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
};

const ExpandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default Sidebar;