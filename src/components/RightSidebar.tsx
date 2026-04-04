import React from 'react';
import { Link } from 'react-router-dom';
import avatarImg from '../assets/images/Avatar.png';
import people1 from '../assets/images/people1.png';
import people2 from '../assets/images/people2.png';
import people3 from '../assets/images/people3.png';

const RightSidebar: React.FC = () => {
  return (
    <div className="hidden lg:block space-y-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-8">
      {/* You Might Like */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-900 text-lg">You Might Like</h4>
          <Link to="#" className="text-blue-600 text-xs font-semibold">See All</Link>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Radovan SkillArena', role: 'Founder & CEO at Trophy', img: avatarImg },
            { name: 'Steve Jobs', role: 'CEO of Apple', img: people1 },
          ].map((person, index) => (
            <div key={index} className="flex flex-col space-y-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <img src={person.img} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{person.name}</h5>
                  <p className="text-gray-400 text-xs">{person.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 text-gray-600 text-xs font-bold hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">Ignore</button>
                <button className="flex-1 bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors">Follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Friends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-900 text-lg">Your Friends</h4>
          <Link to="#" className="text-blue-600 text-xs font-semibold">See All</Link>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
            placeholder="Search friends"
            type="search"
          />
        </div>
        <div className="space-y-4">
          {[
            { name: 'Steve Jobs', role: 'CEO of Apple', img: people1, status: 'offline', time: '5 minute ago' },
            { name: 'Ryan Roslansky', role: 'CEO of Linkedin', img: people2, status: 'online' },
            { name: 'Dylan Field', role: 'CEO of Figma', img: people3, status: 'online' },
            { name: 'Steve Jobs', role: 'CEO of Apple', img: people1, status: 'offline', time: '10 minute ago' },
            { name: 'Ryan Roslansky', role: 'CEO of Linkedin', img: people2, status: 'online' },
            { name: 'Dylan Field', role: 'CEO of Figma', img: people3, status: 'online' },
          ].map((person, index) => (
            <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={person.img} className="w-10 h-10 rounded-full border border-gray-100" alt="" />
                  {person.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{person.name}</h5>
                  <p className="text-gray-400 text-xs">{person.role}</p>
                </div>
              </div>
              {person.status === 'offline' && person.time && (
                <span className="text-gray-400 text-[10px] whitespace-nowrap">{person.time}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
