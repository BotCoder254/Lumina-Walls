import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiStar, FiClock, FiSearch } from 'react-icons/fi';
import WallpaperGrid from '../components/WallpaperGrid';
import { gsap } from 'gsap';

const Home = () => {
  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();
    tl.from('.welcome-text', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.search-bar', {
      width: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .from('.category-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="welcome-text text-4xl font-bold text-white mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Lumina Walls</span>
        </h1>

        {/* Search Bar */}
        <div className="search-bar relative mb-12">
          <input
            type="text"
            placeholder="Search wallpapers..."
            className="w-full bg-gray-800/50 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="category-card bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          >
            <div className="text-pink-500 text-2xl mb-3">
              <FiTrendingUp />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trending</h3>
            <p className="text-gray-300">Most popular wallpapers this week</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="category-card bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          >
            <div className="text-indigo-500 text-2xl mb-3">
              <FiStar />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Featured</h3>
            <p className="text-gray-300">Hand-picked by our curators</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="category-card bg-gradient-to-br from-violet-900/50 to-purple-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          >
            <div className="text-violet-500 text-2xl mb-3">
              <FiClock />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Recent</h3>
            <p className="text-gray-300">Latest additions to our collection</p>
          </motion.div>
        </div>

        {/* Recent Wallpapers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Wallpapers</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All
            </motion.button>
          </div>
          <WallpaperGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
