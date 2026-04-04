import React, { useState } from 'react';
import type { Post } from '../../types';
import reactImg1 from '../../assets/images/react_img1.png';
import reactImg2 from '../../assets/images/react_img2.png';
import reactImg3 from '../../assets/images/react_img3.png';
import commentImg from '../../assets/images/comment_img.png';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="_feed_inner_timeline_area bg-white dark:bg-[#232E42] rounded-[6px] p-[24px] mb-[16px] transition-all">
      <div className="_feed_inner_timeline_top flex items-start justify-between mb-[20px]">
        <div className="flex items-center">
          <div className="_feed_inner_timeline_top_image w-[48px] h-[48px] mr-[12px]">
            <img src={post.author.avatar} alt="Image" className="rounded-full object-cover" />
          </div>
          <div className="_feed_inner_timeline_top_txt">
            <h4 className="text-[16px] font-semibold text-[#212121] dark:text-white mb-[4px]">{post.author.name}</h4>
            <div className="flex items-center gap-[8px]">
              <span className="text-[12px] text-[#666] dark:text-gray-400">{post.time}</span>
              <span className="w-[4px] h-[4px] bg-[#C4C4C4] rounded-full"></span>
              <span className="text-[12px] text-[#666] dark:text-gray-400">{post.visibility}</span>
            </div>
          </div>
        </div>
        <button className="text-[#C4C4C4] hover:text-[#1890FF] transition-all" aria-label="More options">
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
            <circle cx="2" cy="2" r="2" fill="currentColor" />
            <circle cx="2" cy="8" r="2" fill="currentColor" />
            <circle cx="2" cy="15" r="2" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="_feed_inner_timeline_content mb-[20px]">
        <p className="text-[15px] text-[#2D3748] dark:text-gray-300 leading-relaxed mb-[16px]">
          {post.content}
        </p>
        {post.image && (
          <div className="rounded-[6px] overflow-hidden">
            <img src={post.image} alt="Post" className="w-full h-auto object-cover" />
          </div>
        )}
      </div>

      <div className="_feed_inner_timeline_reaction flex items-center justify-between border-t border-b border-[#F0F2F5] dark:border-[#2D3748] py-[12px] mb-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex -space-x-[8px]">
            <img src={reactImg1} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
            <img src={reactImg2} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
            <img src={reactImg3} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
          </div>
          <span className="text-[13px] text-[#666] dark:text-gray-400">{post.reactions}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button onClick={() => setShowComments(!showComments)} className="text-[13px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">{post.comments} Comment</button>
          <button className="text-[13px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">{post.shares} Share</button>
        </div>
      </div>

      <div className="flex items-center gap-[8px] mb-[20px]">
        <button className="flex-1 flex items-center justify-center gap-[8px] py-[8px] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] transition-all text-[#666] dark:text-gray-400 text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M10 15a7 7 0 100-14 7 7 0 000 14z"/><path stroke="currentColor" strokeWidth="1.5" d="M7 7.5s.5-1 1.5-1 1.5 1 1.5 1M13 7.5s-.5-1-1.5-1-1.5 1-1.5 1M7 11s1 2 3 2 3-2 3-2"/></svg>
          Haha
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex-1 flex items-center justify-center gap-[8px] py-[8px] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] transition-all text-[#666] dark:text-gray-400 text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"/></svg>
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-[8px] py-[8px] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] transition-all text-[#666] dark:text-gray-400 text-[14px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/></svg>
          Share
        </button>
      </div>

      {showComments && (
        <div className="_feed_inner_comment_area border-t border-[#F0F2F5] dark:border-[#2D3748] pt-[20px]">
          <div className="flex gap-[12px] mb-[20px]">
            <img src={commentImg} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
            <div className="flex-1 relative">
              <input type="text" placeholder="Write a comment" className="w-full bg-[#F5F5F5] dark:bg-[#112032] border-none rounded-[32px] px-[16px] py-[8px] text-[14px] focus:outline-none dark:text-white" />
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 flex gap-[8px] text-[#C4C4C4]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path stroke="currentColor" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path stroke="currentColor" strokeWidth="2" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
              </div>
            </div>
          </div>
          {post.commentList.map((comment) => (
            <div key={comment.id} className="flex gap-[12px] mb-[16px]">
              <img src={comment.author.avatar} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
              <div className="flex-1">
                <div className="bg-[#F5F5F5] dark:bg-[#112032] rounded-[12px] p-[12px] inline-block max-w-full">
                  <h5 className="text-[13px] font-semibold text-[#212121] dark:text-white mb-[4px]">{comment.author.name}</h5>
                  <p className="text-[13px] text-[#2D3748] dark:text-gray-300 leading-relaxed">{comment.text}</p>
                </div>
                <div className="flex items-center gap-[16px] mt-[8px] ml-[4px]">
                  <button className="text-[12px] text-[#666] dark:text-gray-400 hover:text-[#1890FF]">Like</button>
                  <button className="text-[12px] text-[#666] dark:text-gray-400 hover:text-[#1890FF]">Reply</button>
                  <span className="text-[12px] text-[#C4C4C4]">{comment.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
