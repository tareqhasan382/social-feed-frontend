import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useCreatePostMutation } from '../../redux/postsApi';
import { useUploadFileMutation } from '../../redux/uploadApi';
import { useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import txtImg from '../../assets/images/txt_img.png';

const PostCreator: React.FC = () => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [uploadFile] = useUploadFileMutation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
        toast.error('Only images and videos are allowed');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !file) {
      toast.error('Please write something or upload a file!');
      return;
    }

    try {
      let mediaUrl = '';
      if (file) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await uploadFile(formData).unwrap();
        mediaUrl = uploadRes.data;
        setIsUploading(false);
      }

      await createPost({ 
        content: content || ' ', 
        imageUrl: mediaUrl || undefined,
        visibility: visibility
      }).unwrap();
      
      setContent('');
      removeFile();
      setVisibility('PUBLIC');
      toast.success('Post created successfully!');
    } catch (err: any) {
      setIsUploading(false);
      toast.error(err?.data?.message || 'Failed to create post. Please try again.');
    }
  };

  const isLoading = isCreating || isUploading;

  return (
    <div className="_feed_inner_text_area bg-white dark:bg-[#232E42] rounded-[6px] p-[24px] mb-[16px] transition-all">
      <div className="_feed_inner_text_area_box flex gap-[16px] mb-[20px]">
        <div className="_feed_inner_text_area_box_image w-[48px] h-[48px] flex-shrink-0">
          <img src={user?.avatarUrl || txtImg} alt="Image" className="_txt_img rounded-full object-cover w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="mb-[8px] flex flex-col items-start gap-[4px]">
            <span className="font-semibold text-[16px] text-[#312000] dark:text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'User Name'}
            </span>
            <div className="relative">
              <button 
                onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
                className="flex items-center gap-[4px] bg-[#F0F2F5] dark:bg-[#112032] px-[8px] py-[2px] rounded-[4px] text-[12px] font-medium text-[#666] dark:text-gray-400 hover:bg-[#E4E6EB] dark:hover:bg-[#2D3748] transition-all"
              >
                {visibility === 'PUBLIC' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                {visibility === 'PUBLIC' ? 'Public' : 'Private'}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showVisibilityDropdown && (
                <div className="absolute top-full left-0 mt-[4px] w-[150px] bg-white dark:bg-[#232E42] border border-[#F0F2F5] dark:border-[#2D3748] rounded-[6px] shadow-lg z-10 py-[8px]">
                  <button 
                    onClick={() => { setVisibility('PUBLIC'); setShowVisibilityDropdown(false); }}
                    className={`w-full flex items-center gap-[8px] px-[12px] py-[8px] text-[14px] hover:bg-[#F0F2F5] dark:hover:bg-[#112032] transition-all ${visibility === 'PUBLIC' ? 'text-[#1890FF] font-semibold' : 'text-[#666] dark:text-gray-400'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Public
                  </button>
                  <button 
                    onClick={() => { setVisibility('PRIVATE'); setShowVisibilityDropdown(false); }}
                    className={`w-full flex items-center gap-[8px] px-[12px] py-[8px] text-[14px] hover:bg-[#F0F2F5] dark:hover:bg-[#112032] transition-all ${visibility === 'PRIVATE' ? 'text-[#1890FF] font-semibold' : 'text-[#666] dark:text-gray-400'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Private
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="form-floating _feed_inner_text_area_box_form relative">
            <textarea 
              className="form-control _textarea w-full min-h-[100px] bg-[#F5F5F5] dark:bg-[#112032] border-none rounded-[6px] p-[16px] text-[16px] focus:outline-none dark:text-white placeholder:text-transparent peer" 
              placeholder="Leave a comment here" 
              id="floatingTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <label className="_feed_textarea_label absolute top-[16px] left-[16px] text-[#666] dark:text-gray-400 pointer-events-none transition-all peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 flex items-center gap-[8px]" htmlFor="floatingTextarea">
              Write something ...
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                <path fill="currentColor" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {preview && (
        <div className="mb-[20px] relative rounded-[6px] overflow-hidden group">
          {file?.type.startsWith('video/') ? (
            <video src={preview} controls className="w-full max-h-[300px] object-contain bg-black" />
          ) : (
            <img src={preview} alt="Preview" className="w-full max-h-[300px] object-contain bg-[#F5F5F5] dark:bg-[#112032]" />
          )}
          <button 
            onClick={removeFile}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      
      {/* Desktop Toolbar */}
      <div className="_feed_inner_text_area_bottom hidden lg:flex items-center justify-between border-t border-[#F0F2F5] dark:border-[#2D3748] pt-[16px]">
        <div className="_feed_inner_text_area_item flex items-center gap-[24px]">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="1.5" d="M17 3H3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
              <circle cx="6.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path stroke="currentColor" strokeWidth="1.5" d="M19 13l-5-5-6 6-3-3-4 4" />
            </svg>
            Photo
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="1.5" d="M1 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5z" />
              <path stroke="currentColor" strokeWidth="1.5" d="M15 7.5l4-3v11l-4-3" />
            </svg>
            Video
          </button>
          <button className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="1.5" d="M3 17h14M10 3v11m0 0l-4-4m4 4l4-4" />
            </svg>
            Event
          </button>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button 
            onClick={handlePost}
            disabled={isLoading}
            className="_feed_inner_text_area_btn_link bg-[#1890FF] text-white px-[32px] py-[8px] rounded-[6px] font-medium transition-all hover:shadow-md disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : (isCreating ? 'Posting...' : 'Post')}
          </button>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="_feed_inner_text_area_bottom_mobile lg:hidden border-t border-[#F0F2F5] dark:border-[#2D3748] pt-[16px]">
        <div className="flex items-center justify-between mb-[16px]">
          <div className="flex gap-[16px]">
            <button onClick={() => fileInputRef.current?.click()} className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M17 3H3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/><circle cx="6.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path stroke="currentColor" strokeWidth="1.5" d="M19 13l-5-5-6 6-3-3-4 4"/></svg></button>
            <button onClick={() => fileInputRef.current?.click()} className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M1 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"/><path stroke="currentColor" strokeWidth="1.5" d="M15 7.5l4-3v11l-4-3"/></svg></button>
            <button className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M3 17h14M10 3v11m0 0l-4-4m4 4l4-4"/></svg></button>
          </div>
          <button 
            onClick={handlePost}
            disabled={isLoading}
            className="bg-[#1890FF] text-white px-[24px] py-[6px] rounded-[6px] font-medium disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : (isCreating ? 'Posting...' : 'Post')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
