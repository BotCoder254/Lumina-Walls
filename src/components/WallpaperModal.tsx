import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiHeart, FiShare2, FiDownload, FiMaximize2 } from 'react-icons/fi';
import { Wallpaper } from '../types';

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
  onLike: (id: string) => Promise<void>;
  onShare: (wallpaper: Wallpaper) => Promise<void>;
  onDownload: (wallpaper: Wallpaper) => Promise<void>;
  isFavorited: boolean;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({
  wallpaper,
  onClose,
  onLike,
  onShare,
  onDownload,
  isFavorited
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-7xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
          onClick={onClose}
        >
          <FiX className="text-2xl" />
        </motion.button>

        {/* Image */}
        <img
          src={wallpaper.urls.full}
          alt={wallpaper.description}
          className="w-full h-auto rounded-lg shadow-2xl"
        />

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={wallpaper.user.profile_image}
                alt={wallpaper.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{wallpaper.user.name}</p>
                <p className="text-gray-300 text-sm">@{wallpaper.user.username}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full ${
                  isFavorited ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-300'
                }`}
                onClick={() => onLike(wallpaper.id)}
              >
                <FiHeart className="text-xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white"
                onClick={() => onShare(wallpaper)}
              >
                <FiShare2 className="text-xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
                onClick={() => onDownload(wallpaper)}
              >
                <FiDownload className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WallpaperModal; 