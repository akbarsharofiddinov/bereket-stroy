import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CatalogsModal, Footer, Header, SearchModal } from "@/components";
import { useAppDispatch } from "./store/hooks";
import axios from "axios";
import { setAllCategories } from "@/store/categorySlice";
import { setCartProducts } from "@/store/productSlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();

  async function getAllCategories() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/categories"
      );
      if (response.status === 200) {
        dispatch(setAllCategories(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cartProducts: { product: IProduct; quantity: number }[] = [];
      cartProducts.push(...JSON.parse(localStorage.getItem("cart") + ""));
      dispatch(setCartProducts(cartProducts));
    }
  }, [localStorage.getItem("cart")]);

  return (
    <>
      <Header />
      <SearchModal />
      <CatalogsModal />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
