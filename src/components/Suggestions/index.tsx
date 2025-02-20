import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ProductItem } from "@/components";


const Suggestions: React.FC = () => {
  return (
    <>
      <div className="suggestions section">
        <div className="container">
          <div className="inner">
            <div className="section-top">
              <h2 className="title">Eng yaxshi takliflar</h2>
              <Link to={""}>
                Barchasi
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </div>

            <div className="products">
              <ProductItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
