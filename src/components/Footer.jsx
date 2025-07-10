import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
      <p>ClusterCompress © {new Date().getFullYear()}. A project to showcase ML and Full-Stack skills.</p>
    </footer>
  );
};

export default Footer;