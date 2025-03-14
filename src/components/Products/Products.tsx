import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, SelectItem, TopFilterBox } from "@/components";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetAllProductsQuery } from "@/store/API/RTKQuery";
import { setTotalProductsCount } from "@/store/productSlice";
import { useParams, useSearchParams } from "react-router-dom";

type SortOption = "popular" | "price" | "-price" | "rating" | "";

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<APIResponse<IProduct[]>>();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSort, setActiveSort] = useState<SortOption>("");
  const [inSaleProducts, setInSaleProducts] = useState<IProduct[]>([]);

  const params = useParams();

  const [searchParams] = useSearchParams();

  const { isLoading, isError, isSuccess, data, refetch } =
    useGetAllProductsQuery({
      page: currentPage,
      category_slug: params.catalog_slug,
      sub_category_slug: params.sub_catalog_slug,
      sub_sub_category_slug: params.sub_sub_catalog_slug,
      sort_by: searchParams.get("sort_by")!,
    });

  const { totalProducts, isInSale } = useAppSelector(
    (state) => state.productSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTotalProductsCount(data.pagination.total));
      setProductsData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, [params]);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  useEffect(() => {
    if (isInSale) {
      if (data?.data) {
        const filteredProducts = data.data.filter((item) => item.is_sale === 1);

        setInSaleProducts(filteredProducts);
      }
    }
  }, [isInSale]);

  return (
    <>
      <div className="products">
        <FilterSidebar />
        <div className="right">
          <TopFilterBox activeSort={activeSort} setActiveSort={setActiveSort} />
          {isLoading ? (
            <h1>Loading</h1>
          ) : isError ? (
            <h1>Error</h1>
          ) : isSuccess ? (
            <>
              <div className="products-grid">
                {isInSale
                  ? inSaleProducts?.length
                    ? inSaleProducts?.map((product, index) => (
                        <ProductItem
                          data={product}
                          key={`${index}-${product.id}`}
                        />
                      ))
                    : "fkopfkp"
                  : productsData?.data.length
                  ? productsData?.data.map((product, index) => (
                      <ProductItem
                        data={product}
                        key={`${index}-${product.id}`}
                      />
                    ))
                  : ""}
              </div>
              <div className="pagination-box">
                <SelectItem
                  title="Ko‘statish:"
                  productsCount={totalProducts}
                  menu={["5", "10", "20", "25"]}
                />

                <Pagination
                  defaultCurrent={currentPage}
                  total={productsData?.pagination.total_pages}
                  showSizeChanger={false}
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
