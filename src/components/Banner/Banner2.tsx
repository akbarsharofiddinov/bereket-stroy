import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SkeletonImage from "antd/es/skeleton/Image";
import { useNavigate } from "react-router-dom";

interface IProps {
  loading: boolean;
  discounts: IDiscount[];
}

const Banner2: React.FC<IProps> = ({ discounts, loading }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mini-banner section" id="banner">
        <div className="container">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              800: {
                slidesPerView: 2,
              }
            }}
            className="discount-banner_swiper"
          >

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

                <SwiperSlide
                  key={index}
                  onClick={() => navigate(`/discounts/${item.slug}`)}
                >
                  <div className="img-box">
                    <img
                      src={`http://bereket.webclub.uz/storage/${item.photo}`}
                      alt="bereket-strop_photo"
                    />
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
