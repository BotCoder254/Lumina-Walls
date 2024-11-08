import React, { createContext, useContext, useState, useEffect } from 'react';

import { 

  User,

  signInWithEmailAndPassword,

  createUserWithEmailAndPassword,

  signOut,

  onAuthStateChanged,

  UserCredential

} from 'firebase/auth';

import { auth } from '../App';



interface AuthContextType {

  currentUser: User | null;

  login: (email: string, password: string) => Promise<UserCredential>;

  register: (email: string, password: string) => Promise<UserCredential>;

  logout: () => Promise<void>;

  loading: boolean;

}



export const AuthContext = createContext<AuthContextType>({} as AuthContextType);



export const useAuth = () => {

  return useContext(AuthContext);

};



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);



  const login = (email: string, password: string) => {

    return signInWithEmailAndPassword(auth, email, password);

  };



  const register = (email: string, password: string) => {

    return createUserWithEmailAndPassword(auth, email, password);

  };



  const logout = () => {

    return signOut(auth);

  };



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      setCurrentUser(user);

      setLoading(false);

    });



    return unsubscribe;

  }, []);



  const value = {

    currentUser,

    login,

    register,

    logout,

    loading

  };



  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>

  );

};






