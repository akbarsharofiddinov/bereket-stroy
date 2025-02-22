import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import partner from "@/assets/partners/image.png";

const Partners: React.FC = () => {
  return (
    <>
      <div className="partners section">
        <div className="container">
          <div className="section-top">
            <h2 className="title">Mashhur brendlar</h2>
            <Link to={""}>
              Barchasi
              <span>
                <FaAngleRight />
              </span>
            </Link>
          </div>
          <div className="inner">
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
            <div className="partner">
              <img src={partner} alt="partner" />
              <p>Bauproffe</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
