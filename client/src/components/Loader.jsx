import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-teal-600"></div>
    </div>
  );
};

export default Loader;
