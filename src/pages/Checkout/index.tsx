import { Authorization, CheckoutModal, Footer, LeafLetMap } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils/currencyFormat";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

import noImage from "@/assets/no-image.webp";
import { toast } from "react-toastify";
import { setBranches } from "@/store/companySlice";
import {
  useCreateOrderMutation,
  useGetUserInfoQuery,
} from "@/store/API/RTKQuery";
import { useTranslation } from "react-i18next";
import { calculateDiscounts } from "@/utils/calculateDiscounts";
import { setCartProducts } from "@/store/productSlice";
import { setAuthorization, setProfileInfo } from "@/store/projectSlice";

import logo from "@/assets/Vector.png"

const Checkout: React.FC = () => {
  const [totalSum, setTotalSum] = useState(0);
  const [totalDiscountedSum, setTotalDiscountedSum] = useState(0);
  const [selectedBranch, setSeletedBranch] = useState<IBranch | undefined>(
    undefined
  );
  const [delivery_methods, setDeliveryMethods] = useState<IDeliveryMethods[]>(
    []
  );
  const [selectedDeliveryMethodID, setSelectedDeliveryMethodID] = useState(1);
  const [paymantMethods, setPaymentMethods] = useState<IPaymanyMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [fillInfoError, setFillInfoError] = useState(false);

  const { branches } = useAppSelector((state) => state.companySlice);
  const cart = useAppSelector((state) => state.productSlice.cart);
  const { profileInfo } = useAppSelector((state) => state.projectSlice);

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("bereket_token");

  const { isSuccess: userInfoSuccess, data: userInfo } = useGetUserInfoQuery(
    undefined,
    { skip: token?.length ? false : true }
  );

  const [createOrder, { isSuccess }] = useCreateOrderMutation();
  if (isSuccess)
    toast("Buyurtma muvofaqqiyatli yaratildi", { type: "success" });

  async function getDeliveryMethods() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/delivery-methods",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) {
        setDeliveryMethods(response.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPaymantMethods() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/payment-types",
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) {
        setPaymentMethods(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
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

  const { authorization } = useAppSelector((state) => state.projectSlice);

  async function handleCreateOrder() {
    const products: { product_id: number; quantity: number }[] = [];


    cart.map((item) => {
      if (item.isSelected)
        products.push({
          product_id: item.product.id,
          quantity: item.quantity,
        });
    });

    const deliveryBodyData = {
      receiver_name: userName,
      receiver_phone: phoneNumber,
      receiver_comment: comment,
      delivery_method_id: selectedDeliveryMethodID,
      comment,
      payment_type: selectedPaymentMethod,
      products,
      region,
      district,
      address,
      latitude,
      longitude,
    };

    const takeAwayBodyData = {
      receiver_name: userName,
      receiver_phone: phoneNumber,
      receiver_comment: comment,
      delivery_method_id: selectedDeliveryMethodID,
      branch_id: selectedBranch?.id,
      comment,
      payment_type: selectedPaymentMethod,
      products,
    };

    try {
      const response = await createOrder(
        selectedDeliveryMethodID === 1 ? takeAwayBodyData : deliveryBodyData
      );
      if (response.data.url) {
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 500);
      }
    } catch (error) {
      console.log(error)

      dispatch(setAuthorization(true))
    }

  }

  useEffect(() => {
    getDeliveryMethods();
    getPaymantMethods();
    getBranches();

    if (localStorage.getItem("cart")) {
      const cartProducts = JSON.parse(localStorage.getItem("cart") + "");
      dispatch(setCartProducts(cartProducts));
    }
  }, []);

  useEffect(() => {
    if (branches) setSeletedBranch(branches[0]);
  }, [branches]);

  useEffect(() => {
    const sum = cart.reduce((acc, { product, quantity, isSelected }) => {
      return isSelected ? acc + parseFloat(product.price) * quantity : acc + 0;
    }, 0);
    setTotalSum(sum);
    const discountedSum = cart.reduce(
      (acc, { isSelected, product, quantity }) => {
        return isSelected
          ? acc + parseFloat(product.discounted_price) * quantity
          : acc;
      },
      0
    );

    setTotalDiscountedSum(discountedSum);
  }, [cart]);

  useEffect(() => {
    if (profileInfo?.phone) {
      setUserName(profileInfo?.first_name);
      setPhoneNumber(profileInfo?.phone);
    }
  }, [profileInfo]);

  useEffect(() => {
    if (userInfoSuccess) {
      dispatch(setProfileInfo(userInfo));
      setUserName(userInfo.first_name);
      setPhoneNumber(userInfo.phone);
    }
  }, [userInfoSuccess]);

  useEffect(() => {
    if (selectedBranch) {
      if (selectedBranch.point_array) {
        setLatitude(selectedBranch.point_array[1] + "");
        setLongitude(selectedBranch.point_array[0] + "");
      }
    }
  }, [selectedBranch]);

  return (
    <>
      <div className="checkout-page">
        <div className="container">
          <div className="top">
            <Link to={"/"}>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11.9998H20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.99997 17C8.99997 17 4.00002 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                {t("back")}
              </span>
            </Link>
            <h2 className="title">{t('checkout_title')}</h2>
            <div className="logo">
              <img src={logo} alt="bereket-strop_photo" />
            </div>
          </div>
          <div className="inner">
            <h2 className="title">
              {t('checkout_title')}
            </h2>
            <div className="left">
              <div className="switch-delivery_method">
                {delivery_methods.length
                  ? delivery_methods.map((item, index) => (
                    <button
                      key={index}
                      className={
                        item.id === selectedDeliveryMethodID ? "active" : ""
                      }
                      onClick={() => setSelectedDeliveryMethodID(item.id)}
                    >
                      {item.name}
                    </button>
                  ))
                  : ""}
              </div>
              <p className="info-text">
                {selectedDeliveryMethodID === 1
                  ? t('info_text_takeaway')
                  : t('info_text_delivery')}
              </p>

              <div className="locations section">
                <h2 className="title">
                  {selectedDeliveryMethodID === 1
                    ? t('takeaway_locaiton')
                    : t('delivery_location')}
                </h2>
                <p className="info-text">
                  {selectedDeliveryMethodID === 1
                    ? t('info_text_takeaway2')
                    : t('info_text_delivery2')}
                </p>
                <div className="branches">
                  {selectedDeliveryMethodID === 1 ? (
                    <div className="branches-inner">
                      <div className="left">
                        <div className="select-item">
                          <div className="selected">
                            {selectedBranch?.name}
                            <span>
                              <FaAngleDown />
                            </span>
                          </div>

                          <div className="menu">
                            {branches.map((item, index) => (
                              <p
                                key={index}
                                onClick={() => setSeletedBranch(item)}
                              >
                                {item.name}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="location-info">
                          <p>
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.9668 10.002V15.002C2.9668 17.8304 2.9668 19.2446 3.84548 20.1233C4.72416 21.002 6.13837 21.002 8.9668 21.002H11.9668"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M6.9668 17.002H10.9668"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M18.4668 13.502C20.3998 13.502 21.9668 15.0396 21.9668 16.9363C21.9668 19.0818 19.8511 20.1366 18.8418 21.7449C18.6267 22.0877 18.3224 22.0877 18.0918 21.7449C17.051 20.1977 14.9668 19.0371 14.9668 16.9363C14.9668 15.0396 16.5338 13.502 18.4668 13.502Z"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18.4668 17.002H18.4758"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.1038 7.92324C9.82182 8.94288 8.79628 10.7018 6.84777 10.9567C5.12733 11.1817 3.82246 10.4299 3.48916 10.1155C3.12168 9.86056 2.28416 9.04485 2.07906 8.53503C1.87395 8.02521 2.11324 6.9206 2.28416 6.47026L2.96743 4.48946C3.13423 3.99194 3.5247 2.81521 3.92501 2.4172C4.32533 2.01918 5.13581 2.00187 5.4694 2.00187H12.4749C14.2781 2.02737 18.2209 1.98577 19.0003 2.00187C19.7797 2.01797 20.2481 2.67211 20.3848 2.95251C21.5477 5.77276 22 7.38793 22 8.07619C21.8482 8.8104 21.22 10.1948 19.0003 10.8037C16.6933 11.4366 15.3854 10.2057 14.9751 9.7331M9.15522 9.7331C9.47997 10.1325 10.4987 10.9363 11.9754 10.9567C13.4522 10.9771 14.7273 9.94553 15.1802 9.42721C15.3084 9.27426 15.5853 8.82053 15.8725 7.92324"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {selectedBranch?.name}
                          </p>
                          <p>
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_621_29543)">
                                  <path
                                    d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6023 1.66675 9.99996 1.66675C5.39759 1.66675 1.66663 5.39771 1.66663 10.0001C1.66663 14.6025 5.39759 18.3334 9.99996 18.3334Z"
                                    stroke="black"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M10 6.66675V10.0001L11.6667 11.6667"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_621_29543">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            {`${selectedBranch?.start_date}-${selectedBranch?.end_date}`}
                          </p>
                          <p>
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 1.66675V3.33341M5 1.66675V3.33341"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.99621 10.8333H10.0037M9.99621 14.1666H10.0037M13.3258 10.8333H13.3333M6.66663 10.8333H6.6741M6.66663 14.1666H6.6741"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.91663 6.66675H17.0833"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.08337 10.2027C2.08337 6.57162 2.08337 4.75607 3.12681 3.62803C4.17024 2.5 5.84962 2.5 9.20837 2.5H10.7917C14.1505 2.5 15.8299 2.5 16.8733 3.62803C17.9167 4.75607 17.9167 6.57162 17.9167 10.2027V10.6307C17.9167 14.2617 17.9167 16.0773 16.8733 17.2053C15.8299 18.3333 14.1505 18.3333 10.7917 18.3333H9.20837C5.84962 18.3333 4.17024 18.3333 3.12681 17.2053C2.08337 16.0773 2.08337 14.2617 2.08337 10.6307V10.2027Z"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.5 6.66675H17.5"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {selectedBranch?.days.map((item) =>
                              `${item.name}-`.split("-").join(", ")
                            )}
                          </p>
                          <p>
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.8333 1.66675V4.16675C15.8333 7.38841 13.2216 10.0001 9.99996 10.0001M9.99996 10.0001C6.7783 10.0001 4.16663 7.38841 4.16663 4.16675V1.66675M9.99996 10.0001C13.2216 10.0001 15.8333 12.6117 15.8333 15.8334V18.3334M9.99996 10.0001C6.7783 10.0001 4.16663 12.6117 4.16663 15.8334V18.3334"
                                  stroke="black"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M3.33337 1.66675H16.6667M16.6667 18.3334H3.33337"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            Saqlash muddati: 7 kun
                          </p>
                          <p>
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
                                  d="M12.9167 9.16667C12.9167 10.7775 11.6109 12.0833 10 12.0833C8.38921 12.0833 7.08337 10.7775 7.08337 9.16667C7.08337 7.55583 8.38921 6.25 10 6.25C11.6109 6.25 12.9167 7.55583 12.9167 9.16667Z"
                                  stroke="black"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </span>
                            {selectedBranch?.street}
                          </p>
                        </div>
                      </div>

                      <LeafLetMap
                        locationButton={false}
                        selectedBranch={selectedBranch}
                        clickable={false}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                      />
                    </div>
                  ) : (
                    <div className="delivery-location">
                      <div
                        className={
                          fillInfoError ? "inputs-grid error" : "inputs-grid"
                        }
                      >
                        <div className="region-input">
                          <input
                            type="text"
                            value={region}
                            onChange={(e) => {
                              setRegion(e.target.value);
                              setFillInfoError(false);
                            }}
                            placeholder={t('region_or_city')}
                          />
                        </div>
                        <div className="village-input">
                          <input
                            type="text"
                            value={district}
                            onChange={(e) => {
                              setDistrict(e.target.value);
                              setFillInfoError(false);
                            }}
                            placeholder={t('district_name')}
                          />
                        </div>
                        <div className="home-number-input">
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              setFillInfoError(false);
                            }}
                            placeholder={t('apartment_number')}
                          />
                        </div>
                        <div className="comment-input">
                          <input
                            type="text"
                            onChange={() => setFillInfoError(false)}
                            placeholder={t('location_comment')}
                          />
                        </div>
                      </div>

                      <LeafLetMap locationButton={true} clickable={true} />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={
                  fillInfoError
                    ? "receiver-info section error"
                    : "receiver-info section"
                }
              >
                <h2 className="title">{t('receiver_info')}</h2>
                <div className="user-info_inputs">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setFillInfoError(false);
                    }}
                    placeholder={t('full_name')}
                  />
                  <div className="phone-input">
                    <span>+998 </span>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setFillInfoError(false);
                      }}
                      placeholder="00 000 00 00"
                    />
                  </div>
                </div>
                <p className="desc-info">
                  {t('phone_desc_info')}
                </p>

                <textarea
                  name="comment"
                  id="comment"
                  className="comment"
                  placeholder={t('comment_placeholder')}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="orders section">
                <h2 className="title">{t('in_your_order')}</h2>
                {cart.length
                  ? cart.map((cartItem, index) =>
                    cartItem.isSelected ? (
                      <div className="cart-item" key={index}>
                        <div className="img-box">
                          {cartItem.product.photos ? (
                            <img
                              src={`http://bereket.webclub.uz/storage/${cartItem.product.photos[0]}`}
                              alt="bereket-strop_photo"
                            />
                          ) : (
                            <img src={noImage} alt="bereket-strop_photo" />
                          )}
                        </div>

                        <div className="body">
                          <h2 className="product-name">
                            {cartItem.product.name}
                          </h2>
                          <div className="price-box">
                            <p>{cartItem.quantity} {t('counting')}</p>
                            {cartItem.product.discount ? (
                              cartItem.product.discount_type === "%" ? (
                                <div className="discount">
                                  <p className="old-price">
                                    {formatCurrency(
                                      parseFloat(cartItem.product.price)
                                    )}
                                  </p>
                                  <span>{`${parseFloat(
                                    cartItem.product.discount + ""
                                  )}%`}</span>
                                </div>
                              ) : (
                                <div className="discount">
                                  <p className="old-price">
                                    {formatCurrency(
                                      parseFloat(cartItem.product.price + "")
                                    )}
                                  </p>
                                </div>
                              )
                            ) : (
                              ""
                            )}
                            <p>
                              {formatCurrency(
                                parseFloat(cartItem.product.discounted_price)
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </div>

              <div
                className={
                  fillInfoError
                    ? "payment-methods section error"
                    : "payment-methods section"
                }
              >
                <h2 className="title">To‘lov usuli</h2>
                <div className="methods">
                  {paymantMethods.length
                    ? paymantMethods.map((item) => (
                      <label
                        key={item.id}
                        className={
                          selectedPaymentMethod === item.key
                            ? "selected"
                            : item.is_active ? "" : "disable"
                        }
                        onClick={(e) => {
                          if (item.is_active === 0) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="payment-methods"
                          value={item.id}
                          checked={selectedPaymentMethod === item.key}
                          onChange={() => setSelectedPaymentMethod(item.key)}
                        />
                        <div className="radio-content">
                          <h2 className="title">
                            <span>
                              {selectedPaymentMethod === item.key ? (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z"
                                    fill="#FFED00"
                                  />
                                  <path
                                    d="M7.25 12C7.25 9.37665 9.37665 7.25 12 7.25C14.6234 7.25 16.75 9.37665 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37665 16.75 7.25 14.6234 7.25 12Z"
                                    fill="black"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
                                    fill="#E2E5EB"
                                  />
                                </svg>
                              )}
                            </span>
                            {item.name}
                          </h2>
                          <p className="desc">{item.text}</p>
                        </div>
                        <img
                          src={`http://bereket.webclub.uz/${item.photo}`}
                          alt="bereket-strop_photo"
                        />
                      </label>
                    ))
                    : ""}
                </div>
              </div>
            </div>

            <div className="right">
              <h2 className="title">{t('in_your_order')}:</h2>
              <div className="promo_code">
                <input
                  type="text"
                  placeholder={t('promo_code')}
                  name="promo-code"
                  id="promo-code"
                />
                <span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.08041 11.6797C2.76973 11.6797 2.48623 11.4279 2.50052 11.0987C2.58416 9.17109 2.81851 7.91622 3.47509 6.92355C3.85284 6.35245 4.32206 5.85574 4.86153 5.45585C6.31968 4.375 8.37673 4.375 12.4908 4.375H17.5092C21.6233 4.375 23.6803 4.375 25.1385 5.45585C25.6779 5.85574 26.1472 6.35245 26.5249 6.92355C27.1814 7.91611 27.4158 9.17081 27.4994 11.098C27.5138 11.4276 27.2299 11.6797 26.9189 11.6797C25.1867 11.6797 23.7824 13.1662 23.7824 15C23.7824 16.8338 25.1867 18.3203 26.9189 18.3203C27.2299 18.3203 27.5138 18.5724 27.4994 18.902C27.4158 20.8293 27.1814 22.0839 26.5249 23.0765C26.1472 23.6475 25.6779 24.1442 25.1385 24.5441C23.6803 25.625 21.6233 25.625 17.5092 25.625H12.4908C8.37673 25.625 6.31968 25.625 4.86153 24.5441C4.32206 24.1442 3.85284 23.6475 3.47509 23.0765C2.81851 22.0838 2.58416 20.8289 2.50052 18.9014C2.48623 18.5721 2.76973 18.3203 3.08041 18.3203C4.81264 18.3203 6.21689 16.8338 6.21689 15C6.21689 13.1662 4.81264 11.6797 3.08041 11.6797Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.875 18.125L18.1251 11.875"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.875 11.875H11.889M18.1109 18.125H18.1251"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="order-price_box">
                <p>
                  <span>
                    {cart.reduce((acc, item) => {
                      return item.isSelected ? acc + item.quantity : acc + 0;
                    }, 0) + " "}
                    {t('counting')} {t('product')}
                  </span>
                  <span>{formatCurrency(totalSum)}</span>
                </p>
                <p>
                  <span>{t('your_discount')}</span>
                  <span>
                    -{formatCurrency(parseFloat(calculateDiscounts(cart) + ""))}
                  </span>
                </p>
                <p>
                  <span>{t('total_fee')} </span>
                  <span>{formatCurrency(totalDiscountedSum)}</span>
                </p>
              </div>
              <button className="order-btn" onClick={() => handleCreateOrder()}>
                {t('order_btn')}
              </button>
              <p dangerouslySetInnerHTML={{ __html: t('order_description') }} />
            </div>
          </div>
        </div>
      </div>

      {isSuccess && <CheckoutModal />}

      <Footer />

      {authorization ? (
        <Authorization />
      ) : ""}
    </>
  );
};

export default Checkout;
