import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";

import { Link, Outlet, useParams } from "react-router-dom";
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from "@/store/categorySlice";
import { Partners, Products, Services } from "@/components";

import noImage from "@/assets/no-image.webp";
import { useTranslation } from "react-i18next";

const AllCatalogs: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { catalog_slug } = useParams();

  const { catalogModal } = useAppSelector((state) => state.projectSlice);
  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { totalProducts } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    if (!catalogModal) {
      if (catalog_slug) {
        const findCategory = allCategories.find(
          (item) => item.slug === catalog_slug
        );
        dispatch(setSelectedCategory(findCategory));
      }
    }
  }, [catalogModal]);

  return (
    <>
      {catalog_slug ? (
        <Outlet />
      ) : (
        <div className="catalog-page">
          <div className="container">
            <div className="navigations">
              <Link to={"/"}>Bosh sahifa</Link>
            </div>

            <div className="top">
              <h2 className="title">{t("category")}</h2>
              <p>{totalProducts} ta mahsulot topildi</p>
            </div>

            <div className="sub-categories">
              {allCategories.map((category, index) => (
                <Link
                  to={`/catalogs/${category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(category))}
                >
                  {category.photo ? (
                    <img
                      src={`http://bereket.webclub.uz/storage/${category.photo}`}
                    />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>

            <Products />

            <Partners />
            <Services />
          </div>
        </div>
      )}
    </>
  );
};

export default AllCatalogs;
