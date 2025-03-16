import React from "react";
import { Link } from "react-router-dom";

import favImage from "@/assets/fav.png";
import { useAppSelector } from "@/store/hooks";
import { ProductItem } from "@/components";

const Favorites: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.productSlice);
  console.log(favorites)
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
              Ortga
            </Link>
            <div>
              <h2 className="title">Sevimlilar</h2>
              {favorites.length ? <p>{favorites.length} ta mahsulot</p> : ""}
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
                <h3 className="title">
                  Siz hali ham sevili mahsulot tanlamadingiz
                </h3>
                <p className="desc">
                  Sizga maʼqul kelgan mahsulotlarni <br /> sevimlilarga qo‘shing
                  va ularni buyurtma qiling
                </p>
                <Link to={"/"}>Bosh sahifaga o‘tish</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
