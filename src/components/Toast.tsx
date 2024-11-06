import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';
import { ToastType } from '../types/toast';

interface ToastProps {
  message: string;
  type: ToastType;
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
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
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
          <div className={`px-4 py-3 rounded-lg border ${backgrounds[type]} shadow-lg`}>
            <div className="flex items-center gap-2">
              {icons[type]}
              <p className="text-gray-900">{message}</p>
              <button
                onClick={onClose}
                className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
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