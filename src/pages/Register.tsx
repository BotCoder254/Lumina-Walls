import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';

import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';



const Register = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { register } = useAuth();

  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await register(email, password);

      navigate('/dashboard/home');

    } catch (err) {

      setError('Failed to create an account');

    }

  };



  return (

    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="w-full max-w-md"

      >

        <div className="bg-surface/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-surface-light">

          <div className="text-center mb-8">

            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>

            <p className="text-gray-400">Join Lumina Walls today</p>

          </div>



          {error && (

            <motion.div

              initial={{ opacity: 0, y: -10 }}

              animate={{ opacity: 1, y: 0 }}

              className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6"

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

                  className="w-full bg-background text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-surface-light"

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

                  className="w-full bg-background text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-surface-light"

                />

              </div>

            </div>



            <motion.button

              whileHover={{ scale: 1.02 }}

              whileTap={{ scale: 0.98 }}

              type="submit"

              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-primary/20"

            >

              <FiUserPlus className="text-xl" />

              <span>Create Account</span>

            </motion.button>

          </form>



          <div className="mt-6 text-center text-gray-400">

            Already have an account?{' '}

            <Link to="/login" className="text-primary hover:text-primary-light transition-colors">

              Sign In

            </Link>

          </div>

        </div>

      </motion.div>

    </div>

  );

};



export default Register;


