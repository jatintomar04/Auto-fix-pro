import React, { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

const Nav = () => {
  
    const {user} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

   const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
   }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={'/'} className="flex items-center">
            <FiTool className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AutoFix Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {
               !user ? (
                  <>
                  <Link
              to="/login"
              className="px-4 py-1.5 text-gray-600 hover:text-gray-900 flex items-center border-1 rounded-sm "
            >
              <CiLogin className="h-4 w-4 mr-2" />
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaUserPlus className="h-4 w-4 mr-2" />
              Register
            </Link>
          
                    </>
                ) : (
                    <>
                      <button onClick={handleLogout}
            
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            >
              <FaUserPlus className="h-4 w-4 mr-2" />
              Logout
            </button>
                    </>
                )
            }
          </div>

          {/* Mobile Navigation - Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full">
          <div className="flex flex-col items-center space-y-4 py-4">
            {

                !user ? (
                    <>
                    <Link
              to="/login"
              className=" hover:bg-gray-600 px-4 py-2 w-full text-center bg-gray-400 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <CiLogin className="h-4 w-4 mr-2 hidden " />
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserPlus className="h-4 w-4 mr-2 hidden" />
              Register
            </Link></>
                ) : (
                    <>
                   <button
            onClick={() => {
            handleLogout();
         setIsMenuOpen(false);
                     }}
             className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full text-center flex items-center justify-center">
  <FaUserPlus className="h-4 w-4 mr-2 hidden" />
  Logout
</button>
                    </>
                )



            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
