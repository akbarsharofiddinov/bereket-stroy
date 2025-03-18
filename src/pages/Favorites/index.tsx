import React from "react";
import { Link } from "react-router-dom";

import favImage from "@/assets/fav.png";
import { useAppSelector } from "@/store/hooks";
import { ProductItem } from "@/components";
import { useTranslation } from "react-i18next";

const Favorites: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.productSlice);

  const { t } = useTranslation();

  return (
    <>
      <div className="favorites-page">
        <div className="container">
          <div className={favorites.length ? "top" : "top center"}>
            <Link to={"/"}>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11.9998H20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.99997 17C8.99997 17 4.00002 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {t("back")}
            </Link>
            <div>
              <h2 className="title">{t("favourites")}</h2>
              {favorites.length ? (
                <p>
                  {favorites.length} {t("counting")} {t("product")}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={favorites.length ? "inner" : "inner center"}>
            {favorites.length ? (
              <div className="fav-products">
                {favorites.map((product, index) => (
                  <ProductItem data={product} key={index} />
                ))}
              </div>
            ) : (
              <div className="no-favs">
                <img src={favImage} alt="" />
                <h3 className="title">{t("no_favs_title")}</h3>
                <p className="desc">{t("no_favs_desc")}</p>
                <Link to={"/"}>{t("go_home_page")}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
