import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Favorites: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Favorite Wallpapers
      </motion.h1>
      <motion.div
        className="bg-white rounded-lg shadow-md p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Heart className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <p className="text-xl mb-4">Your favorite wallpapers will appear here once you've added some.</p>
        <motion.button
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Wallpapers
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Favorites;