import React, { useEffect } from "react";
import {
  Banner,
  Banner2,
  Branches,
  Categories,
  Partners,
  Services,
  Suggestion,
} from "@/components";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { setAllProducts } from "@/store/productSlice";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();

  async function getAllProducts() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/products",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setAllProducts(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Banner />
      <Banner2 />
      <Suggestion title="Eng yaxshi takliflar" data={undefined} link="" />
      <Categories />
      <Suggestion title="Har doim foydali bo'ladi" data={undefined} link="" />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
