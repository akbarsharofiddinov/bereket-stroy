import React from "react";

import styles from "./ProductDetails.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProductDetails: React.FC = () => {
  const { selectedCategory, selectedSubCategory } = useAppSelector(
    (state) => state.categorySlice
  );

  return (
    <>
      <div className={styles["product-details-page"]}>
        <div className="container">
          <div className="navigations">
            <Link to={"/"}>Bosh sahifa</Link>/
            <Link to={`/catalogs/${selectedCategory?.slug!}`}>
              {selectedCategory && selectedCategory.name.uz}
            </Link>
            /
            <Link to={`/catalogs/${selectedSubCategory?.slug!}`}>
              {selectedSubCategory && selectedSubCategory.name.uz}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
