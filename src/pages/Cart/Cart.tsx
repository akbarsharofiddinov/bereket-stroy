import React, { useEffect } from "react";
import emptyCart from "@/assets/empty-cart.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Checkbox, Services } from "@/components";
import { addProductToCart, removeProductFromCart } from "@/store/productSlice";
import { formatCurrency } from "@/utils/currencyFormat";

const Cart: React.FC = () => {
  const [isIllegal, setIsIllegal] = React.useState(false);
  const [totalSum, setTotalSum] = React.useState(0);

  const { cart } = useAppSelector((state) => state.productSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sum = cart.reduce((acc, { product, quantity }) => {
      return acc + parseFloat(product.price) * quantity;
    }, 0);
    setTotalSum(sum);
  }, [cart]);

  return (
    <div className="cart-page">
      <div className="container">
        <div className={cart.length ? "inner" : "inner empty"}>
          {cart.length ? (
            <>
              <div className="top">
                <div>
                  <h2 className="title">Savatcha</h2>
                  <p>6 ta mahsulot</p>
                </div>
                <div>
                  <Checkbox label="Hammasini tanlash" id="all" />
                </div>
              </div>

              <div className="inner">
                <div className="cart-products">
                  {cart.length
                    ? cart.map(({ product, quantity }, index) => (
                        <div className="cart-products_item" key={index}>
                          <div className="img-box">
                            <img
                              src={`http://bereket.webclub.uz/storage/${product.photos[0]}`}
                              alt=""
                            />
                          </div>
                          <div className="body">
                            <div className="cols col-1">
                              <h2 className="product_name">
                                {product.name.uz}
                              </h2>
                              <p>
                                <span>{product.id}</span> |
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
                                  {product.is_sale ? "Sotuvda" : "Sotuvda yo'q"}
                                </span>
                              </p>
                              <button className="delete-btn">
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
                                O‘chirish
                              </button>
                            </div>
                            <div className="cols col-2">
                              <p className="price">
                                {formatCurrency(parseFloat(product.price))}
                              </p>
                              <div className="count-box">
                                <button
                                  onClick={() =>
                                    dispatch(removeProductFromCart(product))
                                  }
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
                      Jismoniy shaxs
                    </button>
                    <button
                      className={isIllegal ? "legal active" : "legal"}
                      onClick={(e) => {
                        setIsIllegal(true);
                        e.preventDefault();
                      }}
                    >
                      Yuridik shaxs
                    </button>
                  </div>
                  <h2 className="title">Buyurtmangizda:</h2>
                  <div className="promo_code">
                    <input
                      type="text"
                      placeholder="Promokod"
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
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.875 18.125L18.1251 11.875"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.875 11.875H11.889M18.1109 18.125H18.1251"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="order-price_box">
                    <p>
                      <span>{cart.length} ta mahsulot</span>
                      <span>{formatCurrency(totalSum)}</span>
                    </p>
                    <p>
                      <span>Chegirmangiz</span>
                      <span>-0 so‘m</span>
                    </p>
                    <p>
                      <span>Jami to‘lov </span>
                      <span>{formatCurrency(totalSum)}</span>
                    </p>
                  </div>
                  <button className="order-btn">To‘lovga o‘tish</button>
                </div>
              </div>

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
