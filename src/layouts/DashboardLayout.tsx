import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors duration-300">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div className="flex-1 flex flex-col">
        <Header 
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
          user={currentUser}
        />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout; 