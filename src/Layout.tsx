import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Authorization,
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
  setCatalogModal,
  setCurrentLanguage,
  setProfileInfo,
  setSearchModal,
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

  const location = useLocation();

  const { authModal, authorization } = useAppSelector((state) => state.projectSlice);

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

  const { isSuccess: allProductsSuccess, data: allProducts } =
    useGetAllProductsQuery({});

  if (allProductsSuccess) dispatch(setAllProducts(allProducts.data));

  useEffect(() => {
    dispatch(setCatalogModal(false));
    dispatch(setSearchModal(false));
  }, [location.pathname]);

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
    if (allProducts) {
      if (localStorage.getItem("cart")) {
        const cartProducts: ICart[] = JSON.parse(
          localStorage.getItem("cart") + ""
        );

        dispatch(setCartProducts(cartProducts));
      }

      if (localStorage.getItem("favorites")) {
        const favorites: IProduct[] = JSON.parse(
          localStorage.getItem("favorites") + ""
        );

        dispatch(setFavourites(favorites));
      }
    }
  }, [allProducts?.data.length]);

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

      {authorization ? (
        <Authorization />
      ) : ""}
    </>
  );
};

export default Layout;
