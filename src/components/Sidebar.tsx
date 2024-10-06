import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/favorites', icon: Heart, label: 'Favorites' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  return (
    <motion.nav
      className={`bg-white dark:bg-gray-800 h-screen sticky top-0 shadow-md transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
    >
      <div className="py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center p-3 ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'
              } hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200`
            }
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center"
            >
              <item.icon className="w-6 h-6 mr-4" />
              {isExpanded && <span>{item.label}</span>}
            </motion.div>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default Sidebar;