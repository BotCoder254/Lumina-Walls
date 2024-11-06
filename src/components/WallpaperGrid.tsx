import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';
import { FiDownload, FiHeart, FiShare2, FiMaximize2, FiX, FiFolder } from 'react-icons/fi';
import { UNSPLASH_CONFIG, PHOTO_OPTIONS } from '../config/unsplash';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../App';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import WallpaperModal from './WallpaperModal';
import Toast from './Toast';
import { Wallpaper, Collection } from '../types';
import { COLLECTIONS } from '../config/unsplash';
import CollectionModal from './CollectionModal';

interface WallpaperGridProps {
  viewMode?: 'grid' | 'list';
  searchQuery?: string;
  category?: string;
  collections?: Collection[];
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({
  viewMode = 'grid',
  searchQuery = '',
  category = 'all',
  collections = []
}) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedWallpaperForCollection, setSelectedWallpaperForCollection] = useState<Wallpaper | null>(null);
  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  // Fetch user's favorites
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setFavorites(doc.data().favorites || []);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  // Fetch user's collections
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUserCollections(doc.data().collections || []);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleShare = async (wallpaper: Wallpaper) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this wallpaper!',
          text: `Wallpaper by ${wallpaper.user.name} on Lumina Walls`,
          url: wallpaper.urls.full
        });
        showToast('Wallpaper shared successfully!', 'success');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          showToast('Failed to share wallpaper', 'error');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(wallpaper.urls.full);
        showToast('Link copied to clipboard!', 'success');
      } catch (error) {
        showToast('Failed to copy link', 'error');
      }
    }
  };

  const handleLike = async (wallpaperId: string) => {
    if (!currentUser) {
      showToast('Please login to add to favorites', 'info');
      return;
    }
    
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      if (favorites.includes(wallpaperId)) {
        await updateDoc(userRef, {
          favorites: arrayRemove(wallpaperId)
        });
        showToast('Removed from favorites', 'info');
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(wallpaperId)
        });
        showToast('Added to favorites', 'success');
      }
    } catch (error) {
      showToast('Failed to update favorites', 'error');
    }
  };

  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      let endpoint = `${UNSPLASH_CONFIG.baseUrl}${UNSPLASH_CONFIG.endpoints.photos}`;
      let params = new URLSearchParams({
        page: page.toString(),
        per_page: PHOTO_OPTIONS.perPage.toString(),
        order_by: PHOTO_OPTIONS.orderBy
      });

      // Handle search and category filtering
      if (searchQuery) {
        endpoint = `${UNSPLASH_CONFIG.baseUrl}${UNSPLASH_CONFIG.endpoints.search}`;
        params.append('query', searchQuery);
      }

      if (category !== 'all') {
        params.append('collections', COLLECTIONS[category.toUpperCase()]);
      }

      const response = await fetch(
        `${endpoint}?${params.toString()}`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_CONFIG.accessKey}`
          }
        }
      );

      const data = await response.json();
      clearInterval(progressInterval);
      setLoadingProgress(100);

      const photos = searchQuery ? data.results : data;
      const newWallpapers = photos.map((photo: any) => ({
        id: photo.id,
        urls: {
          regular: photo.urls.regular,
          full: photo.urls.full,
          raw: photo.urls.raw
        },
        user: {
          name: photo.user.name,
          username: photo.user.username,
          profile_image: photo.user.profile_image.medium
        },
        likes: photo.likes,
        description: photo.description || photo.alt_description || 'Untitled'
      }));

      setWallpapers(prev => page === 1 ? newWallpapers : [...prev, ...newWallpapers]);
      setHasMore(newWallpapers.length === PHOTO_OPTIONS.perPage);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      showToast('Failed to load wallpapers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (wallpaper: Wallpaper) => {
    try {
      showToast('Starting download...', 'info');
      const response = await fetch(wallpaper.urls.full);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showToast('Download completed!', 'success');
    } catch (error) {
      showToast('Failed to download wallpaper', 'error');
    }
  };

  const handleAddToCollection = async (wallpaper: Wallpaper) => {
    if (!currentUser) {
      showToast('Please login to add to collections', 'info');
      return;
    }
    setSelectedWallpaperForCollection(wallpaper);
    setIsCollectionModalOpen(true);
  };

  useEffect(() => {
    fetchWallpapers();
  }, [page, searchQuery, category]);

  // Reset page when search or category changes
  useEffect(() => {
    setPage(1);
    setWallpapers([]);
  }, [searchQuery, category]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Update the grid layout based on viewMode
  const gridClassName = viewMode === 'grid' 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "flex flex-col gap-6";

  return (
    <div className="p-6">
      <div className={gridClassName}>
        {wallpapers.map((wallpaper, index) => (
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative group rounded-xl overflow-hidden bg-surface-light backdrop-blur-sm ${
              viewMode === 'list' ? 'flex gap-4' : ''
            }`}
          >
            <img
              src={wallpaper.urls.regular}
              alt={wallpaper.description}
              className={`${
                viewMode === 'grid' 
                  ? 'w-full h-64' 
                  : 'w-48 h-32'
              } object-cover transform group-hover:scale-105 transition-transform duration-300 cursor-pointer`}
              onClick={() => setSelectedWallpaper(wallpaper)}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent 
              opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium mb-2">{wallpaper.user.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-white transition-colors ${
                        favorites.includes(wallpaper.id) ? 'text-pink-500' : 'hover:text-pink-400'
                      }`}
                      onClick={() => handleLike(wallpaper.id)}
                    >
                      <FiHeart className="text-xl" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-primary-light transition-colors"
                      onClick={() => handleShare(wallpaper)}
                    >
                      <FiShare2 className="text-xl" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-primary-light transition-colors"
                      onClick={() => handleAddToCollection(wallpaper)}
                    >
                      <FiFolder className="text-xl" />
                    </motion.button>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-primary-light transition-colors"
                      onClick={() => setSelectedWallpaper(wallpaper)}
                    >
                      <FiMaximize2 className="text-xl" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-primary-light transition-colors"
                      onClick={() => handleDownload(wallpaper)}
                    >
                      <FiDownload className="text-xl" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-screen wallpaper view */}
      <AnimatePresence>
        {selectedWallpaper && (
          <WallpaperModal
            wallpaper={selectedWallpaper}
            onClose={() => setSelectedWallpaper(null)}
            onLike={handleLike}
            onShare={handleShare}
            onDownload={handleDownload}
            isFavorited={favorites.includes(selectedWallpaper.id)}
          />
        )}
      </AnimatePresence>

      {/* Load More button and loading spinner */}
      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            Load More
          </motion.button>
        </div>
      )}
      
      {loading && (
        <div className="mt-8">
          <LoadingSpinner progress={loadingProgress} />
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => {
          setIsCollectionModalOpen(false);
          setSelectedWallpaperForCollection(null);
        }}
        onSuccess={() => {
          showToast('Added to collection successfully!', 'success');
          setIsCollectionModalOpen(false);
          setSelectedWallpaperForCollection(null);
        }}
        wallpaper={selectedWallpaperForCollection}
        collections={userCollections}
      />
    </div>
  );
};

export default WallpaperGrid;






