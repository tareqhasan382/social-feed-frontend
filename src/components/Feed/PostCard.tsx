import React, { useState } from 'react';
import toast from 'react-hot-toast';
import type { Post, Comment } from '../../types';
import reactImg1 from '../../assets/images/react_img1.png';
import reactImg2 from '../../assets/images/react_img2.png';
import reactImg3 from '../../assets/images/react_img3.png';
import commentImg from '../../assets/images/comment_img.png';
import { useToggleLikeMutation } from '../../redux/likes/likesApi';
import { useCreateCommentMutation, useGetCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation } from '../../redux/commentsApi';
import { useDeletePostMutation, useUpdatePostMutation } from '../../redux/postsApi';
import avatar from "../../assets/images/Avatar.png"

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostContent, setEditPostContent] = useState(post.content);
  
  const [toggleLike] = useToggleLikeMutation();
  const [createComment, { isLoading: isCommenting }] = useCreateCommentMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery(post.id, {
    skip: !showComments
  });

  const handleLike = async ({
    postId,
    commentId,
  }: {
    postId?: string;
    commentId?: string;
  }) => {
    try {
      if (!postId && !commentId) {
        return toast.error("Invalid like request");
      }
  
      await toggleLike({ postId, commentId }).unwrap();
  
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to toggle like");
    }
  };

  const handleComment = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && commentText.trim() && !isCommenting) {
      try {
        await createComment({ 
          postId: post.id, 
          text: commentText,
          parentId: replyingTo?.id 
        }).unwrap();
        
        setCommentText('');
        setReplyingTo(null);
        toast.success(replyingTo ? 'Reply added!' : 'Comment added!');
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to submit comment');
      }
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id).unwrap();
        toast.success('Post deleted successfully');
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to delete post');
      }
    }
  };

  const handleUpdatePost = async () => {
    if (!editPostContent.trim()) return;
    try {
      await updatePost({ id: post.id, body: { content: editPostContent } }).unwrap();
      setIsEditingPost(false);
      setShowOptions(false);
      toast.success('Post updated successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update post');
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [showCommentOptions, setShowCommentOptions] = useState(false);

    const handleUpdateComment = async () => {
      if (!editText.trim()) return;
      try {
        await updateComment({ id: comment.id, text: editText, postId: post.id }).unwrap();
        setIsEditing(false);
        setShowCommentOptions(false);
        toast.success('Comment updated');
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to update comment');
      }
    };

    const handleDeleteComment = async () => {
      if (window.confirm('Delete this comment?')) {
        try {
          await deleteComment({ id: comment.id, postId: post.id }).unwrap();
          toast.success('Comment deleted');
        } catch (err: any) {
          toast.error(err?.data?.message || 'Failed to delete comment');
        }
      }
    };

    return (
      <div className={`flex gap-[12px] ${isReply ? 'mt-[12px] ml-[44px]' : 'mb-[16px]'}`}>
        <img src={comment?.author?.avatarUrl || 'https://via.placeholder.com/32'} alt="" className={`${isReply ? 'w-[24px] h-[24px]' : 'w-[32px] h-[32px]'} rounded-full object-cover`} />
        <div className="flex-1">
          <div className="bg-[#F5F5F5] dark:bg-[#112032] rounded-[12px] p-[12px] inline-block max-w-full relative group">
            <h5 className="text-[13px] font-semibold text-[#212121] dark:text-white mb-[4px]">
              {comment?.author?.firstName} {comment?.author?.lastName}
            </h5>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full bg-white dark:bg-[#232E42] border border-[#F0F2F5] dark:border-[#2D3748] rounded-[6px] p-[8px] text-[13px] focus:outline-none dark:text-white"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-[11px] text-gray-500">Cancel</button>
                  <button onClick={handleUpdateComment} className="text-[11px] text-[#1890FF] font-semibold">Save</button>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-[#2D3748] dark:text-gray-300 leading-relaxed">{comment.text}</p>
            )}

            {/* Comment Options Dropdown */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setShowCommentOptions(!showCommentOptions)}
                className="text-[#C4C4C4] hover:text-[#1890FF]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="12" fill="none" viewBox="0 0 3 12">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                  <circle cx="1.5" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="1.5" cy="10.5" r="1.5" fill="currentColor" />
                </svg>
              </button>
              {showCommentOptions && (
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-[#232E42] shadow-lg rounded-[6px] border border-[#F0F2F5] dark:border-[#2D3748] z-10 py-1 overflow-hidden">
                  <button onClick={() => { setIsEditing(true); setShowCommentOptions(false); }} className="w-full text-left px-3 py-1 text-[12px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] dark:text-gray-300">Edit</button>
                  <button onClick={handleDeleteComment} className="w-full text-left px-3 py-1 text-[12px] text-red-500 hover:bg-[#F5F5F5] dark:hover:bg-[#112032]">Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[16px] mt-[8px] ml-[4px]">
            <button 
              onClick={() => handleLike({ commentId: comment?.id })} 
              className={`text-[12px] hover:text-[#1890FF] ${comment?.isLiked ? 'text-[#1890FF]' : 'text-[#666] dark:text-gray-400'}`}
            >
              Like {comment.likesCount > 0 && `(${comment.likesCount})`}
            </button>
            {!isReply && (
              <button 
                onClick={() => {
                  setReplyingTo(comment);
                  setCommentText(`@${comment.author.firstName} `);
                }} 
                className="text-[12px] text-[#666] dark:text-gray-400 hover:text-[#1890FF]"
              >
                Reply
              </button>
            )}
            <span className="text-[12px] text-[#C4C4C4]">
              {new Date(comment?.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="_nested_replies">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="_feed_inner_timeline_area bg-white dark:bg-[#232E42] rounded-[6px] p-[24px] mb-[16px] transition-all">
      <div className="_feed_inner_timeline_top flex items-start justify-between mb-[20px]">
        <div className="flex items-center">
          <div className="_feed_inner_timeline_top_image w-[48px] h-[48px] mr-[12px]">
            <img src={post.author.avatarUrl || avatar } alt="Image" className="rounded-full object-cover" />
          </div>
          <div className="_feed_inner_timeline_top_txt">
            <h4 className="text-[16px] font-semibold text-[#212121] dark:text-white mb-[4px]">
              {post.author.firstName} {post.author.lastName}
            </h4>
            <div className="flex items-center gap-[8px]">
              <span className="text-[12px] text-[#666] dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="w-[4px] h-[4px] bg-[#C4C4C4] rounded-full"></span>
              <span className="text-[12px] text-[#666] dark:text-gray-400">{post.visibility}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="text-[#C4C4C4] hover:text-[#1890FF] transition-all p-1" 
            aria-label="More options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
              <circle cx="2" cy="8" r="2" fill="currentColor" />
              <circle cx="2" cy="15" r="2" fill="currentColor" />
            </svg>
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#232E42] shadow-lg rounded-[6px] border border-[#F0F2F5] dark:border-[#2D3748] z-10 py-1">
              <button 
                onClick={() => { setIsEditingPost(true); setShowOptions(false); }}
                className="w-full text-left px-4 py-2 text-[14px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] dark:text-gray-300"
              >
                Edit Post
              </button>
              <button 
                onClick={handleDeletePost}
                className="w-full text-left px-4 py-2 text-[14px] text-red-500 hover:bg-[#F5F5F5] dark:hover:bg-[#112032]"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="_feed_inner_timeline_content mb-[20px]">
        {isEditingPost ? (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full bg-[#F5F5F5] dark:bg-[#112032] border border-[#F0F2F5] dark:border-[#2D3748] rounded-[6px] p-[12px] text-[15px] focus:outline-none dark:text-white"
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsEditingPost(false)}
                className="px-4 py-1.5 text-[14px] text-gray-500 hover:bg-gray-100 dark:hover:bg-[#112032] rounded-[4px]"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdatePost}
                className="px-4 py-1.5 text-[14px] bg-[#1890FF] text-white rounded-[4px] hover:bg-[#40a9ff]"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[15px] text-[#2D3748] dark:text-gray-300 leading-relaxed mb-[16px]">
              {post.content}
            </p>
            {post.imageUrl && (
              <div className="rounded-[6px] overflow-hidden">
                <img src={post.imageUrl || avatar} alt="Post" className="w-full h-auto object-cover" />
              </div>
            )}
          </>
        )}
      </div>

      <div className="_feed_inner_timeline_reaction flex items-center justify-between border-t border-b border-[#F0F2F5] dark:border-[#2D3748] py-[12px] mb-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex -space-x-[8px]">
            <img src={reactImg1} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
            <img src={reactImg2} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
            <img src={reactImg3} alt="" className="w-[20px] h-[20px] rounded-full border border-white" />
          </div>
          <span className="text-[13px] text-[#666] dark:text-gray-400">{post.likesCount}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button onClick={() => setShowComments(!showComments)} className="text-[13px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">{post.commentsCount} Comment</button>
          <button className="text-[13px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">0 Share</button>
        </div>
      </div>

      <div className="flex items-center gap-[8px] mb-[20px]">
        <button 
          onClick={()=>handleLike({ postId: post.id })}
          className={`flex-1 flex items-center justify-center gap-[8px] py-[8px] rounded-[6px] hover:bg-[#F5F5F5] dark:hover:bg-[#112032] transition-all text-[14px] ${post.isLiked ? 'text-[#1890FF]' : 'text-[#666] dark:text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={post.isLiked ? "currentColor" : "none"} viewBox="0 0 20 20">
            <path stroke="currentColor" strokeWidth="1.5" d="M10 15a7 7 0 100-14 7 7 0 000 14z"/><path stroke="currentColor" strokeWidth="1.5" d="M7 7.5s.5-1 1.5-1 1.5 1 1.5 1M13 7.5s-.5-1-1.5-1-1.5 1-1.5 1M7 11s1 2 3 2 3-2 3-2"/>
          </svg>
          {post.isLiked ? 'Liked' : 'Haha'}
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
          {replyingTo && (
            <div className="flex items-center justify-between mb-[8px] px-[12px] py-[4px] bg-[#F5F5F5] dark:bg-[#112032] rounded-[4px]">
              <span className="text-[12px] text-[#666] dark:text-gray-400">
                Replying to <span className="font-semibold">{replyingTo.author.firstName}</span>
              </span>
              <button 
                onClick={() => {
                  setReplyingTo(null);
                  setCommentText('');
                }} 
                className="text-[12px] text-red-500 hover:text-red-600"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="flex gap-[12px] mb-[20px]">
            <img src={commentImg || avatar} alt="comment-image" className="w-[32px] h-[32px] rounded-full object-cover" />
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={isCommenting ? "Adding..." : (replyingTo ? "Write a reply" : "Write a comment")} 
                className="w-full bg-[#F5F5F5] dark:bg-[#112032] border-none rounded-[32px] px-[16px] py-[8px] text-[14px] focus:outline-none dark:text-white" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleComment}
                disabled={isCommenting}
              />
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 flex gap-[8px] text-[#C4C4C4]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path stroke="currentColor" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path stroke="currentColor" strokeWidth="2" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
              </div>
            </div>
          </div>
          
          {isLoadingComments ? (
             <div className="flex justify-center py-4">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1890FF]"></div>
             </div>
          ) : comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
