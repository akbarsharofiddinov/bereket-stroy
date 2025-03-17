import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import SkeletonImage from "antd/es/skeleton/Image";

const Banner2: React.FC = () => {
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);
  const [loading, setLoading] = useState(false);

  async function getDiscounts() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/discounts"
      );
      if (response.status === 200) {
        setDiscounts(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDiscounts();
  }, []);

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
            {/* <SwiperSlide>
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
            </SwiperSlide> */}

            {loading ? (
              <>
                <SwiperSlide>
                  <SkeletonImage active />
                </SwiperSlide>
                <SwiperSlide>
                  <SkeletonImage active />
                </SwiperSlide>
              </>
            ) : discounts.length ? (
              discounts.map((item, index) => (
                // <>
                //   <SwiperSlide key={index}>
                //     <div className="context">
                //       <h2 className="title">{item.name}</h2>
                //       {/* <p className="desc">{}</p> */}
                //       <div className="img-box">
                //         <img
                //           src={`http://bereket.webclub.uz/storage/${item.photo}`}
                //           alt=""
                //         />
                //       </div>
                //     </div>
                //   </SwiperSlide>
                //   <SwiperSlide key={index}>
                //     <div className="context">
                //       <h2 className="title">{item.name}</h2>
                //       {/* <p className="desc">{}</p> */}
                //       <div className="img-box">
                //         <img
                //           src={`http://bereket.webclub.uz/storage/${item.photo}`}
                //           alt=""
                //         />
                //       </div>
                //     </div>
                //   </SwiperSlide>
                //   <SwiperSlide key={index}>
                //   <div className="context">
                //     <h2 className="title">{item.name}</h2>
                //     {/* <p className="desc">{}</p> */}
                //     <div className="img-box">
                //       <img
                //         src={`http://bereket.webclub.uz/storage/${item.photo}`}
                //         alt=""
                //       />
                //     </div>
                //   </div>
                // </SwiperSlide>
                // </>

                <SwiperSlide key={index}>
                  <div className="context">
                    <h2 className="title">{item.name}</h2>
                    {/* <p className="desc">{}</p> */}
                    <div className="img-box">
                      <img
                        src={`http://bereket.webclub.uz/storage/${item.photo}`}
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              ""
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Banner2;
