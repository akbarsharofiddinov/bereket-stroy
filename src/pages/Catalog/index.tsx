import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from "@/store/categorySlice";
import { Partners, Products, Services } from "@/components";
import axios from "axios";

import noImage from "@/assets/no-image.webp";

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const dispatch = useAppDispatch();
  const params = useParams();
  const { selectedCategory, allCategories } = useAppSelector(
    (state) => state.categorySlice
  );

  async function getProducts(category_slug: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?category_slug=${category_slug}`
      );

      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedCategory) {
      getProducts(selectedCategory.slug);
    } else {
      const findCategory = allCategories.find(
        (category) => category.slug === params.catalog_slug
      );
      dispatch(setSelectedCategory(findCategory));
    }
  }, [selectedCategory]);

  return (
    <>
      {params.sub_catalog_slug ? (
        <>
          <Outlet />
        </>
      ) : (
        <div className="catalog-page">
          <div className="container">
            <div className="navigations">
              <Link to={"/"}>Bosh sahifa</Link>
              <span>
                <FaAngleRight />
              </span>
              <Link to={""}>
                {selectedCategory ? selectedCategory.name : ""}
              </Link>
            </div>

            <div className="top">
              <h2 className="title">{selectedCategory?.name}</h2>
              <p>{products.length} ta mahsulot topildi</p>
            </div>

            <div className="sub-categories">
              {selectedCategory?.sub_category.map((sub_category, index) => (
                <Link
                  to={`/catalogs/${selectedCategory.slug}/${sub_category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(sub_category))}
                >
                  {sub_category.photo ? (
                    <img
                      src={`http://bereket.webclub.uz/storage/${sub_category.photo}`}
                    />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{sub_category.name}</span>
                </Link>
              ))}
            </div>

            <Products data={products} />
            <Partners />
            <Services />
          </div>
        </div>
      )}
    </>
  );
};

export default Catalog;
