import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from "@/store/categorySlice";
import { Partners, Products, Services } from "@/components";

import noImage from "@/assets/no-image.webp";
import { useTranslation } from "react-i18next";
import SkeletonImage from "antd/es/skeleton/Image";

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { selectedCategory, allCategories, isLoading } = useAppSelector(
    (state) => state.categorySlice
  );

  const [seo, setSeo] = useState<MetaData | null>(null);

  const { t } = useTranslation()

  const { totalProducts } = useAppSelector((state) => state.productSlice);


  useEffect(() => {
    if (params.catalog_slug) {
      const findCategory = allCategories.find(
        (category) => category.slug === params.catalog_slug
      );
      if (findCategory) {
        dispatch(setSelectedCategory(findCategory));
        setSeo(findCategory.seo)
      }
    }
  }, [params, allCategories]);



  return (
    <>
      {params.sub_catalog_slug ? (
        <>
          <Outlet />
        </>
      ) : seo ? (
        <>
          <title>{seo.title}</title>
          <meta name="description" content={seo.meta_description} />
          <link rel="canonical" href={`https://bereket-stroy.uz/${seo.canonical_url}`} />
          <meta property="og:title" content={seo["og:title"]} />
          <meta property="og:description" content={seo["og:description"]} />
          <meta property="og:url" content={seo["og:url"]} />
          <meta property="meta_keywords" content={seo["meta_keywords"]} />
          <div className="catalog-page">
            <div className="container">
              <div className="navigations">
                <Link to={"/"}>{t('home_page')}</Link>
                <span>
                  <FaAngleRight />
                </span>
                <Link to={""}>
                  {selectedCategory ? selectedCategory.name : ""}
                </Link>
              </div>

              <div className="top">
                <h2 className="title">{selectedCategory?.name}</h2>
                <p>{totalProducts} {`${t('counting')} ${t('product_found')}`}</p>
              </div>


              <div className="sub-categories">
                {isLoading ? (
                  <SkeletonImage active />
                ) : (
                  selectedCategory?.sub_category.map((sub_category, index) => (
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
                        <img src={noImage} alt="bereket-strop_photo" />
                      )}
                      <span>{sub_category.name}</span>
                    </Link>
                  ))
                )}
              </div>

              <Products />
              <Partners />
              <Services />
            </div>
          </div>
        </>
      ) : ""}
    </>
  );
};

export default Catalog;
