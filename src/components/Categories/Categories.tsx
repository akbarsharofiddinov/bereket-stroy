import { useGetAllCategoriesQuery } from "@/store/API/RTKQuery";
import { setAllCategories } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SkeletonImage from "antd/es/skeleton/Image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch()

  const { data, isSuccess, isFetching, refetch } = useGetAllCategoriesQuery()
  if (isSuccess) dispatch(setAllCategories(data.data));

  useEffect(() => {
    refetch()
  }, [i18n.language]);

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

                      {isFetching ? (
                        <SkeletonImage active />
                      ) :
                        isSuccess ? (
                          <>
                            <img
                              src={`http://bereket.webclub.uz/storage/${item.icon}`}
                            />
                            <h2 className="title">{item.name}</h2>
                          </>
                        ) : (
                          ""
                        )
                      }
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
