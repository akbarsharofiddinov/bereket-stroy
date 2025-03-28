import React, { useEffect } from "react";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPartners } from "@/store/productSlice";
import { FreeMode } from "swiper/modules";

import noImage from "@/assets/no-image.webp";
import { useTranslation } from "react-i18next";

const Partners: React.FC = () => {
  const { partners } = useAppSelector((state) => state.productSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
      <div className="partners section" id="partners">
        <div className="container">
          <div className="section-top">
            <h2 className="title">{t("famous_brands")}</h2>
          </div>
          <div className="inner">
            <Swiper
              slidesPerView={6}
              spaceBetween={"20px"}
              freeMode={true}
              loop={partners.length > 6}
              className="partners-swiper"
              modules={[FreeMode]}
              breakpoints={{
                400: {
                  slidesPerView: "auto"
                },

                800: {
                  slidesPerView: 6
                }
              }}
            >
              {partners.map((item, index) => (
                <SwiperSlide key={index} className="partner">
                  {item.icon ? (
                    <img
                      src={`http://bereket.webclub.uz/storage/${item.icon}`}
                      alt="bereket-strop_photo"
                    />
                  ) : (
                    <img src={noImage} alt="bereket-strop_photo" />
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
