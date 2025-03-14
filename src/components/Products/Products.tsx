import React from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, TopFilterBox } from "@/components";

const Products: React.FC<{ data: IProduct[] }> = ({ data }) => {
  return (
    <>
      <div className="products">
        <FilterSidebar />
        <div className="right">
          <TopFilterBox />
          <div className="products-grid">
            {data.length
              ? data.map((product, index) => (
                  <ProductItem data={product} key={`${index}-${product.id}`} />
                ))
              : ""}
          </div>
          <div className="pagination-box">
            <div className="select-item">
              <div className="selected">
                <h2 className="title">
                  Ko‘statish: {data.length}
                  <span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1.00003C9 1.00003 6.05407 5 5 5C3.94587 5 1 1 1 1"
                        stroke="black"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </h2>
              </div>
              <div className="menu"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
