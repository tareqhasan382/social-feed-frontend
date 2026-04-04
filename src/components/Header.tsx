import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import profileImg from '../assets/images/profile.png';
import friendReqImg from '../assets/images/friend-req.png';
import profile1Img from '../assets/images/profile-1.png';

const Header: React.FC = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/feed">
              <img src={logo} alt="Buddy Script" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/feed" className="text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link to="/friend-requests" className="text-gray-500 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </Link>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                className="text-gray-500 hover:text-blue-600 relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">6</span>
              </button>

              {isNotifyOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">Notifications</h4>
                    <button className="text-blue-600 text-sm">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="px-4 py-3 hover:bg-gray-50 flex items-start space-x-3">
                        <img src={i % 2 === 0 ? profile1Img : friendReqImg} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                          <p className="text-sm text-gray-800">
                            <span className="font-bold">Steve Jobs</span> posted a link in your timeline.
                          </p>
                          <span className="text-xs text-gray-400">42 minutes ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/chat" className="text-gray-500 hover:text-blue-600 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <span className="hidden lg:block font-medium mr-1">Dylan Field</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-10 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 flex items-center space-x-3 border-b border-gray-100">
                    <img src={profileImg} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="font-bold text-gray-900">Dylan Field</p>
                      <Link to="/profile" className="text-blue-600 text-xs">View Profile</Link>
                    </div>
                  </div>
                  <ul className="py-2">
                    <li><Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link></li>
                    <li><Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help & Support</Link></li>
                    <li><button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Log Out</button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
