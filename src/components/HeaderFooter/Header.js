import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGlobe, faFlag, faMusic, faSignInAlt, faUserPlus, faCompactDisc, faBars, faTimes, faSignOutAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase'; // Import the auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase auth functions
import alienDJImage from '../../data/alien.jpg'; // Import the alien DJ image

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Simplified check
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-black p-4 w-full">
      <nav className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center w-full md:w-auto">
          <img
            src={alienDJImage}
            alt="Alien DJ"
            className="w-8 h-8 md:w-12 md:h-12 mr-2"
          />
          <span className="text-lg md:text-2xl font-bold text-white whitespace-nowrap overflow-hidden overflow-ellipsis"> {/* Prevent overflow */}
            DJ Playlist Curator
          </span>
          {/* Mobile Menu Toggle */}
          <button
            className="ml-auto md:hidden text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2x" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row items-center justify-end md:space-x-4`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto px-4 md:px-0">
            <Link
              to="/"
              className="text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
            <Link
              to="/global-charts"
              className="text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Global Charts
            </Link>
            <Link
              to="/country-charts"
              className="text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faFlag} className="mr-2" />
              Charts by Country
            </Link>
            <Link
              to="/genre-charts"
              className="text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faCompactDisc} className="mr-2" />
              Genre Charts
            </Link>
            <Link
              to="/riaa-certified"
              className="text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              RIAA Certified
            </Link>
            <Link
              to="/make-playlist"
              className="bg-blue-500 text-white font-bold px-3 py-2 rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Make a playlist
            </Link>
          </div>
          {/* Authentication Links */}
          <div className="flex mt-4 md:mt-0 space-x-4 items-center w-full md:w-auto justify-end">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="bg-indigo-500 text-white font-bold px-3 py-2 rounded-full hover:bg-indigo-600 transition duration-200 flex items-center"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-pink-500 text-white font-bold px-3 py-2 rounded-full hover:bg-pink-600 transition duration-200 flex items-center"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold px-3 py-2 rounded-full hover:bg-red-600 transition duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
