import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiCamera, FiEdit2, FiImage, 
  FiHeart, FiFolder, FiTrash2, FiPlus 
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../App';
import { doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { gsap } from 'gsap';
import CollectionModal from '../components/CollectionModal';
import Toast from '../components/Toast';
import { Collection } from '../types';

interface UserStats {
  downloads: number;
  favorites: string[];
  collections: Collection[];
}

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [stats, setStats] = useState<UserStats>({
    downloads: 0,
    favorites: [],
    collections: []
  });
  const [loading, setLoading] = useState(true);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as const,
    isVisible: false
  });

  useEffect(() => {
    if (!currentUser) return;

    // Animate stats on mount
    const tl = gsap.timeline();
    tl.from('.stat-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.collections-grid', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });

    // Real-time user data subscription
    const userRef = doc(db, 'users', currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setStats({
          downloads: userData.downloads || 0,
          favorites: userData.favorites || [],
          collections: userData.collections || []
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName
      });
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    if (!currentUser) return;

    try {
      const collectionRef = doc(db, 'collections', collectionId);
      await deleteDoc(collectionRef);
      showToast('Collection deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete collection', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-8 backdrop-blur-sm shadow-xl"
      >
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiEdit2 />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </motion.button>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-4xl text-white" />
                )}
              </div>
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
                >
                  <FiCamera />
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">Email</label>
              <div className="flex items-center gap-2 text-white">
                <FiMail className="text-indigo-400" />
                <span>{currentUser?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">Display Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-indigo-900/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-white">
                  {displayName || 'No display name set'}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="stat-card bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          whileHover={{ y: -5 }}
        >
          <FiImage className="text-3xl text-blue-400 mb-2" />
          <h3 className="text-lg font-semibold text-white mb-1">Downloads</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.downloads}</p>
        </motion.div>

        <motion.div
          className="stat-card bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          whileHover={{ y: -5 }}
        >
          <FiHeart className="text-3xl text-pink-400 mb-2" />
          <h3 className="text-lg font-semibold text-white mb-1">Favorites</h3>
          <p className="text-3xl font-bold text-pink-400">{stats.favorites.length}</p>
        </motion.div>

        <motion.div
          className="stat-card bg-gradient-to-br from-indigo-900/50 to-violet-900/50 p-6 rounded-xl backdrop-blur-sm shadow-lg"
          whileHover={{ y: -5 }}
        >
          <FiFolder className="text-3xl text-violet-400 mb-2" />
          <h3 className="text-lg font-semibold text-white mb-1">Collections</h3>
          <p className="text-3xl font-bold text-violet-400">{stats.collections.length}</p>
        </motion.div>
      </div>

      {/* Collections Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Collections</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollectionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FiPlus />
            New Collection
          </motion.button>
        </div>

        <div className="collections-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.collections.map((collection) => (
            <motion.div
              key={collection.id}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FiFolder className="text-2xl text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">{collection.name}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteCollection(collection.id)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 />
                </motion.button>
              </div>
              {collection.description && (
                <p className="text-gray-400 mb-4">{collection.description}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{collection.wallpapers?.length || 0} wallpapers</span>
                <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collection Modal */}
      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        onSuccess={() => {
          showToast('Collection created successfully!', 'success');
          setIsCollectionModalOpen(false);
        }}
        collections={stats.collections}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default Profile;
