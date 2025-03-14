import React from "react";
import {
  Banner,
  Banner2,
  Branches,
  Categories,
  Partners,
  Services,
  Suggestion,
} from "@/components";
import { useGetAllProductsQuery } from "@/store/API/RTKQuery";
import { useAppDispatch } from "@/store/hooks";
import { setAllProducts } from "@/store/productSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  // Get All Products
  const { isLoading, isError, data, isSuccess } = useGetAllProductsQuery();
  if (isSuccess) dispatch(setAllProducts(data.data));

  return (
    <>
      <Banner />
      <Banner2 />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : isSuccess ? (
        <Suggestion
          title="Eng yaxshi takliflar"
          data={data.data}
          link="/catalogs"
        />
      ) : (
        ""
      )}
      <Categories />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : isSuccess ? (
        <Suggestion title="Har doim foydali bo'ladi" data={data.data} link="" />
      ) : (
        ""
      )}
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
