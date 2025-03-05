import { setSelectedSubCategory } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import noImage from "@/assets/no-image.webp";
import { Partners, Products, Services } from "@/components";
import axios from "axios";

const SubCatalogDetails: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const { selectedSubCategory, selectedCategory } = useAppSelector(
    (state) => state.categorySlice
  );

  const params = useParams();

  async function getProducts(category_slug: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?sub_category_slug=${category_slug}`
      );

      if (response.status === 200) {
        setProducts(response.data.data);
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
  }, [selectedCategory]);

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
                {selectedCategory && selectedCategory.name.uz}
              </Link>
              <span>
                <FaAngleRight />
              </span>
              <Link
                to={`/catalogs/${selectedCategory?.slug!}/${selectedSubCategory?.slug!}`}
              >
                {selectedSubCategory && selectedSubCategory.name.uz}
              </Link>
            </div>

            <div className="top">
              <h2 className="title">{selectedSubCategory?.name.uz}</h2>
              <p>{products.length} ta mahsulot topildi</p>
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
                    <span>{sub_sub_category.name.uz}</span>
                  </Link>
                )
              )}
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

export default SubCatalogDetails;
