import React, { useRef } from 'react';
import cardPpl1 from '../../assets/images/card_ppl1.png';
import cardPpl2 from '../../assets/images/card_ppl2.png';
import cardPpl3 from '../../assets/images/card_ppl3.png';
import cardPpl4 from '../../assets/images/card_ppl4.png';
import miniPic from '../../assets/images/mini_pic.png';
import mobileStoryImg from '../../assets/images/mobile_story_img.png';
import mobileStoryImg1 from '../../assets/images/mobile_story_img1.png';
import mobileStoryImg2 from '../../assets/images/mobile_story_img2.png';

const Stories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Stories */}
      <div className="_feed_inner_ppl_card hidden lg:block mb-[16px] relative">
        <div className="_feed_inner_story_arrow absolute top-1/2 -translate-y-1/2 right-[-15px] z-10">
          <button 
            type="button" 
            onClick={scrollRight}
            className="_feed_inner_story_arrow_btn bg-[#1890FF] w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-md hover:bg-[#0070e0] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
        <div 
          ref={scrollRef}
          className="row flex flex-nowrap -mx-2 overflow-x-auto scrollbar-hide"
        >
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col flex-shrink-0 w-1/4 px-2">
            <div className="_feed_inner_profile_story relative rounded-[6px] overflow-hidden h-[180px] group cursor-pointer">
              <img src={cardPpl1} alt="Image" className="_profile_story_img w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              <div className="_feed_inner_story_txt absolute bottom-[15px] left-0 right-0 text-center">
                <div className="_feed_inner_story_btn mb-[8px] flex justify-center">
                  <button className="_feed_inner_story_btn_link bg-[#1890FF] w-[24px] h-[24px] rounded-full flex items-center justify-center border border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                      <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                    </svg>
                  </button>
                </div>
                <p className="_feed_inner_story_para text-white text-[12px] font-medium">Your Story</p>
              </div>
            </div>
          </div>
          {[cardPpl2, cardPpl3, cardPpl4, cardPpl2, cardPpl3, cardPpl4].map((img, idx) => (
            <div key={idx} className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col flex-shrink-0 w-1/4 px-2">
              <div className="_feed_inner_public_story relative rounded-[6px] overflow-hidden h-[180px] group cursor-pointer">
                <img src={img} alt="Image" className="_public_story_img w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-all"></div>
                <div className="_feed_inner_pulic_story_txt absolute bottom-[15px] left-[12px]">
                  <p className="_feed_inner_pulic_story_para text-white text-[12px] font-medium">Ryan Roslansky</p>
                </div>
                <div className="_feed_inner_public_mini absolute top-[12px] left-[12px] w-[32px] h-[32px] border-2 border-[#1890FF] rounded-full overflow-hidden">
                  <img src={miniPic} alt="Image" className="_public_mini_img w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stories */}
      <div className="_feed_inner_ppl_card_mobile lg:hidden mb-[16px] overflow-x-auto scrollbar-hide px-4 -mx-4">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list flex gap-[12px] pb-[4px]">
            <li className="_feed_inner_ppl_card_area_item flex-shrink-0 w-[70px] text-center">
              <div className="_feed_inner_ppl_card_area_link cursor-pointer">
                <div className="_feed_inner_ppl_card_area_story relative w-[60px] h-[60px] mx-auto mb-[8px]">
                  <img src={mobileStoryImg} alt="Image" className="_card_story_img w-full h-full rounded-full object-cover" />
                  <div className="_feed_inner_ppl_btn absolute bottom-0 right-0">
                    <button className="_feed_inner_ppl_btn_link bg-[#1890FF] w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7"/>
                      </svg>	  
                    </button>
                  </div>
                </div>
                <p className="_feed_inner_ppl_card_area_link_txt text-[12px] text-[#212121] dark:text-gray-400 font-medium">Your Story</p>
              </div>
            </li>
            {[mobileStoryImg1, mobileStoryImg2, mobileStoryImg1, mobileStoryImg2].map((img, idx) => (
              <li key={idx} className="_feed_inner_ppl_card_area_item flex-shrink-0 w-[70px] text-center">
                <div className="_feed_inner_ppl_card_area_link cursor-pointer">
                  <div className={`_feed_inner_ppl_card_area_story_${idx % 2 === 0 ? 'active' : 'inactive'} w-[60px] h-[60px] mx-auto mb-[8px] p-[2px] rounded-full border-2 ${idx % 2 === 0 ? 'border-[#1890FF]' : 'border-gray-200'}`}>
                    <img src={img} alt="Image" className="_card_story_img1 w-full h-full rounded-full object-cover" />
                  </div>
                  <p className="_feed_inner_ppl_card_area_txt text-[12px] text-[#212121] dark:text-gray-400 font-medium">Ryan...</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stories;
