import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Lumina Walls Team
        </p>
        <p className="mt-2 text-sm">© 2024 Lumina Walls. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;