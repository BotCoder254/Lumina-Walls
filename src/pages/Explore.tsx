import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WallpaperGrid from '../components/WallpaperGrid';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const Explore: React.FC = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            count: 20,
            client_id: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your Unsplash API key
          },
        });
        setWallpapers(prevWallpapers => [...prevWallpapers, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && wallpapers.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Wallpapers
      </motion.h1>
      <WallpaperGrid wallpapers={wallpapers} />
      <div className="flex justify-center mt-8">
        <motion.button
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-200"
          onClick={loadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </motion.button>
      </div>
    </div>
  );
};

export default Explore;