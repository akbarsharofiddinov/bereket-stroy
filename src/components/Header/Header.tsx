import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop/HeaderTop";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/Vector.png";
import { LiaTimesSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthModal,
  setCatalogModal,
  setSearchModal,
  setToken,
} from "@/store/projectSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const [quantityCartProducts, setQuantityCartProducts] = useState(0);
  const [quantityFavoritesProducts, setQuantityFavoritesProducts] = useState(0);

  const { searchModal, catalogModal, profileInfo, token } = useAppSelector(
    (state) => state.projectSlice
  );

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  window.addEventListener("click", () => {
    if (profileMenu) setProfileMenu(false);
  });

  async function searchProducts() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/product-search?name=${searchInput}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const { cart, favorites } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    if (cart) setQuantityCartProducts(cart.length);
  }, [cart.length]);

  useEffect(() => {
    if (favorites) setQuantityFavoritesProducts(favorites.length);
  }, [favorites.length]);

  return (
    <>
      <HeaderTop />
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="left">
              <Link to={"/"}>
                <img src={logo} alt="" />
              </Link>
              <div>
                <button
                  className="categories-btn"
                  onClick={() => {
                    if (searchModal) {
                      dispatch(setSearchModal(false));
                      setTimeout(() => {
                        dispatch(setCatalogModal(true));
                      }, 400);
                    } else {
                      if (catalogModal) dispatch(setCatalogModal(false));
                      else dispatch(setCatalogModal(true));
                    }
                  }}
                >
                  {catalogModal ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8337 1.16656L1.16699 12.8332M1.16699 1.16656L12.8337 12.8332"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_445_3059)">
                        <path
                          d="M1.66663 15C1.66663 13.7163 1.66663 13.0744 1.95557 12.6029C2.11724 12.3391 2.33907 12.1172 2.6029 11.9556C3.07441 11.6667 3.71626 11.6667 4.99996 11.6667C6.28366 11.6667 6.92551 11.6667 7.39702 11.9556C7.66085 12.1172 7.88268 12.3391 8.04435 12.6029C8.33329 13.0744 8.33329 13.7163 8.33329 15C8.33329 16.2837 8.33329 16.9256 8.04435 17.3971C7.88268 17.6609 7.66085 17.8827 7.39702 18.0444C6.92551 18.3333 6.28366 18.3333 4.99996 18.3333C3.71626 18.3333 3.07441 18.3333 2.6029 18.0444C2.33907 17.8827 2.11724 17.6609 1.95557 17.3971C1.66663 16.9256 1.66663 16.2837 1.66663 15Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11.6666 15C11.6666 13.7163 11.6666 13.0744 11.9555 12.6029C12.1172 12.3391 12.339 12.1172 12.6029 11.9556C13.0744 11.6667 13.7163 11.6667 15 11.6667C16.2836 11.6667 16.9255 11.6667 17.397 11.9556C17.6609 12.1172 17.8827 12.3391 18.0444 12.6029C18.3333 13.0744 18.3333 13.7163 18.3333 15C18.3333 16.2837 18.3333 16.9256 18.0444 17.3971C17.8827 17.6609 17.6609 17.8827 17.397 18.0444C16.9255 18.3333 16.2836 18.3333 15 18.3333C13.7163 18.3333 13.0744 18.3333 12.6029 18.0444C12.339 17.8827 12.1172 17.6609 11.9555 17.3971C11.6666 16.9256 11.6666 16.2837 11.6666 15Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M1.66663 5C1.66663 3.7163 1.66663 3.07445 1.95557 2.60294C2.11724 2.33911 2.33907 2.11728 2.6029 1.95561C3.07441 1.66666 3.71626 1.66666 4.99996 1.66666C6.28366 1.66666 6.92551 1.66666 7.39702 1.95561C7.66085 2.11728 7.88268 2.33911 8.04435 2.60294C8.33329 3.07445 8.33329 3.7163 8.33329 5C8.33329 6.2837 8.33329 6.92555 8.04435 7.39706C7.88268 7.66089 7.66085 7.88271 7.39702 8.04439C6.92551 8.33333 6.28366 8.33333 4.99996 8.33333C3.71626 8.33333 3.07441 8.33333 2.6029 8.04439C2.33907 7.88271 2.11724 7.66089 1.95557 7.39706C1.66663 6.92555 1.66663 6.2837 1.66663 5Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11.6666 5C11.6666 3.7163 11.6666 3.07445 11.9555 2.60294C12.1172 2.33911 12.339 2.11728 12.6029 1.95561C13.0744 1.66666 13.7163 1.66666 15 1.66666C16.2836 1.66666 16.9255 1.66666 17.397 1.95561C17.6609 2.11728 17.8827 2.33911 18.0444 2.60294C18.3333 3.07445 18.3333 3.7163 18.3333 5C18.3333 6.2837 18.3333 6.92555 18.0444 7.39706C17.8827 7.66089 17.6609 7.88271 17.397 8.04439C16.9255 8.33333 16.2836 8.33333 15 8.33333C13.7163 8.33333 13.0744 8.33333 12.6029 8.04439C12.339 7.88271 12.1172 7.66089 11.9555 7.39706C11.6666 6.92555 11.6666 6.2837 11.6666 5Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_445_3059">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  {t("category")}
                </button>
                <div className="input-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder={t("search_placeholder")}
                    value={searchInput}
                    onFocus={() => {
                      if (catalogModal) {
                        dispatch(setCatalogModal(false));
                        setTimeout(() => {
                          dispatch(setSearchModal(true));
                        }, 400);
                      } else dispatch(setSearchModal(true));
                    }}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchModal ? (
                    <span
                      onClick={() => {
                        setSearchInput("");
                        dispatch(setSearchModal(false));
                      }}
                    >
                      <LiaTimesSolid />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <button className="search-btn" onClick={() => searchProducts}>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_477_3068)">
                        <path
                          d="M14.5833 14.5833L18.3333 18.3333"
                          stroke="#EEEEF0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.6667 9.16666C16.6667 5.02453 13.3089 1.66666 9.16675 1.66666C5.02461 1.66666 1.66675 5.02453 1.66675 9.16666C1.66675 13.3088 5.02461 16.6667 9.16675 16.6667C13.3089 16.6667 16.6667 13.3088 16.6667 9.16666Z"
                          stroke="#EEEEF0"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_477_3068">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  {t("search")}
                </button>
              </div>
            </div>
            <div className="right">
              <NavLink to={"favorites"}>
                {quantityFavoritesProducts ? (
                  <span className="count">{quantityFavoritesProducts}</span>
                ) : (
                  ""
                )}
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.4626 1.99415C15.7809 0.349231 13.4404 1.01211 12.0344 2.06801C11.4578 2.50096 11.1696 2.71743 11 2.71743C10.8304 2.71743 10.5422 2.50096 9.9656 2.06801C8.55962 1.01211 6.21909 0.349231 3.53744 1.99415C0.0180688 4.15294 -0.77828 11.2749 7.33953 17.2834C8.88572 18.4278 9.6588 19 11 19C12.3412 19 13.1143 18.4278 14.6605 17.2834C22.7783 11.2749 21.9819 4.15294 18.4626 1.99415Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </NavLink>
              <NavLink to={"cart"}>
                {quantityCartProducts ? (
                  <span className="count">{quantityCartProducts}</span>
                ) : (
                  ""
                )}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 6H22"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 22C7.10457 22 8 21.1046 8 20C8 18.8954 7.10457 18 6 18C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <path
                    d="M17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22Z"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 20H15"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </NavLink>
              <NavLink to={"orders"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C11.1818 22 10.4002 21.6698 8.83693 21.0095C4.94564 19.3657 3 18.5438 3 17.1613C3 16.7742 3 10.0645 3 7M12 22C12.8182 22 13.5998 21.6698 15.1631 21.0095C19.0544 19.3657 21 18.5438 21 17.1613V7M12 22V11.3548"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 12L8 13"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 4L7 9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
              <button
                className={profileMenu ? "active" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  if (token) setProfileMenu(!profileMenu);
                  else dispatch(setAuthModal(true));
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                    stroke="black"
                    strokeWidth="2"
                  />
                </svg>

                <div className="menu" onClick={(e) => e.stopPropagation()}>
                  <Link to={`profile/private-info`}>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    {profileInfo.first_name}
                  </Link>
                  <Link to={`profile/locations`}>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3481 17.8059C10.9867 18.1442 10.5037 18.3334 10.0009 18.3334C9.49817 18.3334 9.01517 18.1442 8.65375 17.8059C5.34418 14.6884 0.908967 11.2058 3.07189 6.1498C4.24136 3.41605 7.04862 1.66675 10.0009 1.66675C12.9532 1.66675 15.7605 3.41605 16.93 6.1498C19.0902 11.1995 14.6658 14.6992 11.3481 17.8059Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M12.9168 9.16667C12.9168 10.7775 11.611 12.0833 10.0002 12.0833C8.38933 12.0833 7.0835 10.7775 7.0835 9.16667C7.0835 7.55583 8.38933 6.25 10.0002 6.25C11.611 6.25 12.9168 7.55583 12.9168 9.16667Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                    Manzillar
                  </Link>
                  <Link to={`profile/company`}>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_338_59742)">
                          <path
                            d="M13.3335 8.33325L15.1247 8.87059C16.269 9.21392 16.8412 9.38559 17.1707 9.82842C17.5002 10.2713 17.5002 10.8687 17.5002 12.0633V18.3333"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.6665 7.5H9.1665M6.6665 10.8333H9.1665"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.0002 18.3334V15.8334C10.0002 15.0477 10.0002 14.6549 9.75608 14.4108C9.512 14.1667 9.11916 14.1667 8.3335 14.1667H7.50016C6.71449 14.1667 6.32165 14.1667 6.07757 14.4108C5.8335 14.6549 5.8335 15.0477 5.8335 15.8334V18.3334"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.6665 18.3333H18.3332"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.5 18.3334V5.59778C2.5 3.50549 2.5 2.45934 3.15932 1.94028C3.81864 1.42123 4.78952 1.70304 6.73127 2.26667L10.8979 3.4761C12.0697 3.81623 12.6556 3.98628 12.9944 4.44979C13.3333 4.91331 13.3333 5.54462 13.3333 6.80722V18.3334"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_338_59742">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Korxona ma’lumotlari
                  </Link>
                  <Link to={"/orders"}>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 18.3333C9.31817 18.3333 8.66683 18.0581 7.36411 17.5078C4.12137 16.138 2.5 15.4531 2.5 14.301C2.5 13.9784 2.5 8.387 2.5 5.83325M10 18.3333C10.6818 18.3333 11.3332 18.0581 12.6359 17.5078C15.8787 16.138 17.5 15.4531 17.5 14.301V5.83325M10 18.3333V9.46225"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.93827 8.07623L4.50393 6.89829C3.16797 6.25183 2.5 5.92861 2.5 5.41675C2.5 4.90489 3.16797 4.58166 4.50393 3.93521L6.93827 2.75726C8.44067 2.03026 9.19192 1.66675 10 1.66675C10.8081 1.66675 11.5593 2.03025 13.0617 2.75726L15.4961 3.93521C16.832 4.58166 17.5 4.90489 17.5 5.41675C17.5 5.92861 16.832 6.25183 15.4961 6.89829L13.0617 8.07623C11.5593 8.80325 10.8081 9.16675 10 9.16675C9.19192 9.16675 8.44067 8.80325 6.93827 8.07623Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 10L6.66667 10.8333"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.1668 3.33325L5.8335 7.49992"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Buyurtmalar
                  </Link>
                  <Link to={"/favorites"}>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.2187 3.32846C13.9839 1.95769 12.0335 2.51009 10.8618 3.39001C10.3813 3.7508 10.1412 3.93119 9.99984 3.93119C9.8585 3.93119 9.61834 3.7508 9.13784 3.39001C7.96619 2.51009 6.01574 1.95769 3.78104 3.32846C0.848228 5.12745 0.184604 11.0624 6.94944 16.0695C8.23794 17.0232 8.88217 17.5 9.99984 17.5C11.1175 17.5 11.7618 17.0232 13.0503 16.0695C19.8151 11.0624 19.1514 5.12745 16.2187 3.32846Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    Sevimlilar
                  </Link>
                  <Link
                    to={""}
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(setToken(""));
                      window.location.reload();
                    }}
                  >
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 14.6875C12.4387 16.2307 11.1526 17.5412 9.42967 17.499C9.02883 17.4892 8.53342 17.3495 7.5426 17.07C5.15801 16.3973 3.08796 15.2669 2.5913 12.7346C2.5 12.2692 2.5 11.7453 2.5 10.6977V9.30225C2.5 8.25467 2.5 7.73087 2.5913 7.26538C3.08796 4.73304 5.15801 3.60263 7.5426 2.93002C8.53342 2.65053 9.02883 2.51079 9.42967 2.50099C11.1526 2.45884 12.4387 3.76922 12.5 5.31251"
                          stroke="#E31E24"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M17.5002 10.0001H8.3335M17.5002 10.0001C17.5002 9.41658 15.8382 8.32636 15.4168 7.91675M17.5002 10.0001C17.5002 10.5836 15.8382 11.6738 15.4168 12.0834"
                          stroke="#E31E24"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Chiqish
                  </Link>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
