import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import noImage from "@/assets/no-image.webp";
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from "@/store/categorySlice";
import { Banner, Partners, Products, Services } from "@/components";
import axios from "axios";
import { setProducts } from "@/store/productSlice";

const Catalog: React.FC = () => {
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
        dispatch(setProducts(response.data.data));
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
      <div className="catalog-page">
        <div className="container">
          <div className="navigations">
            <Link to={"/"}>Bosh sahifa</Link>
            <span>
              <FaAngleRight />
            </span>
            <Link to={""}>
              {selectedCategory ? selectedCategory.name.uz : ""}
            </Link>
          </div>

          <div className="sub-categories">
            {selectedCategory?.sub_category.map((sub_category, index) => (
              <>
                <Link
                  to={`/catalog-details/${sub_category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(sub_category))}
                >
                  {sub_category.photo ? (
                    <img src={sub_category.photo} alt="" />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{sub_category.name.uz}</span>
                </Link>
                <Link
                  to={`/catalog-details/${sub_category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(sub_category))}
                >
                  {sub_category.photo ? (
                    <img src={sub_category.photo} alt="" />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{sub_category.name.uz}</span>
                </Link>
                <Link
                  to={`/catalog-details/${sub_category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(sub_category))}
                >
                  {sub_category.photo ? (
                    <img src={sub_category.photo} alt="" />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{sub_category.name.uz}</span>
                </Link>
                <Link
                  to={`/catalog-details/${sub_category.slug}`}
                  key={index}
                  onClick={() => dispatch(setSelectedSubCategory(sub_category))}
                >
                  {sub_category.photo ? (
                    <img src={sub_category.photo} alt="" />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                  <span>{sub_category.name.uz}</span>
                </Link>
              </>
            ))}
          </div>

          <Banner />
          <Products />
          <Partners />
          <Services />
        </div>
      </div>
    </>
  );
};

export default Catalog;
