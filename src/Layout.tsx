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
import { addProductToCart, setFavourites } from "@/store/productSlice";
import { setProfileInfo, setToken } from "./store/projectSlice";
import { setBranches } from "./store/companySlice";

const Layout: React.FC = () => {
  const [loginType, setLoginType] = useState("login");

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const { authModal, token } = useAppSelector((state) => state.projectSlice);
  const { allProducts } = useAppSelector((state) => state.productSlice);

  async function getAllCategories() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/categories",
        {
          headers: {
            "Accept-Language": "uz",
          },
        }
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
        "https://bereket.webclub.uz/api/branches",
        {
          headers: {
            "Accept-Language": "uz",
          },
        }
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

    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token") + ""));
    }
  }, []);

  useEffect(() => {
    if (allProducts.length) {
      if (localStorage.getItem("cart")) {
        const cartProducts: ICart[] = [];
        const localProducts: ICart[] = JSON.parse(
          localStorage.getItem("cart") + ""
        );

        localProducts.map((localProduct) =>
          allProducts.map((product) => {
            if (
              JSON.stringify(localProduct.product) === JSON.stringify(product)
            ) {
              cartProducts.push(localProduct);
              dispatch(addProductToCart(localProduct));
            }
          })
        );
      }

      if (localStorage.getItem("favorites")) {
        const favorites: IProduct[] = [];
        const localProducts: IProduct[] = [];
        localProducts.map((localProduct) =>
          allProducts.map((product) => {
            if (JSON.stringify(localProduct) === JSON.stringify(product)) {
              favorites.push(localProduct);
              dispatch(setFavourites(favorites));
            }
          })
        );
      }
    }
  }, [allProducts]);

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
