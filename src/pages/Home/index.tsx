import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Home: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);
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

  async function getCards() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/cards");
      if (response.status === 200) setCards(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

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
      {cards.length
        ? cards.map((item, index) => (
            <Suggestions
              title={item.name}
              data={item.products}
              link=""
              key={index}
              isSuccess={true}
            />
          ))
        : ""}
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
