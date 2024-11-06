import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import WallpaperGrid from '../components/WallpaperGrid';
import { useSearch } from '../contexts/SearchContext';
import { CATEGORIES } from '../config/unsplash';

const Explore = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-primary/10 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface pl-12 pr-12 py-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary border border-primary/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-gray-300 hover:bg-primary/10'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div className="py-6">
        <WallpaperGrid
          searchQuery={searchQuery}
          category={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Explore;


