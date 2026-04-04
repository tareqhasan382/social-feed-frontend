import React from 'react';
import txtImg from '../assets/images/txt_img.png';

const CreatePost: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-start space-x-4 mb-6">
        <img src={txtImg} className="w-10 h-10 rounded-full" alt="User" />
        <div className="flex-grow">
          <textarea 
            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px] resize-none"
            placeholder="Write something ..."
          ></textarea>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-2 lg:space-x-6 overflow-x-auto no-scrollbar">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors py-2 px-1 whitespace-nowrap">
            <span className="text-blue-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
            <span className="text-sm font-bold">Photo</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors py-2 px-1 whitespace-nowrap">
            <span className="text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></span>
            <span className="text-sm font-bold">Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors py-2 px-1 whitespace-nowrap">
            <span className="text-yellow-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
            <span className="text-sm font-bold">Event</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors py-2 px-1 whitespace-nowrap">
            <span className="text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" /></svg></span>
            <span className="text-sm font-bold">Article</span>
          </button>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 transition-all flex items-center space-x-2 ml-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
