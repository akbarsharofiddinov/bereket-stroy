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
import {
  setAllProducts,
  setCartProducts,
  setFavourites,
} from "@/store/productSlice";
import {
  setCurrentLanguage,
  setProfileInfo,
  setToken,
} from "./store/projectSlice";
import { setBranches } from "./store/companySlice";
import { useTranslation } from "react-i18next";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetUserInfoQuery,
} from "./store/API/RTKQuery";
import { setAllCategories } from "./store/categorySlice";

const Layout: React.FC = () => {
  const [loginType, setLoginType] = useState("login");

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();

  const { authModal } = useAppSelector((state) => state.projectSlice);
  const { allProducts } = useAppSelector((state) => state.productSlice);

  // Get All Categories
  const { isSuccess, data: categoriesResponse } = useGetAllCategoriesQuery();
  if (isSuccess) dispatch(setAllCategories(categoriesResponse.data));

  const token = localStorage.getItem("token");
  // Get User Info
  const {
    isSuccess: userInfoSuccess,
    isError,
    data: userInfo,
  } = useGetUserInfoQuery(undefined, { skip: token?.length ? false : true });
  if (userInfoSuccess) dispatch(setProfileInfo(userInfo));
  else if (isError) {
    dispatch(
      setProfileInfo({
        birthday: "",
        company_name: "",
        first_name: "",
        id: 0,
        inn: "",
        is_legal: 0,
        is_verified: 0,
        last_name: "",
        phone: "",
      })
    );
    localStorage.removeItem("token");
  }

  async function getBranches() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/branches",
        {
          headers: {
            "Accept-Language": i18n.language,
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

  const { isSuccess: allProductsSuccess, data } = useGetAllProductsQuery({});

  if (allProductsSuccess) dispatch(setAllProducts(data.data));

  useEffect(() => {
    getBranches();
    dispatch(setCurrentLanguage(i18n.language));
  }, [i18n.language]);

  useEffect(() => {
    if (localStorage.getItem("language")) {
      dispatch(setCurrentLanguage(localStorage.getItem("language")));
      i18n.changeLanguage(localStorage.getItem("language") + "");
    }

    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token") + ""));
    }

    if (localStorage.getItem("favorites")) {
      dispatch(
        setFavourites(JSON.parse(localStorage.getItem("favorites") + ""))
      );
    }

    if (localStorage.getItem("cart")) {
      dispatch(setCartProducts(JSON.parse(localStorage.getItem("cart") + "")));
    }
  }, []);

  useEffect(() => {
    if (allProducts.length) {
      if (localStorage.getItem("cart")) {
        const cartProducts: ICart[] = [];
        const localProducts: ICart[] = JSON.parse(
          localStorage.getItem("cart") + ""
        );

        localProducts.forEach((localProduct) =>
          allProducts.forEach((product) => {
            if (
              JSON.stringify(localProduct.product) === JSON.stringify(product)
            ) {
              cartProducts.push(localProduct);
            }
          })
        );

        localStorage.setItem("cart", JSON.stringify(cartProducts));

        dispatch(setCartProducts(cartProducts));
      }

      if (localStorage.getItem("favorites")) {
        const favorites: IProduct[] = [];
        const localProducts: IProduct[] = JSON.parse(
          localStorage.getItem("favorites") + ""
        );
        localProducts.forEach((localProduct) =>
          allProducts.forEach((product) => {
            if (JSON.stringify(localProduct) === JSON.stringify(product)) {
              favorites.push(localProduct);
            }
          })
        );
        localStorage.setItem("favorites", JSON.stringify(favorites));
        dispatch(setFavourites(favorites));
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
