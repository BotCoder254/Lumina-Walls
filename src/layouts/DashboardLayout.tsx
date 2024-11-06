import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <Sidebar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 relative"
      >
        <div className="absolute inset-0 overflow-y-auto">
          <div className="min-h-full p-4">
            <Outlet />
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout; 
