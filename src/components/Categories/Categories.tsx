import { useAppSelector } from "@/store/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { t } = useTranslation();

  return (
    <>
      <div className="categories section">
        <div className="container">
          <div className="inner">
            <div className="category-boxes">
              {allCategories.length ? (
                <>
                  {allCategories.map((item, index) => (
                    <Link to={`catalogs/${item.slug}`} key={index}>
                      {item.icon ? (
                        <img
                          src={`http://bereket.webclub.uz/storage/${item.icon}`}
                        />
                      ) : (
                        ""
                      )}
                      <h2 className="title">{item.name}</h2>
                    </Link>
                  ))}
                  <Link to={"catalogs"}>
                    <span>
                      <svg
                        width="49"
                        height="49"
                        viewBox="0 0 49 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.75 3.32196C2.75 3.32196 37.9594 0.353895 43.3031 5.69708C48.6463 11.0403 45.6775 46.25 45.6775 46.25"
                          stroke="black"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <h2 className="title">{t("show_all")}</h2>
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
