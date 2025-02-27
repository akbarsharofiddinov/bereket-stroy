import { setSelectedSubCategory } from "@/store/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProducts } from "@/store/productSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const CatalogDetails: React.FC = () => {
  const params = useParams();
  const { selectedSubCategory, allCategories } = useAppSelector(
    (state) => state.categorySlice
  );

  const { products } = useAppSelector((state) => state.productSlice);

  const dispatch = useAppDispatch();

  // Get Products API Request
  async function getProductsBySubCategory(sub_category: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/products?sub_category_slug=${sub_category}`
      );k
      if (response.status === 200) {
        dispatch(setProducts(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // use effects
  useEffect(() => {
    getProductsBySubCategory(params.details_slug + "");
  }, [selectedSubCategory]);

  return (
    <>
      <div className="catalog-details">
        <div className="container">
          <div className="inner">
            <div className="navigations">
              <Link to={"/"} className="active">
                Bosh sahifa
              </Link>
              <span>
                <FaAngleRight />
              </span>
              <Link to={""}>{selectedSubCategory?.name.uz}</Link>
            </div>

            <div className="title-box">
              <h2 className="title">{selectedSubCategory?.name.uz}</h2>
              <p className="products-count">
                {products.length} ta mahsulot topildi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogDetails;
