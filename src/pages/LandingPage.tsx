import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FiArrowRight, FiMonitor, FiSmartphone, FiDownload, FiImage } from 'react-icons/fi';



gsap.registerPlugin(ScrollTrigger);



const LandingPage = () => {

  useEffect(() => {

    const tl = gsap.timeline();

    

    tl.from('.hero-title', {

      y: 100,

      opacity: 0,

      duration: 1,

      ease: 'power4.out',

    })

    .from('.hero-description', {

      y: 50,

      opacity: 0,

      duration: 0.8,

    }, '-=0.5')

    .from('.cta-button', {

      scale: 0.8,

      opacity: 0,

      duration: 0.5,

    }, '-=0.3');



    // Features animation

    gsap.from('.feature-card', {

      scrollTrigger: {

        trigger: '.features',

        start: 'top center',

      },

      y: 100,

      opacity: 0,

      duration: 0.8,

      stagger: 0.2,

    });

  }, []);



  return (

    <div className="min-h-screen bg-background">

      {/* Hero Section */}

      <div className="container mx-auto px-4 pt-32 pb-20">

        <div className="text-center">

          <motion.h1 

            className="hero-title text-6xl md:text-7xl font-bold text-white mb-6"

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

          >

            Lumina <span className="text-primary">Walls</span>

          </motion.h1>

          <motion.p 

            className="hero-description text-xl text-gray-300 mb-8 max-w-2xl mx-auto"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: 0.2 }}

          >

            Discover and download stunning wallpapers for all your devices. 

            Curated collection updated daily.

          </motion.p>

          <motion.div

            className="cta-button"

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

          >

            <Link

              to="/login"

              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"

            >

              Get Started <FiArrowRight className="ml-2" />

            </Link>

          </motion.div>

        </div>

      </div>



      {/* Features Section */}

      <div className="features container mx-auto px-4 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div

            whileHover={{ y: -5 }}

            className="feature-card bg-surface p-8 rounded-xl backdrop-blur-sm border border-surface-light"

          >

            <div className="text-primary text-3xl mb-4">

              <FiMonitor />

            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Desktop Wallpapers</h3>

            <p className="text-gray-400">High-resolution wallpapers perfect for your desktop setup</p>

          </motion.div>

          

          <motion.div

            whileHover={{ y: -5 }}

            className="feature-card bg-surface p-8 rounded-xl backdrop-blur-sm border border-surface-light"

          >

            <div className="text-primary text-3xl mb-4">

              <FiSmartphone />

            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Mobile Wallpapers</h3>

            <p className="text-gray-400">Stunning wallpapers optimized for your mobile devices</p>

          </motion.div>

          

          <motion.div

            whileHover={{ y: -5 }}

            className="feature-card bg-surface p-8 rounded-xl backdrop-blur-sm border border-surface-light"

          >

            <div className="text-primary text-3xl mb-4">

              <FiDownload />

            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Easy Downloads</h3>

            <p className="text-gray-400">One-click downloads in multiple resolutions</p>

          </motion.div>

        </div>

      </div>



      {/* Stats Section */}

      <div className="bg-surface py-20">

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {[

              { icon: FiImage, label: 'Wallpapers', value: '10,000+' },

              { icon: FiDownload, label: 'Downloads', value: '50,000+' },

              { icon: FiSmartphone, label: 'Devices', value: '100+' },

              { icon: FiMonitor, label: 'Categories', value: '20+' }

            ].map((stat, index) => (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 20 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ delay: index * 0.1 }}

                className="text-center"

              >

                <stat.icon className="text-primary text-4xl mx-auto mb-4" />

                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>

                <div className="text-gray-400">{stat.label}</div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};



export default LandingPage;














