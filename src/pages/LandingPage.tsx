import React from 'react';

import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';

import HeroIllustration from '../assets/hero-illustration';



const LandingPage: React.FC = () => {

  const navigate = useNavigate();

  const { currentUser } = useAuth();



  const handleDashboardClick = () => {

    navigate('/dashboard/home');

  };



  return (

    <motion.div 

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-x-hidden"

    >

      <nav className="w-full py-6 px-4 absolute top-0 left-0">

        <div className="container mx-auto flex justify-end">

          {!currentUser && (

            <div className="space-x-4">

              <button

                onClick={() => navigate('/login')}

                className="bg-white/10 text-white px-6 py-2 rounded-lg font-semibold 

                hover:bg-white/20 transition duration-300"

              >

                Login

              </button>

              <button

                onClick={() => navigate('/register')}

                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold 

                hover:bg-opacity-90 transition duration-300"

              >

                Sign Up

              </button>

            </div>

          )}

        </div>

      </nav>



      <div className="container mx-auto px-4 pt-32 pb-16">

        {/* Hero Section */}

        <motion.div 

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5 }}

          className="flex flex-col lg:flex-row items-center justify-between"

        >

          <div className="lg:w-1/2 text-white">

            <h1 className="text-6xl font-bold mb-6">

              Task Management

              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">

                Reimagined

              </span>

            </h1>

            <p className="text-xl mb-8 text-white/80">

              Streamline your workflow, boost productivity, and collaborate seamlessly 

              with our powerful task management solution.

            </p>

            {!currentUser && (

              <button

                onClick={() => navigate('/register')}

                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold 

                hover:bg-opacity-90 transition duration-300 shadow-lg"

              >

                Get Started - It's Free

              </button>

            )}

            {currentUser ? (

              <button

                onClick={handleDashboardClick}

                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold 

                hover:bg-opacity-90 transition duration-300 shadow-lg"

              >

                Go to Dashboard

              </button>

            ) : (

              <button

                onClick={() => navigate('/login')}

                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold 

                hover:bg-opacity-90 transition duration-300 shadow-lg"

              >

                Go to Dashboard

              </button>

            )}

          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">

            <motion.div 

              className="animate-float"

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ duration: 0.5, delay: 0.2 }}

            >

              <HeroIllustration />

            </motion.div>

          </div>

        </motion.div>



        {/* Features Section */}

        <motion.div 

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5, delay: 0.4 }}

          className="mt-32 grid md:grid-cols-3 gap-8"

        >

          <FeatureCard

            title="Task Management"

            description="Organize and track your tasks with our intuitive interface"

            icon="📋"

          />

          <FeatureCard

            title="Team Collaboration"

            description="Work together seamlessly with real-time updates"

            icon="👥"

          />

          <FeatureCard

            title="Analytics"

            description="Get insights into your productivity and team performance"

            icon="📊"

          />

        </motion.div>

      </div>

    </motion.div>

  );

};



interface FeatureCardProps {

  title: string;

  description: string;

  icon: string;

}



const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (

  <motion.div 

    whileHover={{ y: -5 }}

    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"

  >

    <div className="text-4xl mb-4">{icon}</div>

    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>

    <p className="text-white/80">{description}</p>

  </motion.div>

);



export default LandingPage;


