import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Share2, X } from 'lucide-react';
import Masonry from 'react-masonry-css';

interface Wallpaper {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
}

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({ wallpapers }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto"
        columnClassName="bg-clip-padding px-2"
      >
        {wallpapers.map((wallpaper) => (
          <motion.div
            key={wallpaper.id}
            className="relative group overflow-hidden rounded-lg shadow-lg mb-4 cursor-pointer"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedWallpaper(wallpaper)}
          >
            <img
              src={wallpaper.urls.regular}
              alt={wallpaper.alt_description}
              className="w-full object-cover"
              loading="lazy"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white">
                <p className="font-bold">{wallpaper.user.name}</p>
                <p className="text-sm">@{wallpaper.user.username}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(wallpaper.urls.full, `wallpaper-${wallpaper.id}.jpg`);
                  }}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </Masonry>

      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedWallpaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedWallpaper.urls.regular}
                  alt={selectedWallpaper.alt_description}
                  className="w-full h-auto"
                />
                <button
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full"
                  onClick={() => setSelectedWallpaper(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{selectedWallpaper.user.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">@{selectedWallpaper.user.username}</p>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(selectedWallpaper.urls.full, `wallpaper-${selectedWallpaper.id}.jpg`)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    Add to Favorites
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WallpaperGrid;