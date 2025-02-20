import React from "react";
import banner1 from "@/assets/banner-images/banner-1.png";
import banner2 from "@/assets/banner-images/banner-2.png";
import banner3 from "@/assets/banner-images/banner-3.png";

const Banner: React.FC = () => {
  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="inner">
            <div className="box box-1">
              <img src={banner1} alt="banner image" />
              <div className="context">
                <h1 className="title">Mukammal tamirlash</h1>
                <p>Sifatli mebel bilan</p>
                <button>Batafsil</button>
              </div>
            </div>
            <div className="box box-2">
              <img src={banner2} alt="banner image" />
              <div className="context">
                <h1 className="title">Bejirim ko‘rinish</h1>
                <p>Qulay narxlarda</p>
              </div>
            </div>
            <div className="box box-3">
              <img src={banner3} alt="banner image" />
              <div className="context">
                <h1 className="title">Oshxona buyumlari</h1>
                <p>Xursandchilik bilan pishiring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
