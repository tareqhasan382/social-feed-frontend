import React from 'react';
import Header from '../components/Feed/Header';
import LeftSidebar from '../components/Feed/LeftSidebar';
import RightSidebar from '../components/Feed/RightSidebar';
import Stories from '../components/Feed/Stories';
import PostCreator from '../components/Feed/PostCreator';
import PostCard from '../components/Feed/PostCard';
import MobileBottomNav from '../components/Feed/MobileBottomNav';
import { useTheme } from '../context/ThemeContext';
import { useGetPostsQuery } from '../redux/postsApi';

const FeedPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { data: posts, isLoading, isError } = useGetPostsQuery();

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
                  {isLoading && (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1890FF]"></div>
                    </div>
                  )}
                  {isError && (
                    <div className="text-center py-10 text-red-500">
                      Failed to load posts. Please try again later.
                    </div>
                  )}
                  {posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  {!isLoading && posts?.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                      No posts yet. Be the first to post!
                    </div>
                  )}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default FeedPage;
