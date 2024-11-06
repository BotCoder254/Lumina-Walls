import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';

import { FiMail, FiLock, FiLogIn, FiArrowLeft } from 'react-icons/fi';



const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { login } = useAuth();

  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await login(email, password);

      navigate('/dashboard/home');

    } catch (err) {

      setError('Failed to login');

    }

  };



  return (

    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="absolute top-4 left-4">

        <Link 

          to="/"

          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"

        >

          <FiArrowLeft />

          Back to Home

        </Link>

      </div>



      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="w-full max-w-md"

      >

        <div className="bg-white rounded-2xl p-8 shadow-xl">

          <div className="text-center mb-8">

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>

            <p className="text-gray-600">Sign in to continue to Lumina Walls</p>

          </div>



          {error && (

            <motion.div

              initial={{ opacity: 0, y: -10 }}

              animate={{ opacity: 1, y: 0 }}

              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"

            >

              {error}

            </motion.div>

          )}



          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <div className="relative">

                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                <input

                  type="email"

                  placeholder="Email"

                  value={email}

                  onChange={(e) => setEmail(e.target.value)}

                  className="w-full bg-gray-50 text-gray-900 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"

                />

              </div>

            </div>



            <div>

              <div className="relative">

                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                <input

                  type="password"

                  placeholder="Password"

                  value={password}

                  onChange={(e) => setPassword(e.target.value)}

                  className="w-full bg-gray-50 text-gray-900 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"

                />

              </div>

              <div className="mt-2 text-right">

                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">

                  Forgot Password?

                </Link>

              </div>

            </div>



            <motion.button

              whileHover={{ scale: 1.02 }}

              whileTap={{ scale: 0.98 }}

              type="submit"

              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"

            >

              <FiLogIn className="text-xl" />

              <span>Sign In</span>

            </motion.button>

          </form>



          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Don't have an account?{' '}

              <Link to="/register" className="text-primary hover:text-primary-dark font-medium">

                Register

              </Link>

            </p>

          </div>

        </div>

      </motion.div>

    </div>

  );

};



export default Login;


