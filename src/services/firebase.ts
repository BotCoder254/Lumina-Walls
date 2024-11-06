import { db } from '../App';
import { 
  doc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { Collection, UserProfile } from '../types';

export const createCollection = async (userId: string, name: string, description?: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create user profile if it doesn't exist
      await setDoc(userRef, {
        collections: [],
        favorites: [],
        downloads: 0,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    }

    const collectionRef = collection(db, 'collections');
    const newCollection = await addDoc(collectionRef, {
      name,
      description,
      userId,
      wallpapers: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    await updateDoc(userRef, {
      collections: arrayUnion(newCollection.id)
    });

    return newCollection.id;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

export const addToCollection = async (
  userId: string, 
  collectionId: string, 
  wallpaperId: string
) => {
  try {
    const collectionRef = doc(db, 'collections', collectionId);
    await updateDoc(collectionRef, {
      wallpapers: arrayUnion(wallpaperId),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding to collection:', error);
    throw error;
  }
};

export const removeFromCollection = async (
  userId: string, 
  collectionId: string, 
  wallpaperId: string
) => {
  try {
    const collectionRef = doc(db, 'collections', collectionId);
    await updateDoc(collectionRef, {
      wallpapers: arrayRemove(wallpaperId),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error removing from collection:', error);
    throw error;
  }
};

export const deleteCollection = async (userId: string, collectionId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const collectionRef = doc(db, 'collections', collectionId);

    await deleteDoc(collectionRef);
    await updateDoc(userRef, {
      collections: arrayRemove(collectionId)
    });
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}; 