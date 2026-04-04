import React from 'react';
import txtImg from '../../assets/images/txt_img.png';

const PostCreator: React.FC = () => {
  return (
    <div className="_feed_inner_text_area bg-white dark:bg-[#232E42] rounded-[6px] p-[24px] mb-[16px] transition-all">
      <div className="_feed_inner_text_area_box flex gap-[16px] mb-[20px]">
        <div className="_feed_inner_text_area_box_image w-[48px] h-[48px] flex-shrink-0">
          <img src={txtImg} alt="Image" className="_txt_img rounded-full object-cover" />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form flex-1 relative">
          <textarea className="form-control _textarea w-full min-h-[100px] bg-[#F5F5F5] dark:bg-[#112032] border-none rounded-[6px] p-[16px] text-[16px] focus:outline-none dark:text-white placeholder:text-transparent peer" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
          <label className="_feed_textarea_label absolute top-[16px] left-[16px] text-[#666] dark:text-gray-400 pointer-events-none transition-all peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 flex items-center gap-[8px]" htmlFor="floatingTextarea">
            Write something ...
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
              <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
            </svg>
          </label>
        </div>
      </div>
      
      {/* Desktop Toolbar */}
      <div className="_feed_inner_text_area_bottom hidden lg:flex items-center justify-between border-t border-[#F0F2F5] dark:border-[#2D3748] pt-[16px]">
        <div className="_feed_inner_text_area_item flex items-center gap-[24px]">
          <button className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="#666" strokeWidth="1.5" d="M17 3H3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
              <circle cx="6.5" cy="7.5" r="1.5" stroke="#666" strokeWidth="1.5" />
              <path stroke="#666" strokeWidth="1.5" d="M19 13l-5-5-6 6-3-3-4 4" />
            </svg>
            Photo
          </button>
          <button className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="#666" strokeWidth="1.5" d="M1 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5z" />
              <path stroke="#666" strokeWidth="1.5" d="M15 7.5l4-3v11l-4-3" />
            </svg>
            Video
          </button>
          <button className="flex items-center gap-[8px] text-[14px] text-[#666] dark:text-gray-400 hover:text-[#1890FF] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="#666" strokeWidth="1.5" d="M3 17h14M10 3v11m0 0l-4-4m4 4l4-4" />
            </svg>
            Event
          </button>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button className="_feed_inner_text_area_btn_link bg-[#1890FF] text-white px-[32px] py-[8px] rounded-[6px] font-medium transition-all hover:shadow-md">Post</button>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="_feed_inner_text_area_bottom_mobile lg:hidden border-t border-[#F0F2F5] dark:border-[#2D3748] pt-[16px]">
        <div className="flex items-center justify-between mb-[16px]">
          <div className="flex gap-[16px]">
            <button className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M17 3H3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/><circle cx="6.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path stroke="currentColor" strokeWidth="1.5" d="M19 13l-5-5-6 6-3-3-4 4"/></svg></button>
            <button className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M1 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"/><path stroke="currentColor" strokeWidth="1.5" d="M15 7.5l4-3v11l-4-3"/></svg></button>
            <button className="text-[#666] dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" d="M3 17h14M10 3v11m0 0l-4-4m4 4l4-4"/></svg></button>
          </div>
          <button className="bg-[#1890FF] text-white px-[24px] py-[6px] rounded-[6px] font-medium">Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
