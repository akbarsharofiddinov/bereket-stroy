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
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDiscounts } from "@/store/productSlice";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [bestOffers, setBestOffers] = useState<IProduct[]>([])
  const [usefullProoducts, setUsefullProducts] = useState<IProduct[]>([])

  const [cards, setCards] = useState<ICard[]>([]);
  // const {
  //   isLoading: bestOfferLoading,
  //   isError: bestOfferError,
  //   isSuccess: bestOfferSuccess,
  //   data: bestOfferData,
  // } = useGetBestOfferedProductsQuery();

  async function getBestOffers() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/best-offers", {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      if (response.status === 200) setBestOffers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // const {
  //   isLoading: usefullLoading,
  //   isError: usefullError,
  //   isSuccess: usefullSuccess,
  //   data: usefullData,
  // } = useGetAllProductsQuery({});


  async function getUsefullProducts() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/products", {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      if (response.status === 200) setUsefullProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const { i18n } = useTranslation();

  const { discounts } = useAppSelector((state) => state.productSlice);

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
        dispatch(setDiscounts(response.data.data));
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
    getBestOffers()
    getUsefullProducts()
  }, [i18n.language]);

  return (
    <>
      <Banner />
      <Banner2 loading={loading} discounts={discounts} />
      <Suggestions
        title={t("best_offers")}
        link="/catalogs"
        data={bestOffers}
        isSuccess={true}
      />
      <Categories />
      <Suggestions
        title={t("always_usefull")}
        link="/catalogs"
        data={usefullProoducts}
        isSuccess={true}
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
