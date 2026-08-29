import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-display font-bold text-neutral-50 mb-4">404</h1>
      <p className="text-xl text-neutral-400 mb-8">System node not found.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-600 transition-colors">
        Return to main console &rarr;
      </Link>
    </div>
  );
};

export default NotFound;
