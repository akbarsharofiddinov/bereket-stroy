import { setSelectedSubCategory } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import noImage from "@/assets/no-image.webp";
import { Partners, Products, Services } from "@/components";
import axios from "axios";
import { setAllProducts } from "@/store/productSlice";
import { useTranslation } from "react-i18next";

const SubCatalogDetails: React.FC = () => {
  const [seo, setSeo] = useState<MetaData | null>(null);

  const dispatch = useAppDispatch();
  const { selectedSubCategory, selectedCategory } = useAppSelector(
    (state) => state.categorySlice
  );


  const { sub_catalog_slug, sub_sub_catalog_slug } = useParams();
  const { totalProducts } = useAppSelector(state => state.productSlice)
  const { t } = useTranslation()

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

    const findSubCategory = selectedCategory?.sub_category?.find(
      (item) => item.slug === sub_catalog_slug
    );

    if (findSubCategory) {
      dispatch(setSelectedSubCategory(findSubCategory));
      getProducts(sub_catalog_slug!);
      setSeo(findSubCategory.seo)
    }

  }, [selectedCategory, sub_catalog_slug]);

  return (
    <>
      {sub_sub_catalog_slug ? (
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
                <p>{totalProducts} {`${t('counting')} ${t('product_found')}`}</p>
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
                        <img src={noImage} alt="bereket-strop_photo" />
                      )}
                      <span>{sub_sub_category.name}</span>
                    </Link>
                  )
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

export default SubCatalogDetails;
