import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const categories = [
    { name: 'Featured', icon: Sparkles },
    { name: 'Trending', icon: TrendingUp },
    { name: 'New', icon: Clock },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover Beautiful Wallpapers
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <category.icon className="w-8 h-8 text-indigo-600 mr-3" />
            <span className="text-xl font-semibold">{category.name}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="text-xl text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Explore our curated collection of stunning wallpapers for your devices
      </motion.p>
    </div>
  );
};

export default Home;