import React from "react";
import notFound404 from "@/assets/404/404.png";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <>
      <div className="error-component">
        <div className="inner">
          <img src={notFound404} alt="" />
          <h2 className="title">Kechirasiz ushbu sahifa topilmadi</h2>
          <Link to={"/"}>Bosh sahifaga o‘tish</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
