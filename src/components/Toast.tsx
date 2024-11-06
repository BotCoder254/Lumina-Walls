import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const icons = {
    success: <FiCheck className="text-green-500" />,
    error: <FiX className="text-red-500" />,
    info: <FiInfo className="text-blue-500" />
  };

  const backgrounds = {
    success: 'bg-green-500/10 border-green-500',
    error: 'bg-red-500/10 border-red-500',
    info: 'bg-blue-500/10 border-blue-500'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`px-4 py-3 rounded-lg border ${backgrounds[type]} backdrop-blur-sm`}>
            <div className="flex items-center gap-2">
              {icons[type]}
              <p className="text-white">{message}</p>
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 