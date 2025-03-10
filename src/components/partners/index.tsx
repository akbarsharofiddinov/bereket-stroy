import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPartners } from "@/store/productSlice";
import { FreeMode } from "swiper/modules";

import noImage from "@/assets/no-image.webp";

const Partners: React.FC = () => {
  const { partners } = useAppSelector((state) => state.productSlice);
  const dispatch = useAppDispatch();
  async function getAllPartnerBrands() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/brands",
        {
          headers: {
            "Accept-Language": "uz",
          },
        }
      );
      if (response.status === 200) dispatch(setPartners(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPartnerBrands();
  }, []);

  return (
    <>
      <div className="partners section">
        <div className="container">
          <div className="section-top">
            <h2 className="title">Mashhur brendlar</h2>
            <Link to={""}>
              Barchasi
              <span>
                <FaAngleRight />
              </span>
            </Link>
          </div>
          <div className="inner">
            {/* <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div> */}

            <Swiper
              slidesPerView={6}
              spaceBetween={"20px"}
              freeMode={true}
              loop={partners.length > 6}
              className="partners-swiper"
              modules={[FreeMode]}
            >
              {partners.map((item, index) => (
                <SwiperSlide key={index} className="partner">
                  {item.icon ? (
                    <img
                      src={`http://bereket.webclub.uz/storage/${item.icon}`}
                      alt=""
                    />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <p>{item.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
