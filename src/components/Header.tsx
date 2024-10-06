import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image, Search, Bell, User, Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="mr-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
          <Link to="/home" className="flex items-center space-x-2">
            <Image className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Lumina Walls</span>
          </Link>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <motion.div
            className="relative"
            animate={{ width: isSearchFocused ? '100%' : '80%' }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search wallpapers..."
              className="w-full px-4 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </motion.div>
        </div>
        <nav className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Bell className="w-6 h-6" />
          </motion.button>
          {user ? (
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-5 h-5" />
                )}
              </motion.div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <User className="w-6 h-6" />
              </motion.button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;