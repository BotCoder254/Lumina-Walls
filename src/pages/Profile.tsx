import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(user?.photoURL || null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      setPreviewURL(user.photoURL || null);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let photoURL : any = user?.photoURL;

      if (profilePicture) {
        const storage = getStorage();
        const fileRef = ref(storage, `profilePictures/${user?.uid}`);
        await uploadBytes(fileRef, profilePicture);
        photoURL = await getDownloadURL(fileRef);
      }

      await updateUserProfile({ displayName: name, photoURL });
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {previewURL ? (
                <img src={previewURL} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="profilePicture"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Update Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;