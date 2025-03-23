import React from "react";
import SkeletonImage from "antd/es/skeleton/Image";
import { Link } from "react-router-dom";
import { useGetSmallBannersQuery, useGetTopBannerQuery } from "@/store/API/RTKQuery";

const Banner: React.FC = () => {

  const { isLoading, isSuccess, data } = useGetTopBannerQuery();
  const { isLoading: smallBannerLoading, isSuccess: smallBannerSuccess, data: smallBannersData } = useGetSmallBannersQuery();

  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="inner">

            {isLoading ? (
              <a href="#" className="box box-1">
                <SkeletonImage active />
              </a>
            ) : isSuccess ? (
              <a
                href={`/catalogs/${data.data.url.split("/")[data.data.url.split("/").length - 1]
                  }`}
                className="box box-1"
              >
                <img
                  src={`http://bereket.webclub.uz/storage/${data.data.photo}`}
                  alt=""
                />
              </a>
            ) : ""}
            {smallBannerLoading ? (
              <>
                <div className="box box-2">
                  <SkeletonImage active />
                </div>
                <div className="box box-3">
                  <SkeletonImage active />
                </div>
              </>
            ) : smallBannerSuccess ? (
              smallBannersData.data.map((item, index) => (
                <Link
                  to={`/catalogs/${item?.url.split("/")[item.url.split("/").length - 1]
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
            ) : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
