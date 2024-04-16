import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 rounded-full bg-cover bg-center animate-spin" style={{ backgroundImage: `url('./images/113.webp')`}}></div>
    </div>
  );
};

export default Loading;
