import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join Lumina Walls today</p>
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
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                />
              </div>
            </div>

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
              <p className="mt-2 text-sm text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Create Account
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:text-primary-dark">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary-dark">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;


