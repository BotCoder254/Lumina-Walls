import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFolderPlus, FiSave, FiPlus } from 'react-icons/fi';
import { createCollection, addToCollection } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import Toast from './Toast';
import { Collection, Wallpaper } from '../types';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  wallpaper?: Wallpaper | null;
  collections: Collection[];
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  wallpaper,
  collections
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { currentUser } = useAuth();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      const collectionId = await createCollection(currentUser.uid, name, description);
      
      if (wallpaper) {
        await addToCollection(currentUser.uid, collectionId, wallpaper.id);
      }
      
      showToast('Collection created successfully!', 'success');
      onSuccess?.();
      setName('');
      setDescription('');
      setIsCreating(false);
    } catch (error) {
      showToast('Failed to create collection', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async (collectionId: string) => {
    if (!currentUser || !wallpaper) return;

    try {
      setLoading(true);
      await addToCollection(currentUser.uid, collectionId, wallpaper.id);
      showToast('Added to collection successfully!', 'success');
      onSuccess?.();
      setTimeout(onClose, 1500);
    } catch (error) {
      showToast('Failed to add to collection', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>

            {isCreating ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FiFolderPlus />
                    New Collection
                  </h2>
                </div>

                <form onSubmit={handleCreateCollection} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Collection Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="My Awesome Collection"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Describe your collection..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <FiSave />
                      {loading ? 'Creating...' : 'Create'}
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Add to Collection
                  </h2>
                </div>

                <div className="space-y-4">
                  {collections.map((collection) => (
                    <motion.button
                      key={collection.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCollection(collection.id)}
                      disabled={loading}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg text-left transition-colors"
                    >
                      <h3 className="font-semibold">{collection.name}</h3>
                      {collection.description && (
                        <p className="text-sm text-gray-400 mt-1">
                          {collection.description}
                        </p>
                      )}
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCreating(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <FiPlus />
                    Create New Collection
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </AnimatePresence>
  );
};

export default CollectionModal; 