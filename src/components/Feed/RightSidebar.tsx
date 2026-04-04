import React from 'react';
import { Link } from 'react-router-dom';
import recommend1 from '../../assets/images/recommend1.png';
import recommend2 from '../../assets/images/recommend2.png';
import f1 from '../../assets/images/f1.png';
import f2 from '../../assets/images/f2.png';
import f3 from '../../assets/images/f3.png';
import f4 from '../../assets/images/f4.png';
import f5 from '../../assets/images/f5.png';
import f6 from '../../assets/images/f6.png';
import f7 from '../../assets/images/f7.png';
import f8 from '../../assets/images/f8.png';
import f9 from '../../assets/images/f9.png';
import man from '../../assets/images/man.png';

const RightSidebar: React.FC = () => {
 

  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 hidden lg:block w-1/4 px-4 h-full">
      <div className="_layout_right_sidebar_wrap flex flex-col h-full overflow-y-auto scrollbar-hide pt-[18px]">
        
       

        {/* You Might Like Section */}
        <div className="_layout_right_sidebar_inner mb-[16px]">
          <div className="_right_inner_area_suggest _feed_inner_area bg-white dark:bg-[#232E42] p-[24px] pb-[6px] rounded-[6px] transition-all">
            <div className="_right_inner_area_suggest_content flex items-center justify-between mb-[24px]">
              <h4 className="_right_inner_area_suggest_content_title _title5 text-[20px] font-medium text-[#212121] dark:text-white">You Might Like</h4>
              <Link className="_right_inner_area_suggest_content_txt_link text-[#1890FF] text-[14px]" to="#0">See All</Link>
            </div>
            {[
              { name: 'Ryan Roslansky', role: 'CEO of Linkedin', img: recommend1 },
              { name: 'Dylan Field', role: 'CEO of Figma', img: recommend2 }
            ].map((person, idx) => (
              <div key={idx} className="_right_inner_area_suggest_info mb-[24px]">
                <div className="_right_inner_area_suggest_info_box flex items-center mb-[16px]">
                  <div className="_right_inner_area_suggest_info_image mr-[12px] w-[40px] h-[40px]">
                    <img src={person.img} alt="Image" className="_info_img rounded-full object-cover" />
                  </div>
                  <div className="_right_inner_area_suggest_info_txt">
                    <h4 className="_right_inner_area_suggest_info_title text-[14px] font-semibold text-[#212121] dark:text-white">{person.name}</h4>
                    <p className="_right_inner_area_suggest_info_para text-[12px] text-[#666] dark:text-gray-400">{person.role}</p>
                  </div>
                </div>
                <div className="_right_inner_area_suggest_info_btn_grp flex gap-[12px]">
                  <button className="_right_inner_area_suggest_info_btn_link bg-[#1890FF] text-white flex-1 py-[6px] rounded-[4px] text-[13px] font-medium">Accept</button>
                  <button className="_right_inner_area_suggest_info_btn_link1 bg-[#F0F2F5] dark:bg-[#112032] text-[#212121] dark:text-gray-400 flex-1 py-[6px] rounded-[4px] text-[13px] font-medium">Ignore</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Friends Section */}
        <div className="_layout_right_sidebar_inner mb-[16px]">
          <div className="_right_inner_area_friends _feed_inner_area bg-white dark:bg-[#232E42] p-[24px] pb-[6px] rounded-[6px] transition-all">
            <div className="_right_inner_area_friends_content flex items-center justify-between mb-[24px]">
              <h4 className="_right_inner_area_friends_content_title _title5 text-[20px] font-medium text-[#212121] dark:text-white">Your Friends</h4>
              <div className="_right_inner_area_friends_content_search relative">
                <svg className="absolute left-[8px] top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 17 17">
                  <circle cx="7" cy="7" r="6" stroke="#666" />
                  <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                </svg>
              </div>
            </div>
            {[
              { name: 'Steve Jobs', img: f1, online: true },
              { name: 'Ryan Roslansky', img: f2, online: true },
              { name: 'Dylan Field', img: f3, online: false },
              { name: 'Steve Jobs', img: f4, online: true },
              { name: 'Ryan Roslansky', img: f5, online: true },
              { name: 'Dylan Field', img: f6, online: false },
              { name: 'Steve Jobs', img: f7, online: true },
              { name: 'Ryan Roslansky', img: f8, online: true },
              { name: 'Dylan Field', img: f9, online: false },
              { name: 'Steve Jobs', img: man, online: true }
            ].map((friend, idx) => (
              <div key={idx} className="_right_inner_area_friends_info flex items-center justify-between mb-[24px] cursor-pointer group">
                <div className="_right_inner_area_friends_info_box flex items-center">
                  <div className="_right_inner_area_friends_info_image relative mr-[12px] w-[32px] h-[32px]">
                    <img src={friend.img} alt="Image" className="_info_img rounded-full object-cover" />
                    {friend.online && <span className="_online_status absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#0ACF83] border-2 border-white dark:border-[#232E42] rounded-full"></span>}
                  </div>
                  <div className="_right_inner_area_friends_info_txt">
                    <h4 className="_right_inner_area_friends_info_title text-[14px] font-semibold text-[#212121] dark:text-white group-hover:text-[#1890FF] transition-all">{friend.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
