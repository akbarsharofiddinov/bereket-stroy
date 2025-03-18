import React, { useEffect, useState } from "react";
import {
  Banner,
  Banner2,
  Branches,
  Categories,
  DiscountSlicer,
  Partners,
  Services,
} from "@/components";

import Suggestions from "@/components/Suggestions";
import {
  useGetAllProductsQuery,
  useGetBestOfferedProductsQuery,
} from "@/store/API/RTKQuery";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);
  const [loading, setLoading] = useState(false);

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
  const { i18n } = useTranslation();

  async function getCards() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/cards", {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      if (response.status === 200) setCards(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDiscounts() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/discounts",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) {
        setDiscounts(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCards();
    getDiscounts();
  }, []);

  return (
    <>
      <Banner />
      <Banner2 loading={loading} discounts={discounts} />
      <Suggestions
        title={t("best_offers")}
        link="/catalogs"
        data={bestOfferData?.data!}
        isError={bestOfferError}
        isLoading={bestOfferLoading}
        isSuccess={bestOfferSuccess}
      />
      <Categories />
      <Suggestions
        title={t("always_usefull")}
        link="/catalogs"
        data={usefullData?.data!}
        isError={usefullError}
        isLoading={usefullLoading}
        isSuccess={usefullSuccess}
      />

      {discounts.length
        ? discounts.map((item, index) => (
            <DiscountSlicer key={index} discount_data={item} />
          ))
        : ""}

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
