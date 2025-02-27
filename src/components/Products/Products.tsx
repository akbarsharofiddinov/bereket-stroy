import { useAppSelector } from "@/store/hooks";
import React from "react";
import ProductItem from "./ProductItem";

const Products: React.FC = () => {
  const { products } = useAppSelector((state) => state.productSlice);

  return (
    <>
      <div className="products">
        <div className="filter-sidebar">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ut!
          A quam tempore in et at, magnam illo nemo voluptatem ex? Fuga eligendi
          vero delectus beatae animi, dolorem, quos cupiditate, iusto obcaecati
          incidunt quas laboriosam. Velit unde laudantium dicta iusto mollitia
          magni eligendi corporis, excepturi, iure tempore minus officiis ipsum
          nihil repudiandae quae, necessitatibus quasi? Repudiandae, dolores
          nostrum error dolorem architecto temporibus vel, sed placeat quis
          deleniti odit cum in aliquam labore atque incidunt est! Odit deserunt
          deleniti aliquid sunt quis dolore, cupiditate culpa quibusdam
          provident minus inventore cumque consequatur necessitatibus quia
          obcaecati. Reprehenderit optio labore sed? Aliquid, minima repellendus
          animi obcaecati officia a quibusdam nulla fugiat alias suscipit
          eveniet excepturi quisquam, veritatis delectus tempore fuga nemo. Modi
          corrupti dolorum officiis! Sint libero in iusto voluptates similique
          illum veniam officia, at eius, veritatis cupiditate perferendis
          laboriosam sequi molestiae nemo sunt repellendus assumenda? Maiores
          sint aspernatur culpa, eligendi pariatur laboriosam perspiciatis eum
          magnam minima provident amet ut nihil sapiente, vel cum earum corporis
          molestias odio blanditiis. Nesciunt hic eaque harum nihil excepturi
          provident quia nemo, perferendis error id nisi odit alias cum ratione
          modi dignissimos labore, quas dolore! Tempora omnis voluptates,
          voluptatibus iure, aspernatur itaque possimus, laborum consectetur
          quod veritatis eius!
        </div>
        <div className="right">
          <div className="top-filter_box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            autem fugit commodi ratione sed debitis saepe unde alias iusto sint!
          </div>
          <div className="products-grid">
            {products.length
              ? products.map((product, index) => (
                  <>
                    <ProductItem data={product} key={index} />
                    <ProductItem data={product} key={index} />
                  </>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
