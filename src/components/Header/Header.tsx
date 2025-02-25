import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/Vector.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCatalogModal, setSearchModal } from "@/store/projectSlice";

const Header: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const { searchModal, catalogModal } = useAppSelector(
    (state) => state.projectSlice
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <HeaderTop />
      <header
        className={searchModal || catalogModal ? "header active" : "header"}
      >
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                      <g clip-path="url(#clip0_445_3059)">
                        <path
                          d="M1.66663 15C1.66663 13.7163 1.66663 13.0744 1.95557 12.6029C2.11724 12.3391 2.33907 12.1172 2.6029 11.9556C3.07441 11.6667 3.71626 11.6667 4.99996 11.6667C6.28366 11.6667 6.92551 11.6667 7.39702 11.9556C7.66085 12.1172 7.88268 12.3391 8.04435 12.6029C8.33329 13.0744 8.33329 13.7163 8.33329 15C8.33329 16.2837 8.33329 16.9256 8.04435 17.3971C7.88268 17.6609 7.66085 17.8827 7.39702 18.0444C6.92551 18.3333 6.28366 18.3333 4.99996 18.3333C3.71626 18.3333 3.07441 18.3333 2.6029 18.0444C2.33907 17.8827 2.11724 17.6609 1.95557 17.3971C1.66663 16.9256 1.66663 16.2837 1.66663 15Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M11.6666 15C11.6666 13.7163 11.6666 13.0744 11.9555 12.6029C12.1172 12.3391 12.339 12.1172 12.6029 11.9556C13.0744 11.6667 13.7163 11.6667 15 11.6667C16.2836 11.6667 16.9255 11.6667 17.397 11.9556C17.6609 12.1172 17.8827 12.3391 18.0444 12.6029C18.3333 13.0744 18.3333 13.7163 18.3333 15C18.3333 16.2837 18.3333 16.9256 18.0444 17.3971C17.8827 17.6609 17.6609 17.8827 17.397 18.0444C16.9255 18.3333 16.2836 18.3333 15 18.3333C13.7163 18.3333 13.0744 18.3333 12.6029 18.0444C12.339 17.8827 12.1172 17.6609 11.9555 17.3971C11.6666 16.9256 11.6666 16.2837 11.6666 15Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M1.66663 5C1.66663 3.7163 1.66663 3.07445 1.95557 2.60294C2.11724 2.33911 2.33907 2.11728 2.6029 1.95561C3.07441 1.66666 3.71626 1.66666 4.99996 1.66666C6.28366 1.66666 6.92551 1.66666 7.39702 1.95561C7.66085 2.11728 7.88268 2.33911 8.04435 2.60294C8.33329 3.07445 8.33329 3.7163 8.33329 5C8.33329 6.2837 8.33329 6.92555 8.04435 7.39706C7.88268 7.66089 7.66085 7.88271 7.39702 8.04439C6.92551 8.33333 6.28366 8.33333 4.99996 8.33333C3.71626 8.33333 3.07441 8.33333 2.6029 8.04439C2.33907 7.88271 2.11724 7.66089 1.95557 7.39706C1.66663 6.92555 1.66663 6.2837 1.66663 5Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M11.6666 5C11.6666 3.7163 11.6666 3.07445 11.9555 2.60294C12.1172 2.33911 12.339 2.11728 12.6029 1.95561C13.0744 1.66666 13.7163 1.66666 15 1.66666C16.2836 1.66666 16.9255 1.66666 17.397 1.95561C17.6609 2.11728 17.8827 2.33911 18.0444 2.60294C18.3333 3.07445 18.3333 3.7163 18.3333 5C18.3333 6.2837 18.3333 6.92555 18.0444 7.39706C17.8827 7.66089 17.6609 7.88271 17.397 8.04439C16.9255 8.33333 16.2836 8.33333 15 8.33333C13.7163 8.33333 13.0744 8.33333 12.6029 8.04439C12.339 7.88271 12.1172 7.66089 11.9555 7.39706C11.6666 6.92555 11.6666 6.2837 11.6666 5Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_445_3059">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  Kategoriya
                </button>
                <div className="input-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Mahsulotni qidirish..."
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
                <button className="search-btn">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_477_3068)">
                        <path
                          d="M14.5833 14.5833L18.3333 18.3333"
                          stroke="#EEEEF0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.6667 9.16666C16.6667 5.02453 13.3089 1.66666 9.16675 1.66666C5.02461 1.66666 1.66675 5.02453 1.66675 9.16666C1.66675 13.3088 5.02461 16.6667 9.16675 16.6667C13.3089 16.6667 16.6667 13.3088 16.6667 9.16666Z"
                          stroke="#EEEEF0"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_477_3068">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Qidirish
                </button>
              </div>
            </div>
            <div className="right">
              <NavLink to={"favorites"}>
                <span className="count">5</span>
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
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </NavLink>
              <NavLink to={"cart"}>
                <span className="count">5</span>
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
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 6H22"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 22C7.10457 22 8 21.1046 8 20C8 18.8954 7.10457 18 6 18C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z"
                    stroke="black"
                    stroke-width="2"
                  />
                  <path
                    d="M17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22Z"
                    stroke="black"
                    stroke-width="2"
                  />
                  <path
                    d="M8 20H15"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 12L8 13"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 4L7 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </NavLink>
              <NavLink to={"profile"}>
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
