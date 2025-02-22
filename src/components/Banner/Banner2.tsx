import React from "react";

import miniBanner1 from "@/assets/banner-images/mini-banner/mini-banner1.png";
import miniBanner2 from "@/assets/banner-images/mini-banner/mini-banner2.png";

const Banner2: React.FC = () => {
  return (
    <>
      <div className="mini-banner section">
        <div className="container">
          <div className="inner">
            <div className="banner-box">
              <div className="context">
                <h2 className="title">Oshxona buyumlari uchun chegirma</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner1} alt="" />
              </div>
            </div>
            <div className="banner-box">
              <div className="context">
                <h2 className="title">Yumshoq to‘shak shirin uyqu garovi</h2>
                <p className="desc">Chegirma 15-Fevralga qadar davom etadi</p>
              </div>
              <div className="img-box">
                <img src={miniBanner2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner2;
