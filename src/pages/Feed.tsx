import React from 'react';
import Header from '../components/Feed/Header';
import LeftSidebar from '../components/Feed/LeftSidebar';
import RightSidebar from '../components/Feed/RightSidebar';
import Stories from '../components/Feed/Stories';
import PostCreator from '../components/Feed/PostCreator';
import PostCard from '../components/Feed/PostCard';
import MobileBottomNav from '../components/Feed/MobileBottomNav';
import { useTheme } from '../context/ThemeContext';
import type { Post } from '../types';

import timelineImg from '../assets/images/timeline_img.png';
import profile1 from '../assets/images/profile-1.png';
import people1 from '../assets/images/people1.png';
import people2 from '../assets/images/people2.png';

const FeedPage: React.FC = () => {
  const posts: Post[] = [
    {
      id: '1',
      author: {
        id: 'u1',
        name: 'Steve Jobs',
        avatar: profile1,
      },
      time: '42 minutes ago',
      visibility: 'Public',
      content: 'The scale of the universe is a map of the observable universe that allows you to explore the world at different levels of zoom. It’s an incredible tool for understanding the relative size of things, from the smallest particles to the largest galaxies.',
      image: timelineImg,
      reactions: 124,
      comments: 42,
      shares: 12,
      commentList: [
        {
          id: 'c1',
          author: {
            id: 'u2',
            name: 'Ryan Roslansky',
            avatar: people1,
          },
          text: 'This is absolutely mind-blowing! Thanks for sharing.',
          likes: 5,
          time: '10m ago'
        }
      ]
    },
    {
      id: '2',
      author: {
        id: 'u3',
        name: 'Dylan Field',
        avatar: people2,
      },
      time: '1 hour ago',
      visibility: 'Friends',
      content: 'Just finished the new design system for the mobile app. Can’t wait to show you guys what we’ve been working on!',
      reactions: 89,
      comments: 15,
      shares: 5,
      commentList: []
    }
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="_layout_main_wrapper bg-[#F0F2F5] dark:bg-[#112032] h-screen overflow-hidden transition-all duration-200">
      <Header />
      
      <main className="_layout_main_content h-[calc(100vh-75px)]">
        <div className="container max-w-[1140px] mx-auto px-4 h-full">
          <div className="row flex flex-wrap -mx-4 h-full">
            <LeftSidebar />
            
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 w-full lg:w-1/2 px-4 h-full overflow-y-auto scrollbar-hide pt-[18px]">
              <div className="_layout_middle_content pb-[80px] lg:pb-0">
                <Stories />
                <PostCreator />
                <div className="_feed_timeline_list">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>

            <RightSidebar />
          </div>
        </div>
      </main>

      {/* Vertical Theme Toggle on Y-Axis */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[1050] hidden lg:block">
        <button 
          onClick={toggleTheme}
          className="bg-amber-500 hover:bg-amber-600 text-white w-[40px] h-[100px] rounded-l-[12px] flex flex-col items-center justify-center gap-[12px] shadow-lg transition-all"
        >
          <span className="[writing-mode:vertical-lr] font-medium text-[14px] uppercase tracking-wider">
            {theme === 'light' ? 'Dark' : 'Light'}
          </span>
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 22 22">
              <path fill="currentColor" d="M11 20.625a9.625 9.625 0 110-19.25.688.688 0 01.688.688.688.688 0 01-.132.404 8.25 8.25 0 0011.01 11.01.688.688 0 011.092.553 9.625 9.625 0 01-12.658 6.595z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 22 22">
              <path fill="currentColor" d="M11 1.375a.688.688 0 01.688.688v1.375a.688.688 0 11-1.375 0V2.063a.688.688 0 01.687-.688zM17.806 4.194a.688.688 0 01.972.973l-.973.972a.688.688 0 11-.972-.972l.973-.973zM20.625 11.001a.688.688 0 01-.688.688h-1.375a.688.688 0 110-1.375h1.375a.688.688 0 01.688.687zM17.806 17.806a.688.688 0 01.973-.972l.972.973a.688.688 0 11-.972.972l-.973-.973zM11 20.625a.688.688 0 01-.688-.688v-1.375a.688.688 0 111.375 0v1.375a.688.688 0 01-.687.688zM4.194 17.806a.688.688 0 01-.973-.972l.973-.973a.688.688 0 11.972.972l-.972.973zM1.375 11a.688.688 0 01.688-.688h1.375a.688.688 0 110 1.375H2.063a.688.688 0 01-.688-.687zM4.194 4.194a.688.688 0 01.972.973l-.972.972a.688.688 0 11-.973-.972l.973-.973zM11 6.188a4.813 4.813 0 100 9.625 4.813 4.813 0 000-9.625zM7.563 11a3.438 3.438 0 116.875 0 3.438 3.438 0 01-6.875 0z" />
            </svg>
          )}
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default FeedPage;
