import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, [auth]);

  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, data);
      setUser({ ...auth.currentUser, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};