import React from 'react';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import { ThemeProvider } from './contexts/ThemeContext';



import { AuthProvider } from './contexts/AuthContext';



import LandingPage from './pages/LandingPage';



import Login from './pages/Login';



import Register from './pages/Register';



import DashboardLayout from './layouts/DashboardLayout';



import Home from './pages/Home';



import Explore from './pages/Explore';



import Favorites from './pages/Favorites';



import About from './pages/About';



import Profile from './pages/Profile';



import ProtectedRoute from './components/ProtectedRoute';



import { initializeApp } from 'firebase/app';



import { getAuth } from 'firebase/auth';



import { getFirestore } from 'firebase/firestore';



import firebaseConfig from './FirebaseConfig';



import './index.css';



import { GlobalStyles } from './styles/GlobalStyles';



import { SearchProvider } from './contexts/SearchContext';







// Initialize Firebase



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);



export const db = getFirestore(app);







function App() {



  return (



    <Router>



      <GlobalStyles />



      <ThemeProvider>



        <AuthProvider>



          <SearchProvider>



            <Routes>



              {/* Public Routes */}



              <Route path="/" element={<LandingPage />} />



              <Route path="/login" element={<Login />} />



              <Route path="/register" element={<Register />} />







              {/* Protected Routes with Dashboard Layout */}



              <Route



                path="/dashboard"



                element={



                  <ProtectedRoute>



                    <DashboardLayout />



                  </ProtectedRoute>



                }



              >



                <Route path="home" element={<Home />} />



                <Route path="explore" element={<Explore />} />



                <Route path="favorites" element={<Favorites />} />



                <Route path="about" element={<About />} />



                <Route path="profile" element={<Profile />} />



              </Route>



            </Routes>



          </SearchProvider>



        </AuthProvider>



      </ThemeProvider>



    </Router>



  );



}







export default App;






























