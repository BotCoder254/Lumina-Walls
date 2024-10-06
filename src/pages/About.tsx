import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Lumina Walls
      </motion.h1>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Lumina Walls is a modern wallpaper application that brings stunning imagery to your devices. Our mission is to provide a curated collection of high-quality wallpapers that inspire and beautify your digital experience.
      </motion.p>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Features:
      </motion.p>
      <motion.ul
        className="list-disc list-inside mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <li>Explore a vast collection of wallpapers from talented photographers</li>
        <li>Easy download and set as wallpaper functionality</li>
        <li>Save your favorite wallpapers for quick access</li>
        <li>Regular updates with fresh content</li>
      </motion.ul>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Thank you for choosing Lumina Walls. We hope our wallpapers bring joy and inspiration to your daily life.
      </motion.p>
    </div>
  );
};

export default About;