import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, SelectItem, TopFilterBox } from "@/components";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetAllProductsQuery } from "@/store/API/RTKQuery";
import { setTotalProductsCount } from "@/store/productSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

type SortOption = "popular" | "price" | "-price" | "rating" | "";

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<APIResponse<IProduct[]>>();

  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const [activeSort, setActiveSort] = useState<SortOption>("");
  const [inSaleProducts, setInSaleProducts] = useState<IProduct[]>([]);

  const [brandsQuery, setBrandsQuery] = useState("");
  const [countriesQuesy, setCountriesQuery] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const params = useParams();

  const [searchParams] = useSearchParams();

  const { isLoading, isError, isSuccess, data, refetch } =
    useGetAllProductsQuery({
      page: currentPage,
      category_slug: params.catalog_slug,
      sub_category_slug: params.sub_catalog_slug,
      sub_sub_category_slug: params.sub_sub_catalog_slug,
      sort_by: searchParams.get("sort_by")!,
      brandIDsStr: brandsQuery,
      countryIDsStr: countriesQuesy,
      min_price: debouncedMinPrice.length ? debouncedMinPrice : undefined,
      max_price: debouncedMaxPrice.length ? debouncedMaxPrice : undefined,
      pagination: perPage,
    });

  const { isInSale, filteredProducts, searchedProducts } = useAppSelector(
    (state) => state.productSlice
  );

  const dispatch = useAppDispatch();
  console.log(productsData);
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
        <FilterSidebar
          setBrandsQuery={setBrandsQuery}
          setCountriesQuery={setCountriesQuery}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
        />
        <div className="right">
          <TopFilterBox activeSort={activeSort} setActiveSort={setActiveSort} />
          {isLoading ? (
            <h1>Loading</h1>
          ) : isError ? (
            <h1>Error</h1>
          ) : isSuccess ? (
            <>
              <div className="products-grid">
                {inSaleProducts?.length
                  ? inSaleProducts?.map((product, index) => (
                      <ProductItem
                        data={product}
                        key={`${index}-${product.id}`}
                      />
                    ))
                  : searchedProducts.length
                  ? searchedProducts.map((item, index) => (
                      <ProductItem key={index} data={item} />
                    ))
                  : filteredProducts.length
                  ? filteredProducts.map((product, index) => (
                      <ProductItem key={index} data={product} />
                    ))
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
                {productsData?.pagination.per_page! <
                productsData?.pagination.total! ? (
                  <>
                    <SelectItem
                      title="Ko‘statish:"
                      productsCount={productsData?.pagination.per_page!}
                      setPerPage={setPerPage}
                      menu={["5", "10", "20", "25"]}
                    />

                    <Pagination
                      defaultCurrent={currentPage}
                      pageSize={productsData?.pagination.per_page!}
                      total={productsData?.pagination.total}
                      showSizeChanger={false}
                      onChange={(page) => {
                        setCurrentPage(page);
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
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
