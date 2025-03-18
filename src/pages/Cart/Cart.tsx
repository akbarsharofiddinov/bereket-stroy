import React, { useEffect, useState } from "react";
import emptyCart from "@/assets/empty-cart.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Services, Suggestion } from "@/components";
import {
  addProductToCart,
  instantRemoveProductsFromCart,
  removeProductFromCart,
  setCartProducts,
  settleProductSelected,
} from "@/store/productSlice";
import { formatCurrency } from "@/utils/currencyFormat";
import { calculateDiscounts } from "@/utils/calculateDiscounts";

import noImage from "@/assets/no-image.webp";
import { toast } from "react-toastify";
import { useGetAllProductsQuery } from "@/store/API/RTKQuery";
import { useTranslation } from "react-i18next";

interface ICart {
  product: IProduct;
  quantity: number;
  isSelected: boolean;
}

const Cart: React.FC = () => {
  const [isIllegal, setIsIllegal] = React.useState(false);
  const [totalSum, setTotalSum] = React.useState(0);
  const [totalDiscountedSum, setTotalDiscountedSum] = useState(0);

  const [cartProductsSelected, setCartProductsSelected] =
    React.useState("none");

  const navigate = useNavigate();

  const { cart } = useAppSelector((state) => state.productSlice);
  const { selectedCategory } = useAppSelector((state) => state.categorySlice);
  const token = useAppSelector((state) => state.projectSlice.token);
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError, data } = useGetAllProductsQuery({
    category_slug: selectedCategory?.slug,
  });

  const { allCategories } = useAppSelector((state) => state.categorySlice);
  const { t } = useTranslation();

  function handleRemoveAllProductFromCart(product: IProduct) {
    dispatch(instantRemoveProductsFromCart(product));
    const filteredCartProducts = cart.filter(
      (cartProduct) => cartProduct.product.id !== product.id
    );

    localStorage.setItem("cart", JSON.stringify(filteredCartProducts));
  }

  function handleCartProductSelect(product: IProduct) {
    const cartProducts: ICart[] = JSON.parse(localStorage.getItem("cart") + "");

    const updatedCartProducts = cartProducts.map((item) => ({
      ...item,
      isSelected:
        item.product.id === product.id ? !item.isSelected : item.isSelected,
    }));

    localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

    dispatch(settleProductSelected(product));
  }

  function handleAllSelectedProducts() {
    const cartProducts: ICart[] = JSON.parse(localStorage.getItem("cart") + "");
    if (cartProductsSelected === "all") {
      const updateCartProducts = cartProducts.map((item) => ({
        ...item,
        isSelected: true,
      }));

      localStorage.setItem("cart", JSON.stringify(updateCartProducts));
      dispatch(setCartProducts(updateCartProducts));
    } else if (cartProductsSelected === "none") {
      const updatedCartProducts = cartProducts.map((item) => ({
        ...item,
        isSelected: false,
      }));
      localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
      dispatch(setCartProducts(updatedCartProducts));
    }
  }

  const [currentCategory, setCurrentCategory] = useState<ICategory | undefined>(
    undefined
  );

  useEffect(() => {
    if (cart.length) {
      const findCategory = allCategories.find(
        (item) => item.id === cart[0].product.category_id
      );

      setCurrentCategory(findCategory!);
    }
  }, [cart]);

  useEffect(() => {
    const calculateSumAndSelection = async () => {
      const totalSum = cart.reduce((acc, { isSelected, product, quantity }) => {
        return isSelected ? acc + parseFloat(product.price) * quantity : acc;
      }, 0);

      const discountedSum = cart.reduce(
        (acc, { isSelected, product, quantity }) => {
          return isSelected
            ? acc + parseFloat(product.discounted_price) * quantity
            : acc;
        },
        0
      );

      setTotalSum(totalSum);
      setTotalDiscountedSum(discountedSum);

      const allSelected = cart.every((item) => item.isSelected);
      const noneSelected = cart.every((item) => !item.isSelected);

      const mixedSelected = !allSelected && !noneSelected;

      if (allSelected) setCartProductsSelected("all");
      else if (noneSelected) setCartProductsSelected("none");
      else if (mixedSelected) setCartProductsSelected("mixed");
    };

    calculateSumAndSelection();
  }, [cart]);

  return (
    <div className="cart-page">
      <div className="container">
        <div className={cart.length ? "cart-inner" : "cart-inner empty"}>
          {cart.length ? (
            <>
              <div className="top">
                <div>
                  <h2 className="title">{t("cart")}</h2>
                  <p>
                    {cart.length} {t("counting")} {t("product").toLowerCase()}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="select-cartProducts"
                    className={
                      cartProductsSelected === "all" ||
                      cartProductsSelected === "mixed"
                        ? "checkbox active"
                        : "checkbox"
                    }
                    onClick={() => {
                      if (cartProductsSelected === "all")
                        setCartProductsSelected("none");
                      else setCartProductsSelected("all");
                    }}
                  >
                    <input
                      type="checkbox"
                      id="select-cartProducts"
                      checked={cartProductsSelected === "all"}
                      onChange={() => handleAllSelectedProducts()}
                    />
                    <div className="checkmark">
                      <span>
                        {cartProductsSelected === "all" ? (
                          <svg
                            width="16"
                            height="13"
                            viewBox="0 0 16 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4375 0.652411C15.6297 1.1702 15.3657 1.7457 14.8479 1.93782C13.7962 2.32801 12.6693 3.1399 11.5438 4.21544C10.4286 5.28114 9.3699 6.55194 8.4483 7.7861C7.5287 9.0176 6.7581 10.1958 6.2172 11.0669C5.9276 11.5332 5.6421 12.0027 5.3758 12.4829C5.2011 12.7993 4.8689 12.9976 4.5074 13.0002C4.1459 13.0029 3.8111 12.8103 3.6318 12.4964C2.68252 10.8352 1.89836 10.0873 1.42654 9.757C1.13674 9.5541 0.96606 9.5072 0.92605 9.4976C0.4083 9.4597 0 9.0277 0 8.5003C0 7.948 0.44772 7.5003 1 7.5003C1.56627 7.5042 2.12266 7.803 2.57346 8.1185C3.1234 8.5035 3.767 9.1168 4.4681 10.0925C5.0322 9.1802 5.8541 7.9175 6.8458 6.58946C7.8066 5.30277 8.9391 3.93815 10.1621 2.76948C11.3748 1.61064 12.7332 0.589201 14.1521 0.0627212C14.6699 -0.129389 15.2454 0.134621 15.4375 0.652411Z"
                              fill="black"
                            />
                          </svg>
                        ) : cartProductsSelected === "mixed" ? (
                          <svg
                            width="10"
                            height="2"
                            viewBox="0 0 10 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 1C0 0.4477 0.44772 0 1 0H9C9.5523 0 10 0.4477 10 1C10 1.5523 9.5523 2 9 2H1C0.44772 2 0 1.5523 0 1Z"
                              fill="black"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <span className="label">{t("select_all")}</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="cart-products">
                  {cart.length
                    ? cart.map(({ product, quantity, isSelected }, index) => (
                        <div
                          className="cart-products_item"
                          key={index}
                          onClick={() => {
                            navigate(`/details/${product.slug}`);
                          }}
                        >
                          <div className="img-box">
                            <span
                              className={
                                isSelected ? "select-btn active" : "select-btn"
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCartProductSelect(product);
                              }}
                            >
                              {isSelected && (
                                <svg
                                  width="16"
                                  height="13"
                                  viewBox="0 0 16 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.4375 0.652411C15.6297 1.1702 15.3657 1.7457 14.8479 1.93782C13.7962 2.32801 12.6693 3.1399 11.5438 4.21544C10.4286 5.28114 9.3699 6.55194 8.4483 7.7861C7.5287 9.0176 6.7581 10.1958 6.2172 11.0669C5.9276 11.5332 5.6421 12.0027 5.3758 12.4829C5.2011 12.7993 4.8689 12.9976 4.5074 13.0002C4.1459 13.0029 3.8111 12.8103 3.6318 12.4964C2.68252 10.8352 1.89836 10.0873 1.42654 9.757C1.13674 9.5541 0.96606 9.5072 0.92605 9.4976C0.4083 9.4597 0 9.0277 0 8.5003C0 7.948 0.44772 7.5003 1 7.5003C1.56627 7.5042 2.12266 7.803 2.57346 8.1185C3.1234 8.5035 3.767 9.1168 4.4681 10.0925C5.0322 9.1802 5.8541 7.9175 6.8458 6.58946C7.8066 5.30277 8.9391 3.93815 10.1621 2.76948C11.3748 1.61064 12.7332 0.589201 14.1521 0.0627212C14.6699 -0.129389 15.2454 0.134621 15.4375 0.652411Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </span>
                            {product.photos ? (
                              <img
                                src={`http://bereket.webclub.uz/storage/${product.photos[0]}`}
                                alt=""
                              />
                            ) : (
                              <img src={noImage} alt="" />
                            )}
                          </div>
                          <div className="body">
                            <div className="cols col-1">
                              <h2 className="product_name">{product.name}</h2>
                              <p>
                                <span>№{product.id}</span> |
                                <span>
                                  <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.04102 10.5003C1.04102 15.4478 5.05179 19.4587 9.99938 19.4587C14.9469 19.4587 18.9577 15.4478 18.9577 10.5003C18.9577 8.74163 18.4509 7.10133 17.5754 5.71745C17.4549 5.52693 17.3946 5.43166 17.2874 5.41171C17.1801 5.39176 17.0892 5.45933 16.9073 5.59445C16.5401 5.86721 16.167 6.17955 15.7921 6.52393C14.8215 7.41573 13.8861 8.47825 13.0655 9.50882C12.2465 10.5373 11.552 11.5211 11.0619 12.2483C10.8172 12.6115 10.6242 12.9097 10.493 13.116C10.4274 13.2192 10.3773 13.2994 10.3439 13.3532L10.3065 13.4137L10.2976 13.4284L10.2955 13.4317C10.1425 13.684 9.86697 13.8372 9.57188 13.8334C9.27672 13.8296 9.00563 13.6698 8.85913 13.4136C8.06812 12.0292 7.41465 11.406 7.02146 11.1307C6.82607 10.994 6.69316 10.9417 6.6347 10.9232C6.6312 10.922 6.62946 10.9215 6.62284 10.9197C6.61701 10.9182 6.60723 10.9162 6.60129 10.9152C6.59455 10.9141 6.58737 10.9132 6.57298 10.9117C6.15653 10.8654 5.83268 10.5122 5.83268 10.0834C5.83268 9.62324 6.20577 9.25007 6.66602 9.25007C6.73187 9.24282 6.91887 9.24957 7.14003 9.3349C7.36803 9.40749 7.65178 9.53749 7.97723 9.76532C8.4183 10.0741 8.9318 10.5592 9.49063 11.3202C9.53788 11.3845 9.63513 11.3832 9.67972 11.317C10.187 10.5642 10.9079 9.54274 11.7616 8.47059C12.6138 7.40045 13.6085 6.26678 14.6645 5.29661C15.0054 4.98351 15.3576 4.68264 15.7184 4.40415C15.9485 4.22655 16.0635 4.13776 16.066 4.01811C16.0685 3.89847 15.9644 3.81111 15.7563 3.6364C14.1994 2.32921 12.1913 1.54196 9.99938 1.54196C5.05179 1.54196 1.04102 5.55274 1.04102 10.5003Z"
                                      fill="#009846"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  {product.is_sale
                                    ? t("in_sale")
                                    : "Sotuvda yo'q"}
                                </span>
                              </p>
                              <button
                                className="delete-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveAllProductFromCart(product);
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
                                    d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M9.5 16.5V10.5"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M14.5 16.5V10.5"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                {t("delete")}
                              </button>
                            </div>
                            <div className="cols col-2">
                              <div className="price-box">
                                <p className="price">
                                  {formatCurrency(
                                    parseFloat(product.discounted_price)
                                  )}
                                  <span>{" " + quantity + "x"}</span>
                                </p>
                                {product.discount ? (
                                  <>
                                    <p className="original-price">
                                      {formatCurrency(
                                        parseFloat(product.price)
                                      )}
                                    </p>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div
                                className="count-box"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <button
                                  onClick={() => {
                                    const cartProducts: ICart[] = JSON.parse(
                                      localStorage.getItem("cart") + ""
                                    );
                                    const filtered = cartProducts.filter(
                                      (item) => item.product.id !== product.id
                                    );
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(filtered)
                                    );

                                    dispatch(removeProductFromCart(product));
                                  }}
                                >
                                  <svg
                                    width="17"
                                    height="2"
                                    viewBox="0 0 17 2"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.1663 1H1.83301"
                                      stroke="black"
                                      strokeOpacity="0.5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <span>{quantity}</span>
                                <button
                                  onClick={() =>
                                    dispatch(addProductToCart(product))
                                  }
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.99967 1.33337V14.6667M14.6663 8.00004H1.33301"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>

                <div className="order-content">
                  <div className="switch-user_type">
                    <button
                      className={isIllegal ? "physical" : "physical active"}
                      onClick={(e) => {
                        setIsIllegal(false);
                        e.preventDefault();
                      }}
                    >
                      {t("physical")}
                    </button>
                    <button
                      className={isIllegal ? "legal active" : "legal"}
                      onClick={(e) => {
                        setIsIllegal(true);
                        e.preventDefault();
                      }}
                    >
                      {t("legal")}
                    </button>
                  </div>
                  <h2 className="title">{t("your_order")}:</h2>
                  <div className="promo_code">
                    <input
                      type="text"
                      placeholder={t("promo_code")}
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
                          return item.isSelected ? acc + 1 : acc + 0;
                        }, 0)}
                        {t("counting")} {t("product").toLowerCase()}
                      </span>
                      <span>{formatCurrency(totalSum)}</span>
                    </p>
                    <p>
                      <span>{t("discount")}</span>
                      <span>
                        -
                        {formatCurrency(
                          parseFloat(calculateDiscounts(cart) + "")
                        )}
                      </span>
                    </p>
                    <p>
                      <span>{t("total_fee")} </span>
                      <span>{formatCurrency(totalDiscountedSum)}</span>
                    </p>
                  </div>
                  <button
                    className={
                      cartProductsSelected !== "none"
                        ? "order-btn"
                        : "order-btn disable"
                    }
                    onClick={() => {
                      if (token) {
                        if (cartProductsSelected !== "none")
                          navigate("/checkout");
                      } else {
                        toast(
                          "Buyurtmani rasmiylashtirish uchun avval tizimdan ro'yxatdan o'ting",
                          {
                            type: "warning",
                          }
                        );
                      }
                    }}
                  >
                    {t("proceed_payment")}
                  </button>
                </div>
              </div>

              <Suggestion
                title={t("similar_prodcuts")}
                data={data?.data!}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                link={`/catalogs/${currentCategory?.slug}`}
              />

              <Services />
            </>
          ) : (
            <div className="empty-cart">
              <img src={emptyCart} alt="" />
              <h3 className="title">Savatingiz bo‘sh qolmoqda</h3>
              <p className="desc">
                Ro'yxatni to'ldirish uchun <br /> Mahsulotlarni savatchaga
                qo‘shing
              </p>
              <Link to={"/"}>Bosh sahifaga o‘tish</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
