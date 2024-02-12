import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGlobe, faFlag, faMusic, faSignInAlt, faUserPlus, faHeadphones, faCompactDisc, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black p-2 md:p-5">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold text-white flex items-center">
          <FontAwesomeIcon icon={faHeadphones} className="mr-2" />
          DJ Playlist Curator
        </div>
        <button
          className="block md:hidden text-gray-400 hover:text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
        <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row items-center h-auto`}>
          <div className="md:hidden flex flex-col md:flex-row md:space-x-6 w-full">
            <Link to="/" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              Home
            </Link>
            <Link to="/global-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faGlobe} className="mr-1" />
              Global Charts
            </Link>
            <Link to="/country-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faFlag} className="mr-1" />
              Charts by Country
            </Link>
            <Link to="/genre-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faCompactDisc} className="mr-1" />
              Genre Charts
            </Link>
            <Link to="/make-playlist" className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faMusic} className="mr-1" />
              Make a playlist
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-6 items-center">
            <Link to="/" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:underline text-base">
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              Home
            </Link>
            <Link to="/global-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:underline text-base">
              <FontAwesomeIcon icon={faGlobe} className="mr-1" />
              Global Charts
            </Link>
            <Link to="/country-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:underline text-base">
              <FontAwesomeIcon icon={faFlag} className="mr-1" />
              Charts by Country
            </Link>
            <Link to="/genre-charts" className="bg-black-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faCompactDisc} className="mr-1" />
              Genre Charts
            </Link>
            <Link to="/make-playlist" className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:underline text-base">
              <FontAwesomeIcon icon={faMusic} className="mr-1" />
              Make a playlist
            </Link>
          </div>
          <div className="flex md:ml-10 md:space-x-6 items-center">
            <Link to="/login" className="bg-indigo-500 text-white font-bold px-4 py-2 ml-8 shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
              Login
            </Link>
            <Link to="/sign-up" className="bg-pink-500 text-white font-bold px-4 py-2 ml-8 shadow-lg hover:bg-blue-600 text-base">
              <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};  

export default Header;
