import React from "react";

import miniBanner1 from "@/assets/banner-images/mini-banner/mini-banner1.png";
import miniBanner2 from "@/assets/banner-images/mini-banner/mini-banner2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const Banner2: React.FC = () => {
  return (
    <>
      <div className="mini-banner section">
        <div className="container">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="discount-banner_swiper"
          >
            <SwiperSlide>
              <div className="context">
                <h2 className="title">Oshxona buyumlari uchun chegirma</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="context">
                <h2 className="title">Yumshoq to‘shak shirin uyqu garovi</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="context">
                <h2 className="title">Oshxona buyumlari uchun chegirma</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="context">
                <h2 className="title">Yumshoq to‘shak shirin uyqu garovi</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner2} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Banner2;
