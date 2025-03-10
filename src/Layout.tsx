import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  CatalogsModal,
  Footer,
  Header,
  LoginModal,
  SearchModal,
  SignUpModal,
} from "@/components";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import axios from "axios";
import { setAllCategories } from "@/store/categorySlice";
import { setCartProducts, setFavourites } from "@/store/productSlice";
import { setProfileInfo, setToken } from "./store/projectSlice";
import { setBranches } from "./store/companySlice";

const Layout: React.FC = () => {
  const [loginType, setLoginType] = useState("login");

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { authModal } = useAppSelector((state) => state.projectSlice);
  const { token } = useAppSelector((state) => state.projectSlice);

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

  async function getMe() {
    if (token) {
      try {
        const response = await axios.get(
          "https://bereket.webclub.uz/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) dispatch(setProfileInfo(response.data));
      } catch (error) {
        console.log(error);
        dispatch(setToken(""));
        localStorage.removeItem("token");
      }
    }
  }

  async function getBranches() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/branches"
      );
      if (response.status === 200) {
        dispatch(setBranches(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    if (token) {
      getMe();
      dispatch(setToken(token));
    }
  }, [token]);

  useEffect(() => {
    getAllCategories();

    if (localStorage.getItem("cart")) {
      const cartProducts: {
        product: IProduct;
        isSelected: boolean;
        quantity: number;
      }[] = [];
      cartProducts.push(...JSON.parse(localStorage.getItem("cart") + ""));
      dispatch(setCartProducts(cartProducts));
    }

    if (localStorage.getItem("favorites")) {
      const favorites: IProduct[] = [];
      favorites.push(...JSON.parse(localStorage.getItem("favorites") + ""));
      dispatch(setFavourites(favorites));
    }

    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token") + ""));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <SearchModal />
      <CatalogsModal />
      <div className="main">
        <Outlet />
      </div>
      <Footer />

      {authModal ? (
        loginType === "login" ? (
          <LoginModal setLoginType={setLoginType} />
        ) : (
          <SignUpModal setLoginType={setLoginType} />
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Layout;
