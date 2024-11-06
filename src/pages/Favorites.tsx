import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiImage } from 'react-icons/fi';
import Masonry from 'react-masonry-css';
import { useAuth } from '../contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../App';
import { Wallpaper } from '../types';
import { UNSPLASH_CONFIG } from '../config/unsplash';
import WallpaperGrid from '../components/WallpaperGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteWallpapers, setFavoriteWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites
  useEffect(() => {
    if (!currentUser) return;

    const userRef = doc(db, 'users', currentUser.uid);
    const unsubscribe = onSnapshot(userRef, async (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        const favIds = userData.favorites || [];
        setFavorites(favIds);
        
        // Fetch wallpaper details for each favorite
        if (favIds.length > 0) {
          try {
            const wallpaperPromises = favIds.map(async (id: string) => {
              const response = await fetch(
                `${UNSPLASH_CONFIG.baseUrl}/photos/${id}`,
                {
                  headers: {
                    'Authorization': `Client-ID ${UNSPLASH_CONFIG.accessKey}`
                  }
                }
              );
              const data = await response.json();
              return {
                id: data.id,
                urls: {
                  regular: data.urls.regular,
                  full: data.urls.full,
                  raw: data.urls.raw
                },
                user: {
                  name: data.user.name,
                  username: data.user.username,
                  profile_image: data.user.profile_image.medium
                },
                likes: data.likes,
                description: data.description || data.alt_description || 'Untitled'
              };
            });

            const wallpapers = await Promise.all(wallpaperPromises);
            setFavoriteWallpapers(wallpapers);
          } catch (error) {
            console.error('Error fetching favorite wallpapers:', error);
          }
        } else {
          setFavoriteWallpapers([]);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <FiHeart className="text-6xl text-primary mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
        <p className="text-gray-400 text-center max-w-md">
          Start exploring and add some wallpapers to your favorites collection.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <FiHeart className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
        </div>

        {/* Pass the favoriteWallpapers to WallpaperGrid */}
        <WallpaperGrid 
          initialWallpapers={favoriteWallpapers}
          disableInfiniteScroll
        />
      </div>
    </div>
  );
};

export default Favorites;
