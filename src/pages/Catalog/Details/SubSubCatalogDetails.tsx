import { Products } from "@/components";
import {
  setSelectedSubCategory,
  setSelectedSubSubCategory,
} from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAllProducts } from "@/store/productSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const SubSubCatalogDetails: React.FC = () => {
  const [seo, setSeo] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const { selectedCategory, selectedSubCategory, selectedSubSubCategory } =
    useAppSelector((state) => state.categorySlice);

  const { totalProducts } = useAppSelector((state) => state.productSlice);

  const { t } = useTranslation()

  const params = useParams();

  async function getProducts(category_slug: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?sub_sub_category_slug=${category_slug}`
      );

      if (response.status === 200) {
        dispatch(setAllProducts(response.data.data));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    const findSubCategory = selectedCategory?.sub_category?.find(
      (item) => item.slug === params.sub_catalog_slug
    );

    if (findSubCategory) {
      dispatch(setSelectedSubCategory(findSubCategory));
      getProducts(params.sub_sub_catalog_slug!);
    }

    const findSubSubCategory = selectedSubCategory?.sub_sub_category?.find(
      (item) => item.slug === params.sub_sub_catalog_slug
    );
    if (findSubSubCategory) {
      dispatch(setSelectedSubSubCategory(findSubSubCategory));
      setSeo(findSubSubCategory.seo)
    }

  }, [selectedSubCategory]);

  return (
    seo ? (
      <>
        <title>{seo.title}</title>
        <meta name="description" content={seo.meta_description} />
        <link rel="canonical" href={`https://bereket-stroy.uz/${seo.canonical_url}`} />
        <meta property="og:title" content={seo["og:title"]} />
        <meta property="og:description" content={seo["og:description"]} />
        <meta property="og:url" content={seo["og:url"]} /> <meta property="meta_keywords" content={seo["meta_keywords"]} />
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
              <span>
                <FaAngleRight />
              </span>
              <Link to={""}>{selectedSubSubCategory?.name}</Link>
            </div>

            <div className="top">
              <h2 className="title">{selectedSubSubCategory?.name}</h2>
              <p>{totalProducts} {`${t('counting')} ${t('product_found')}`}</p>
            </div>

            {loading ? <h1>Loading...</h1> : <Products />}
          </div>
        </div>
      </>
    ) : ""
  );
};

export default SubSubCatalogDetails;
