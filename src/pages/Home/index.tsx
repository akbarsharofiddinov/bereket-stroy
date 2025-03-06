import React, { useEffect } from "react";
import {
  Banner,
  Banner2,
  Banner3,
  Branches,
  // Categories,
  Partners,
  Services,
  Suggestion,
} from "@/components";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { setAllProducts } from "@/store/productSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  async function getAllProducts() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/products"
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
      {/* <Categories /> */}
      <Suggestion title="Eng yaxshi takliflar" category="" link="" />
      <Banner3 />
      <Suggestion title="Har doim foydali bo'ladi" category="" link="" />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
