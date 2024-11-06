import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiHome, 
  FiCompass, 
  FiHeart, 
  FiInfo, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX 
} from 'react-icons/fi';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { path: 'home', icon: <FiHome />, label: 'Home' },
    { path: 'explore', icon: <FiCompass />, label: 'Explore' },
    { path: 'favorites', icon: <FiHeart />, label: 'Favorites' },
    { path: 'about', icon: <FiInfo />, label: 'About' },
    { path: 'profile', icon: <FiUser />, label: 'Profile' },
  ];

  return (
    <motion.div 
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="h-screen bg-background-light backdrop-blur-lg text-white flex flex-col sticky top-0 left-0 z-40 shadow-xl"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!isCollapsed && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-primary-light to-primary text-transparent bg-clip-text"
          >
            Lumina Walls
          </motion.h1>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isCollapsed ? <FiMenu /> : <FiX />}
        </motion.button>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'hover:bg-surface-light text-gray-300'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      <motion.button
        whileHover={{ scale: isCollapsed ? 1.1 : 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="m-4 p-3 flex items-center text-white/60 hover:bg-surface-light rounded-lg transition-colors"
      >
        <FiLogOut className="text-xl" />
        {!isCollapsed && <span className="ml-3">Logout</span>}
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;


