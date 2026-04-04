import React from 'react';
import { Link } from 'react-router-dom';
import people1 from '../assets/images/people1.png';
import people2 from '../assets/images/people2.png';
import people3 from '../assets/images/people3.png';
import eventImg from '../assets/images/feed_event1.png';

const LeftSidebar: React.FC = () => {
  return (
    <div className="hidden lg:block space-y-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-8">
      {/* Explore Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-gray-900 mb-6 text-lg">Explore</h4>
        <ul className="space-y-4">
          {[
            { label: 'Learning', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', badge: 'New' },
            { label: 'Insights', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { label: 'Find friends', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
            { label: 'Bookmarks', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
            { label: 'Group', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { label: 'Gaming', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z', badge: 'New' },
            { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
          ].map((item, index) => (
            <li key={index} className="flex items-center justify-between group">
              <Link to="#" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
              {item.badge && (
                <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested People */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-900 text-lg">Suggested People</h4>
          <Link to="#" className="text-blue-600 text-xs font-semibold">See All</Link>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Steve Jobs', role: 'CEO of Apple', img: people1 },
            { name: 'Ryan Roslansky', role: 'CEO of Linkedin', img: people2 },
            { name: 'Dylan Field', role: 'CEO of Figma', img: people3 },
          ].map((person, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={person.img} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{person.name}</h5>
                  <p className="text-gray-400 text-xs">{person.role}</p>
                </div>
              </div>
              <button className="text-blue-600 text-xs font-bold hover:bg-blue-50 px-3 py-1 rounded-full transition-colors">Connect</button>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-900 text-lg">Events</h4>
          <Link to="#" className="text-blue-600 text-xs font-semibold">See all</Link>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <img src={eventImg} alt="" className="w-full h-32 object-cover" />
              <div className="p-3 flex space-x-3">
                <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-center h-fit">
                  <p className="text-sm font-bold leading-tight">10</p>
                  <p className="text-[10px] font-bold uppercase leading-tight">Jul</p>
                </div>
                <h5 className="font-bold text-gray-900 text-sm leading-snug">No more terrorism no more cry</h5>
              </div>
              <div className="px-3 pb-3 flex justify-between items-center border-t border-gray-100 pt-2">
                <p className="text-gray-400 text-xs">17 People Going</p>
                <button className="text-blue-600 text-xs font-bold">Going</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
