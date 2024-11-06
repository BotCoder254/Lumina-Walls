import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  progress?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <div className="absolute w-full h-full border-4 border-purple-500/30 rounded-full" />
          <div className="absolute w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
        </motion.div>
        {progress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-500">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 