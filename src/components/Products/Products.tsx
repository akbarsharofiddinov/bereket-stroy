import { useAppSelector } from "@/store/hooks";
import React from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, TopFilterBox } from "@/components";

const Products: React.FC = () => {
  const { products } = useAppSelector((state) => state.productSlice);

  return (
    <>
      <div className="products">
        <FilterSidebar />
        <div className="right">
          <TopFilterBox />
          <div className="products-grid">
            {products.length
              ? products.map((product, index) => (
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
