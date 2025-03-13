import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";

import { Link, Outlet, useParams } from "react-router-dom";
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from "@/store/categorySlice";
import { Partners, Products, Services } from "@/components";
import axios from "axios";

import noImage from "@/assets/no-image.webp";
import { setAllProducts, setFilteredProducts } from "@/store/productSlice";
import { useTranslation } from "react-i18next";

const AllCatalogs: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { catalog_slug } = useParams();

  const { allProducts, filterType, filteredProducts } = useAppSelector(
    (state) => state.productSlice
  );
  const { catalogModal } = useAppSelector((state) => state.projectSlice);
  const { allCategories } = useAppSelector((state) => state.categorySlice);

  async function getProducts() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products`
      );

      if (response.status === 200) {
        dispatch(setAllProducts(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!allProducts) getProducts();
  }, [allProducts]);

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

  useEffect(() => {
    if (filterType === "low-price") {
      const filterproducts = [...allProducts];

      filterproducts.sort(
        (a, b) =>
          parseFloat(b.discounted_price) - parseFloat(a.discounted_price)
      );

      dispatch(setFilteredProducts(filterproducts));
    } else if (filterType === "rating") {
      const filterproducts = [...allProducts];

      filterproducts.sort((a, b) => a.rating - b.rating);

      dispatch(setFilteredProducts(filterproducts));
    } else {
      dispatch(setFilteredProducts([]));
    }
  }, [filterType]);

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
              <p>{allProducts.length} ta mahsulot topildi</p>
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

            <Products
              data={filteredProducts.length ? filteredProducts : allProducts}
            />
            <Partners />
            <Services />
          </div>
        </div>
      )}
    </>
  );
};

export default AllCatalogs;
