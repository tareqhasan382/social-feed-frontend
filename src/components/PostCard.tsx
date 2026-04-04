import React from 'react';
import postImg from '../assets/images/post_img.png';
import timelineImg from '../assets/images/timeline_img.png';
import react1 from '../assets/images/react_img1.png';
import react2 from '../assets/images/react_img2.png';
import react3 from '../assets/images/react_img3.png';
import react4 from '../assets/images/react_img4.png';
import react5 from '../assets/images/react_img5.png';
import commentImg from '../assets/images/comment_img.png';
import txtImg from '../assets/images/txt_img.png';

const PostCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Post Top */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={postImg} className="w-10 h-10 rounded-full" alt="" />
          <div>
            <h5 className="font-bold text-gray-900 text-sm">Karim Saif</h5>
            <p className="text-gray-400 text-xs">5 minute ago . <a href="#" className="text-blue-600">Public</a></p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      <h4 className="text-gray-900 font-bold mb-4 text-lg">-Healthy Tracking App</h4>
      <div className="rounded-lg overflow-hidden mb-4">
        <img src={timelineImg} alt="Timeline Post" className="w-full h-auto" />
      </div>

      {/* Reacts Section */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-[-8px]">
          {[react1, react2, react3, react4, react5].map((img, i) => (
            <img key={i} src={img} className="w-6 h-6 rounded-full border-2 border-white" alt="" />
          ))}
          <p className="text-gray-400 text-xs ml-3 font-bold">9+</p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-bold text-gray-400">
          <p><span>12</span> Comment</p>
          <p><span>122</span> Share</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full font-bold text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Haha</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:bg-gray-50 px-4 py-2 rounded-full font-bold text-sm transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:bg-gray-50 px-4 py-2 rounded-full font-bold text-sm transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <img src={commentImg} className="w-8 h-8 rounded-full" alt="" />
          <div className="flex-grow">
            <textarea 
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write a comment"
            ></textarea>
          </div>
          <div className="flex space-x-2 pt-2">
            <button className="text-gray-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg></button>
            <button className="text-gray-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
          </div>
        </div>

        <div className="space-y-4">
          <button className="text-gray-400 text-xs font-bold hover:underline">View 4 previous comments</button>
          <div className="flex items-start space-x-3">
            <img src={txtImg} className="w-8 h-8 rounded-full" alt="" />
            <div className="flex-grow">
              <div className="bg-gray-50 rounded-2xl p-4">
                <h5 className="font-bold text-gray-900 text-sm mb-1">Radovan SkillArena</h5>
                <p className="text-gray-600 text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="flex items-center space-x-1 bg-white shadow-sm px-2 py-0.5 rounded-full border border-gray-100">
                    <span className="text-blue-600"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg></span>
                    <span className="text-red-500"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg></span>
                    <span className="text-[10px] font-bold text-gray-400">198</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-xs font-bold text-gray-400 ml-4">
                <button className="hover:text-blue-600">Like</button>
                <button className="hover:text-blue-600">Reply</button>
                <button className="hover:text-blue-600">Share</button>
                <span>. 21m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
