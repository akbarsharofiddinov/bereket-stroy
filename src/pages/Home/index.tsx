import React, { useState } from "react";
import {
  Banner,
  Banner2,
  Branches,
  Categories,
  Partners,
  Services,
} from "@/components";

import Suggestions from "@/components/Suggestions";
import {
  useGetAllProductsQuery,
  useGetBestOfferedProductsQuery,
} from "@/store/API/RTKQuery";

const Home: React.FC = () => {
  const [] = useState([]);
  const {
    isLoading: bestOfferLoading,
    isError: bestOfferError,
    isSuccess: bestOfferSuccess,
    data: bestOfferData,
  } = useGetBestOfferedProductsQuery();
  const {
    isLoading: usefullLoading,
    isError: usefullError,
    isSuccess: usefullSuccess,
    data: usefullData,
  } = useGetAllProductsQuery({});

  return (
    <>
      <Banner />
      <Banner2 />
      <Suggestions
        title="Eng yaxshi takliflar"
        link="/catalogs"
        data={bestOfferData?.data!}
        isError={bestOfferError}
        isLoading={bestOfferLoading}
        isSuccess={bestOfferSuccess}
      />
      <Categories />
      <Suggestions
        title="Har doim foydali bo'ladi"
        link="/catalogs"
        data={usefullData?.data!}
        isError={usefullError}
        isLoading={usefullLoading}
        isSuccess={usefullSuccess}
      />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
