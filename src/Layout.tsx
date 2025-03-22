import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
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
  setAuthorization,
  setCatalogModal,
  setCurrentLanguage,
  setProfileInfo,
  setSearchModal,
  setToken,
} from "./store/projectSlice";
import { setBranches } from "./store/companySlice";
import { useTranslation } from "react-i18next";
import {
  useGetAllProductsQuery,
  useGetUserInfoQuery,
} from "./store/API/RTKQuery";
import { setAllCategories } from "./store/categorySlice";

const Layout: React.FC = () => {
  const [loginType, setLoginType] = useState("login");
  const [isCegoriesActive, setIsCategoriesActive] = useState(false);

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();


  const { cart, favorites } = useAppSelector((state) => state.productSlice);
  const { authModal, authorization } = useAppSelector((state) => state.projectSlice);

  // Get All Categories
  // const { isSuccess, data: categoriesResponse } = useGetAllCategoriesQuery();
  // if (isSuccess) dispatch(setAllCategories(categoriesResponse.data));

  async function getAllCategories() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/categories", {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      if (response.status === 200) dispatch(setAllCategories(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }

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
    getAllCategories()
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

    if (pathname.split("/")[1] === "catalogs") setIsCategoriesActive(true);
    else setIsCategoriesActive(false)
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

      <div className="mobile-footer_navigation_bar">
        <div className="inner">
          <NavLink to={"/"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.99931 22L8.74868 18.4911C8.61393 16.6046 10.108 15 11.9993 15C13.8906 15 15.3847 16.6046 15.2499 18.4911L14.9993 22" stroke="black" strokeWidth="2" />
              <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.383 2 14.5817 2.86667 16.979 4.6L18.4188 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5536 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="black" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </NavLink>
          <NavLink to={"/categories"} className={isCegoriesActive ? "active" : ""}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="black" strokeWidth="2" />
              <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="black" strokeWidth="2" />
              <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="black" strokeWidth="2" />
              <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="black" strokeWidth="2" />
            </svg>
          </NavLink>
          <NavLink to={"/favorites"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.22172 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {favorites.length ? (
              <span className="count">{favorites.length}</span>
            ) : (
              ""
            )}
          </NavLink>
          <NavLink to={"/cart"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6H22" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 22C7.10457 22 8 21.1046 8 20C8 18.8954 7.10457 18 6 18C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z" stroke="black" strokeWidth="2" />
              <path d="M17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22Z" stroke="black" strokeWidth="2" />
              <path d="M8 20H15" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {cart.length ? (
              <span className="count">{cart.length}</span>
            ) : (
              ""
            )}
          </NavLink>
          {token ? (
            <NavLink to={"/profile"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="black" strokeWidth="2" />
              </svg>
            </NavLink>
          ) : (
            <button onClick={() => {
              dispatch(setAuthorization(true))
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="black" strokeWidth="2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
