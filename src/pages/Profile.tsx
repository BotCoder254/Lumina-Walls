import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { 

  FiUser, FiImage, FiHeart, FiFolder, 

  FiEdit2, FiPlus, FiGrid, FiList 

} from 'react-icons/fi';

import { useAuth } from '../contexts/AuthContext';

import { db } from '../App';

import { doc, onSnapshot } from 'firebase/firestore';

import Masonry from 'react-masonry-css';

import CollectionModal from '../components/CollectionModal';

import Toast from '../components/Toast';

import { Collection } from '../types';

import { ToastState, ToastType } from '../types/toast';



const Profile = () => {

  const { currentUser } = useAuth();

  const [userStats, setUserStats] = useState({

    downloads: 0,

    favorites: [],

    collections: [] as Collection[]

  });

  const [activeTab, setActiveTab] = useState<'collections' | 'favorites'>('collections');

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({

    message: '',

    type: 'info',

    isVisible: false

  });



  // Masonry breakpoints

  const breakpointColumns = {

    default: 4,

    1280: 3,

    1024: 2,

    640: 1

  };



  useEffect(() => {

    if (!currentUser) return;



    const userRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(userRef, (doc) => {

      if (doc.exists()) {

        const userData = doc.data();

        setUserStats({

          downloads: userData.downloads || 0,

          favorites: userData.favorites || [],

          collections: userData.collections || []

        });

      }

    });



    return () => unsubscribe();

  }, [currentUser]);



  const showToast = (message: string, type: ToastType) => {

    setToast({ message, type, isVisible: true });

    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);

  };



  return (

    <div className="min-h-screen bg-background">

      {/* Profile Header */}

      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-primary/10">

        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex items-center gap-6">

            <div className="relative">

              {currentUser?.photoURL ? (

                <img

                  src={currentUser.photoURL}

                  alt="Profile"

                  className="w-20 h-20 rounded-full object-cover"

                />

              ) : (

                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">

                  <FiUser className="text-3xl text-primary" />

                </div>

              )}

              <motion.button

                whileHover={{ scale: 1.1 }}

                whileTap={{ scale: 0.9 }}

                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white"

              >

                <FiEdit2 className="text-sm" />

              </motion.button>

            </div>

            

            <div className="flex-1">

              <h1 className="text-2xl font-bold text-white mb-2">

                {currentUser?.displayName || 'User'}

              </h1>

              <div className="flex gap-6 text-gray-400">

                <span>{userStats.collections.length} Collections</span>

                <span>{userStats.favorites.length} Favorites</span>

                <span>{userStats.downloads} Downloads</span>

              </div>

            </div>

          </div>



          {/* Tabs */}

          <div className="flex gap-6 mt-6">

            <button

              onClick={() => setActiveTab('collections')}

              className={`px-4 py-2 rounded-full transition-colors ${

                activeTab === 'collections'

                  ? 'bg-primary text-white'

                  : 'text-gray-400 hover:text-white'

              }`}

            >

              Collections

            </button>

            <button

              onClick={() => setActiveTab('favorites')}

              className={`px-4 py-2 rounded-full transition-colors ${

                activeTab === 'favorites'

                  ? 'bg-primary text-white'

                  : 'text-gray-400 hover:text-white'

              }`}

            >

              Favorites

            </button>

          </div>

        </div>

      </div>



      {/* Content */}

      <div className="max-w-7xl mx-auto px-4 py-8">

        {activeTab === 'collections' && (

          <>

            <div className="flex justify-end mb-6">

              <motion.button

                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}

                onClick={() => setIsCollectionModalOpen(true)}

                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"

              >

                <FiPlus />

                New Collection

              </motion.button>

            </div>



            <Masonry

              breakpointCols={breakpointColumns}

              className="flex gap-6"

              columnClassName="masonry-grid-column"

            >

              {userStats.collections.map((collection) => (

                <motion.div

                  key={collection.id}

                  initial={{ opacity: 0, y: 20 }}

                  animate={{ opacity: 1, y: 0 }}

                  className="bg-surface p-4 rounded-xl mb-6"

                >

                  <div className="aspect-square rounded-lg overflow-hidden bg-background mb-4">

                    {collection.wallpapers && collection.wallpapers.length > 0 ? (

                      <img

                        src={collection.wallpapers[0]}

                        alt={collection.name}

                        className="w-full h-full object-cover"

                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center">

                        <FiImage className="text-4xl text-gray-600" />

                      </div>

                    )}

                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">

                    {collection.name}

                  </h3>

                  <p className="text-gray-400 text-sm">

                    {collection.wallpapers?.length || 0} wallpapers

                  </p>

                </motion.div>

              ))}

            </Masonry>

          </>

        )}



        {activeTab === 'favorites' && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* Favorites grid here */}

          </div>

        )}

      </div>



      <CollectionModal

        isOpen={isCollectionModalOpen}

        onClose={() => setIsCollectionModalOpen(false)}

        onSuccess={() => {

          showToast('Collection created successfully!', 'success');

          setIsCollectionModalOpen(false);

        }}

        collections={userStats.collections}

      />



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


