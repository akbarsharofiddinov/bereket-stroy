import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ProductItem } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  title: string;
  link: string;
  data?: [];
}

const Suggestions: React.FC<IProps> = ({ link, title }) => {
  const { allProducts: products } = useAppSelector((state) => state.productSlice);
  
  return (
    <>
      <div className="suggestions section">
        <div className="container">
          <div className="inner">
            <div className="section-top">
              <h2 className="title">{title}</h2>
              <Link to={link}>
                Barchasi
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </div>

            <div className="products">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                
                className="suggestions-swiper"
              >
                {products.length
                  ? products.map((product, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem data={product} />
                      </SwiperSlide>
                    ))
                  : ""}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
