import { setSelectedSubCategory } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import noImage from "@/assets/no-image.webp";
import { Partners, Products, Services } from "@/components";
import axios from "axios";
import { setAllProducts } from "@/store/productSlice";

const SubCatalogDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedSubCategory, selectedCategory } = useAppSelector(
    (state) => state.categorySlice
  );

  const params = useParams();
  const { allProducts } = useAppSelector((state) => state.productSlice);

  async function getProducts(category_slug: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?sub_category_slug=${category_slug}`
      );

      if (response.status === 200) {
        dispatch(setAllProducts(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.sub_catalog_slug) {
      const findSubCategory = selectedCategory?.sub_category?.find(
        (item) => item.slug === params.sub_catalog_slug
      );

      dispatch(setSelectedSubCategory(findSubCategory));
      getProducts(params.sub_catalog_slug);
    }
  }, [params.sub_catalog_slug]);

  return (
    <>
      {params.sub_sub_catalog_slug ? (
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
              <Link to={`/catalogs/${selectedCategory?.slug!}`}>
                {selectedCategory && selectedCategory.name}
              </Link>
              <span>
                <FaAngleRight />
              </span>
              <Link
                to={`/catalogs/${selectedCategory?.slug!}/${selectedSubCategory?.slug!}`}
              >
                {selectedSubCategory && selectedSubCategory.name}
              </Link>
            </div>

            <div className="top">
              <h2 className="title">{selectedSubCategory?.name}</h2>
              <p>{allProducts.length} ta mahsulot topildi</p>
            </div>

            <div className="sub-categories">
              {selectedSubCategory?.sub_sub_category?.map(
                (sub_sub_category, index) => (
                  <Link
                    to={`/catalogs/${selectedCategory?.slug}/${selectedSubCategory.slug}/${sub_sub_category.slug}`}
                    key={index}
                    onClick={() =>
                      dispatch(setSelectedSubCategory(sub_sub_category))
                    }
                  >
                    {sub_sub_category.photo ? (
                      <img
                        src={`http://bereket.webclub.uz/storage/${sub_sub_category.photo}`}
                      />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                    <span>{sub_sub_category.name}</span>
                  </Link>
                )
              )}
            </div>

            <Products data={allProducts} />
            <Partners />
            <Services />
          </div>
        </div>
      )}
    </>
  );
};

export default SubCatalogDetails;
