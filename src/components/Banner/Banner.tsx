import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const [bigBanners, setBigBanners] = useState<IBanner>();
  const [smallBanners, setSmallBanners] = useState<IBanner[]>([]);

  const { i18n } = useTranslation();

  async function getBanners() {
    try {
      const smallBannerRes = await axios.get(
        "https://bereket.webclub.uz/api/small-banner",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (smallBannerRes.status === 200)
        setSmallBanners(smallBannerRes.data.data);

      const bigBannerRes = await axios.get(
        "https://bereket.webclub.uz/api/big-banner",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );

      if (bigBannerRes.status === 200) setBigBanners(bigBannerRes.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="inner">
            {/* <div className="box box-1">
              <img src={banner1} alt="banner image" />
              <div className="context">
                <h1 className="title">Mukammal tamirlash</h1>
                <p>Sifatli mebel bilan</p>
                <Link to={""}>Batafsil</Link>
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
            </div> */}

            <div className="box box-1">
              <img
                src={`http://bereket.webclub.uz/storage/${bigBanners?.photo}`}
                alt=""
              />
              <div className="context">
                <h1 className="title">{bigBanners?.header}</h1>
                <p>{bigBanners?.text}</p>
                <Link to={bigBanners?.url!}>Barchasi</Link>
              </div>
            </div>
            {smallBanners.map((item, index) => (
              <a href={item.url} className={`box box-${index + 2}`} key={index}>
                <img
                  src={`http://bereket.webclub.uz/storage/${item.photo}`}
                  alt=""
                />
                <div className="context">
                  <h1 className="title">{item.header}</h1>
                  <p>{item.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
