import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiFolder, FiDownload } from 'react-icons/fi';
import WallpaperGrid from '../components/WallpaperGrid';
import { gsap } from 'gsap';

const Favorites = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from('.stats-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FiHeart className="text-3xl text-pink-500" />
            <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="stats-card bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Total Favorites</p>
                  <h3 className="text-2xl font-bold text-white">247</h3>
                </div>
                <FiHeart className="text-2xl text-pink-500" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="stats-card bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Collections</p>
                  <h3 className="text-2xl font-bold text-white">12</h3>
                </div>
                <FiFolder className="text-2xl text-blue-500" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="stats-card bg-gradient-to-br from-purple-900/50 to-violet-900/50 p-6 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Downloads</p>
                  <h3 className="text-2xl font-bold text-white">89</h3>
                </div>
                <FiDownload className="text-2xl text-purple-500" />
              </div>
            </motion.div>
          </div>

          <WallpaperGrid />
        </motion.div>
      </div>
    </div>
  );
};

export default Favorites;
