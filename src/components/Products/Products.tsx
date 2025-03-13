import React from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, TopFilterBox } from "@/components";
import { useAppSelector } from "@/store/hooks";

const Products: React.FC<{ data: IProduct[] }> = ({ data }) => {
  const { filteredProducts } = useAppSelector((state) => state.productSlice);

  return (
    <>
      <div className="products">
        <FilterSidebar />
        <div className="right">
          <TopFilterBox />
          <div className="products-grid">
            {filteredProducts.length
              ? filteredProducts.map((product, index) => (
                  <ProductItem data={product} key={`${index}-${product.id}`} />
                ))
              : data.length
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
