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
        </div>
      </div>
    </>
  );
};

export default Products;
