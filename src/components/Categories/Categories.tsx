import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import category1 from "@/assets/categories/category-1.png";
import category2 from "@/assets/categories/category-2.png";
import category3 from "@/assets/categories/category-3.png";
import category4 from "@/assets/categories/category-4.png";

const Categories: React.FC = () => {
  return (
    <>
      <div className="categories section">
        <div className="container">
          <div className="inner">
            <div className="section-top">
              <h2 className="title">Kategoriyalar</h2>
              <Link to={""}>
                Barchasi
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </div>

            <div className="category-boxes">
              <Link to={""} className="link-1">
                <img src={category1} alt="" />
                <p>Santexnika</p>
              </Link>
              <Link to={""} className="link-2">
                <img src={category2} alt="" />
                <p>Mebel va jihozlar</p>
              </Link>
              <Link to={""} className="link-3">
                <img src={category3} alt="" />
                <p>Asboblar</p>
              </Link>
              <Link to={""} className="link-4">
                <img src={category4} alt="" />
                <p>Yoritish jihozlari</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
