import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SkeletonImage from "antd/es/skeleton/Image";

const Banner: React.FC = () => {
  const [bigBanners, setBigBanners] = useState<IBanner>();
  const [smallBanners, setSmallBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(false);

  const { i18n, t } = useTranslation();

  async function getBanners() {
    setLoading(true);
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

      if (bigBannerRes.status === 200) {
        setBigBanners(bigBannerRes.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            <div className="box box-1">
              {loading ? (
                <SkeletonImage active />
              ) : (
                <>
                  <img
                    src={`http://bereket.webclub.uz/storage/${bigBanners?.photo}`}
                    alt=""
                  />
                  <div className="context">
                    <h1 className="title">{bigBanners?.header}</h1>
                    <p>{bigBanners?.text}</p>
                    <Link to={bigBanners?.url!}>{t("all")}</Link>
                  </div>
                </>
              )}
            </div>
            {loading ? (
              <>
                <div className="box box-2">
                  <SkeletonImage active />
                </div>
                <div className="box box-3">
                  <SkeletonImage active />
                </div>
              </>
            ) : (
              smallBanners.map((item, index) => (
                <a
                  href={item.url}
                  className={`box box-${index + 2}`}
                  key={index}
                >
                  <img
                    src={`http://bereket.webclub.uz/storage/${item.photo}`}
                    alt=""
                  />
                  <div className="context">
                    <h1 className="title">{item.header}</h1>
                    <p>{item.text}</p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
