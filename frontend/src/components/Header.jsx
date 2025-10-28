// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    
        <h1 className="text-3xl font-bold text-gray-800">NRI</h1>

      
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-gray-600 hover:text-green-500 font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-green-500 font-medium"
          >
            About
          </a>
          <a
            href="#courses"
            className="text-gray-600 hover:text-green-500 font-medium"
          >
            Courses
          </a>
          <a
            href="#trainers"
            className="text-gray-600 hover:text-green-500 font-medium"
          >
            Trainers
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-green-500 font-medium"
          >
            Contact
          </a>
        </div>

      
        <a
          href="https://portfolio-website-seven-umber-40.vercel.app"
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 transition hidden md:block"
        >
          My Portfolio
        </a>
      </div>
    </nav>
  );
};

export default Header;