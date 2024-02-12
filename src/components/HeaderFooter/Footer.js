import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black p-5 footer mt-auto">
      <div className="container mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-4xl md:text-5xl" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-4xl md:text-5xl" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-4xl md:text-5xl" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-4xl md:text-5xl" />
            </a>
            <a href="mailto:your@email.com">
              <FaEnvelope className="text-white text-4xl md:text-5xl" />
            </a>
          </div>
          <div className="flex-grow md:text-center mb-4 md:mb-0">
            <p className="text-gray-400 text-sm md:text-base">Terms of Service | Privacy Policy | Contact Us</p>
            <p className="text-gray-400 text-sm md:text-base">&copy; {new Date().getFullYear()} Johnathon Crawford. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <form className="flex items-center">
              <input type="email" placeholder="Enter your email" className="bg-gray-900 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
