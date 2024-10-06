import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import './index.css';
import firebaseConfig from './FirebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const location = useLocation();

  const authRoutes = ['/login', '/register', '/'];

  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors duration-300">
      {!isAuthRoute && (
        <>
          <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
          <div className="flex-1 flex flex-col">
            <Header toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} user={user} />
            <AnimatePresence mode="wait">
              <motion.main
                className="flex-grow p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
        </>
      )}
      {isAuthRoute && (
        <div className="flex-1 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.main
              className="flex-grow p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default AppWrapper;
