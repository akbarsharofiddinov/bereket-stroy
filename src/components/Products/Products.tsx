import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { FilterSidebar, SelectItem, TopFilterBox } from "@/components";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetAllProductsQuery } from "@/store/API/RTKQuery";
import { setTotalProductsCount } from "@/store/productSlice";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useTranslation } from "react-i18next";

type SortOption = "popular" | "price" | "-price" | "rating" | "";

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<APIResponse<IProduct[]>>();

  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const [activeSort, setActiveSort] = useState<SortOption>("popular");
  const [inSaleProducts, setInSaleProducts] = useState<IProduct[]>([]);

  const [brandsQuery, setBrandsQuery] = useState("");
  const [countriesQuesy, setCountriesQuery] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { t } = useTranslation()

  const [showFilter, setShowFilter] = useState(false);

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const params = useParams();

  const { selectedCardProducts } = useAppSelector(
    (state) => state.productSlice
  );

  const { isLoading, isError, isSuccess, data, refetch } =
    useGetAllProductsQuery({
      page: currentPage,
      category_slug: params.catalog_slug,
      sub_category_slug: params.sub_catalog_slug,
      sub_sub_category_slug: params.sub_sub_catalog_slug,
      sort_by: activeSort,
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
  }, [activeSort]);

  useEffect(() => {
    refetch();
  }, [params]);

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
        <div className="top-actions">
          <button className="filter-btn">
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t('filter')}
          </button>
          <div className={showFilter ? "select-item active" : "select-item"} onClick={() => setShowFilter(prev => !prev)}>
            <h2 className="selected">
              {
                activeSort === "popular" ? t('popular_first') : activeSort === "price" ? t('cheaper') : activeSort === "-price" ? t('expensive') : t('high_rating')
              }

              <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5" stroke="black" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </h2>

            <div className="menu">
              <p onClick={() => setActiveSort("popular")}>{t('popular_first')}</p>
              <p onClick={() => setActiveSort("price")}>{t('cheaper')}</p>
              <p onClick={() => setActiveSort("-price")}>{t('expensive')}</p>
              <p onClick={() => setActiveSort("rating")}>{t('high_rating')}</p>
            </div>
          </div>
        </div>
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
                      : selectedCardProducts.length
                        ? selectedCardProducts.map((item, index) => (
                          <ProductItem key={index} data={item} />
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
                      title={`${t('show')}:`}
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
