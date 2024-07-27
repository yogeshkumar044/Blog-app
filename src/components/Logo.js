import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './Header/Logo_myblog.png'; // Adjust the path based on your folder structure

function Logo({ width = '100px' }) {
  return (
    <Link to="/">
      <img 
        src={logoImage} 
        alt="Logo" 
        style={{ width }} 
        className="transition duration-300 transform hover:scale-110 rounded-md"
      />
    </Link>
  );
}

export default Logo;
