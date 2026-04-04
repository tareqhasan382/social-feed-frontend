import React from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import StorySection from '../components/StorySection';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const Feed: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <LeftSidebar />
          </div>

          {/* Middle Content */}
          <div className="w-full lg:w-2/4 px-4">
            <StorySection />
            <CreatePost />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/4 px-4">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
