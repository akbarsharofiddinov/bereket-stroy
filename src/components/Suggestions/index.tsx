import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ProductItem } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";

import SkeletonImage from "antd/es/skeleton/Image";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
  link: string;
  data: IProduct[];
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

const Suggestions: React.FC<IProps> = ({
  link,
  title,
  isLoading,
  data,
  isError,
  isSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="suggestions section">
        <div className="container">
          <div className="inner">
            <div className="section-top">
              <h2 className="title">{title}</h2>
              {link ? (
                <Link to={link}>
                  {t("all")}
                  <span>
                    <FaAngleRight />
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>

            <div className="products">
              {isLoading ? (
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={20}
                  className="suggestions-swiper"
                >
                  <SwiperSlide>
                    <SkeletonImage active />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SkeletonImage active />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SkeletonImage active />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SkeletonImage active />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SkeletonImage active />
                  </SwiperSlide>
                </Swiper>
              ) : isError ? (
                <h1>Error</h1>
              ) : isSuccess ? (
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={20}
                  className="suggestions-swiper"
                >
                  {data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ProductItem data={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
