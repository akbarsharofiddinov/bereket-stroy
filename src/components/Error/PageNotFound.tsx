import React from "react";
import notFound404 from "@/assets/404/404.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PageNotFound: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="error-component">
        <div className="inner">
          <img src={notFound404} alt="bereket-strop_photo" />
          <h2 className="title">Kechirasiz ushbu sahifa topilmadi</h2>
          <Link to={"/"}>{t('home_page')}ga o‘tish</Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
