import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SkeletonImage from "antd/es/skeleton/Image";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  const [bigBanners, setBigBanners] = useState<IBanner>();
  const [smallBanners, setSmallBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(false);

  const { i18n } = useTranslation();

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
            <a
              href={`/catalogs/${
                bigBanners?.url.split("/")[bigBanners.url.split("/").length - 1]
              }`}
              className="box box-1"
            >
              {loading ? (
                <SkeletonImage active />
              ) : (
                <img
                  src={`http://bereket.webclub.uz/storage/${bigBanners?.photo}`}
                  alt=""
                />
              )}
            </a>
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
                <Link
                  to={`/catalogs/${
                    item?.url.split("/")[item.url.split("/").length - 1]
                  }`}
                  className={`box box-${index + 2}`}
                  key={index}
                >
                  <img
                    src={`http://bereket.webclub.uz/storage/${item.photo}`}
                    alt=""
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
