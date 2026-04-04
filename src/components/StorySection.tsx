import React from 'react';
import cardPpl1 from '../assets/images/card_ppl1.png';
import cardPpl2 from '../assets/images/card_ppl2.png';
import cardPpl3 from '../assets/images/card_ppl3.png';
import cardPpl4 from '../assets/images/card_ppl4.png';
import miniPic from '../assets/images/mini_pic.png';

const StorySection: React.FC = () => {
  return (
    <div className="relative mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
        {/* Your Story */}
        <div className="flex-shrink-0 w-32 h-44 lg:w-36 lg:h-52 rounded-xl overflow-hidden relative group cursor-pointer">
          <img src={cardPpl1} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-4">
            <div className="bg-blue-600 rounded-full p-2 mb-2 border-2 border-white shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white text-xs font-bold">Your Story</p>
          </div>
        </div>

        {/* Public Stories */}
        {[
          { name: 'Ryan Roslansky', img: cardPpl2, avatar: miniPic },
          { name: 'Ryan Roslansky', img: cardPpl3, avatar: miniPic },
          { name: 'Ryan Roslansky', img: cardPpl4, avatar: miniPic },
          { name: 'Ryan Roslansky', img: cardPpl2, avatar: miniPic },
        ].map((story, i) => (
          <div key={i} className="flex-shrink-0 w-32 h-44 lg:w-36 lg:h-52 rounded-xl overflow-hidden relative group cursor-pointer">
            <img src={story.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-blue-600 overflow-hidden z-10">
              <img src={story.avatar} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-4">
              <p className="text-white text-xs font-bold px-2 text-center truncate w-full">{story.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Arrow */}
      <button className="absolute -right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-xl z-20 hidden md:block border-2 border-white">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default StorySection;
