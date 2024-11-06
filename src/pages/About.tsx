import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiInfo, 
  FiUsers, 
  FiImage, 
  FiDownload, 
  FiGithub, 
  FiTwitter, 
  FiInstagram 
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.mission-card', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2
    })
    .from('.stats-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, '-=0.2')
    .from('.team-section', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.2');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 about-content">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Lumina Walls</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bringing the world's most beautiful wallpapers to your devices
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            whileHover={{ y: -5 }}
            className="mission-card bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="text-pink-500 text-3xl mb-4">
              <FiInfo />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To provide high-quality wallpapers that inspire creativity and enhance your digital experience.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="mission-card bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="text-blue-500 text-3xl mb-4">
              <FiUsers />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Community</h2>
            <p className="text-gray-300">
              Join our growing community of wallpaper enthusiasts and creators from around the world.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/30 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiImage, label: 'Wallpapers', value: '10,000+', color: 'text-blue-500' },
              { icon: FiUsers, label: 'Users', value: '50,000+', color: 'text-green-500' },
              { icon: FiDownload, label: 'Downloads', value: '1M+', color: 'text-yellow-500' },
              { icon: FiInfo, label: 'Rating', value: '4.9/5', color: 'text-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="stats-card text-center p-4"
              >
                <stat.icon className={`text-3xl ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section text-center">
          <h2 className="text-2xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            {[
              { icon: FiGithub, label: 'GitHub', href: '#' },
              { icon: FiTwitter, label: 'Twitter', href: '#' },
              { icon: FiInstagram, label: 'Instagram', href: '#' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ y: -5 }}
                className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors"
              >
                <social.icon className="text-2xl mb-2" />
                <div className="text-sm">{social.label}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;