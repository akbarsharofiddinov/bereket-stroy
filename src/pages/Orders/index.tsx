import { useAppDispatch } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";

import React, { useEffect, useState } from "react";

import noOrders from "@/assets/no-orders.png";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/currencyFormat";
import { CommentModal } from "@/components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [openedProducts, setOpenedProducts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [orderStatusList, setOrderStatusList] = useState<IOrderStatus[]>([]);
  const [selectedOrderStatusID, setSelectedOrderStatusID] = useState<undefined | number>();

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("bereket_token");

  async function getOrderStatusList() {
    try {
      const response = await axios.get("https://bereket.webclub.uz/api/order-status-list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": i18n.language
        }
      });
      if (response.status === 200) setOrderStatusList(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrders(status_id: number | undefined) {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://bereket.webclub.uz/api/orders${status_id ? `?order_status_id=${status_id}` : ""}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": i18n.language,
        }
      });

      if (response.status === 200) {
        setOrders(response.data.data)
        setIsLoading(false)
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsSuccess(false)
    }
  }

  async function cancelOrder(orderID: number) {
    try {
      const response = await axios.post(`https://bereket.webclub.uz/api/order-cancelled/${orderID}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast(response.data.message[i18n.language], { type: "success" });
        getOrders(selectedOrderStatusID ? selectedOrderStatusID : undefined)
      }
    } catch (error) {
      console.log(error)
    }
  }


  function handleShowProducts(id: number) {
    const findItem = openedProducts.find(item => item === id);
    if (findItem) setOpenedProducts(openedProducts.filter(item => item === id ? 0 : item));
    else setOpenedProducts(prev => [...prev, id])
  }

  useEffect(() => {
    getOrderStatusList()
  }, [i18n.language])

  useEffect(() => {
    getOrders(selectedOrderStatusID)
  }, [selectedOrderStatusID])

  return (
    <>
      <div className="orders-page">
        <div className="container">
          <div className="page-inner">
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
                {t("back")}
              </Link>
              <div>
                <h2 className="title">{t("orders")}</h2>
              </div>
            </div>

            <div className="status-switcher">
              <button
                className={selectedOrderStatusID === undefined ? "active" : ""}
                onClick={() => {
                  setSelectedOrderStatusID(undefined);
                }}
              >
                {t("all")}
              </button>

              {orderStatusList.length ? (
                orderStatusList.map((item, index) => (
                  <button key={index} onClick={() => setSelectedOrderStatusID(item.id)} className={selectedOrderStatusID === item.id ? "active" : ""}>
                    {item.name}
                  </button>
                ))
              ) : ""}

            </div>
            {isLoading ? (
              <div className="loading">
                <PuffLoader />
              </div>
            ) : !isSuccess ? (
              <div className="centered">
                <div className="no-orders">
                  <img src={noOrders} alt="" />
                  <h3 className="title">
                    Siz hali ham sevili mahsulot tanlamadingiz
                  </h3>
                  <p className="desc">
                    Sizga maʼqul kelgan mahsulotlarni <br /> sevimlilarga qo‘shing
                    va ularni buyurtma qiling
                  </p>
                  {token ? (
                    ""
                  ) : (
                    <p
                      onClick={() => {
                        dispatch(setAuthModal(true));
                      }}
                    >
                      Buyurtmalaringizni ko'rish uchun tizimga kiring
                    </p>
                  )}
                  <Link to={"/"}>Bosh sahifaga o‘tish</Link>
                </div>
              </div>
            ) : (
              <>
                <div className="orders">
                  {orders.length > 0 ? (
                    orders.map((orderItem, index) => (
                      <div className="order-item" key={index}>
                        <div className="order-info">
                          <div className="info-top">
                            <p>
                              <span>ID {t("number")}:</span>
                              {orderItem.id}
                            </p>
                            <span className={orderItem.order_status_id === 6 ? "canceled" : orderItem.order_status_id === 3 ? "waiting" : orderItem.order_status_id === 1 ? "info" : "success"}>{orderItem.status}</span>
                          </div>

                          <div className="content">
                            <div className="left">
                              <p>
                                {t("address")}:<span>{orderItem.branch}</span>
                              </p>

                              <button className="cancel-order" onClick={() => cancelOrder(orderItem.id)}>
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15 9L12 12M12 12L9 15M12 12L15 15M12 12L9 9"
                                      stroke="#E31E24"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47713 17.5228 1.99997 12 1.99997"
                                      stroke="#E31E24"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.5 8.49997C2.86239 7.67054 3.3189 6.89163 3.85601 6.17675M6.17681 3.85596C6.89168 3.31885 7.67058 2.86236 8.5 2.49997"
                                      stroke="#E31E24"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                {t("cancel_order")}
                              </button>
                            </div>
                            <div className="right">
                              <p className="order-date">
                                {t("order_date")}:
                                <span>
                                  {orderItem.created_at
                                    .split(" ")[0]
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </span>
                              </p>
                              <p className="total-price">
                                {t("total_amount")}:
                                <span>
                                  {formatCurrency(
                                    parseFloat(orderItem.total_amount)
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            openedProducts.find(item => item === orderItem.id)
                              ? "order-products active"
                              : "order-products"
                          }
                        >
                          <div
                            className="top"
                            onClick={() => handleShowProducts(orderItem.id)}
                          >
                            <p className="title">
                              {t("quantity_products")}:
                              <span>
                                {orderItem.products_count} {t("counting")}
                              </span>
                            </p>

                            <button>
                              {t("show")}
                              <span>
                                <svg
                                  width="14"
                                  height="8"
                                  viewBox="0 0 14 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13 1.00005C13 1.00005 8.5811 7 7 7C5.4188 7 1 1 1 1"
                                    stroke="black"
                                    strokeOpacity="0.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                          <div className="content">
                            {orderItem.products.map((item, index) => (
                              <div className="order-product" key={index}>
                                <div className="left">
                                  <div className="img-box">
                                    <img
                                      src={`http://bereket.webclub.uz/storage/${item.photos[0]}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="body">
                                    <p className="name">{item.name}</p>
                                    <p className="quantity">
                                      {t("quantity")}:
                                      <span>
                                        {item.quantity} {t("counting")}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <p
                                  className="right"
                                  onClick={() => setCommentModal(true)}
                                >
                                  {t("leave_comment")}
                                </p>

                                {commentModal ? (
                                  <CommentModal
                                    product_id={item.id}
                                    setModal={setCommentModal}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2 style={{ textAlign: "center", marginTop: 40 }}>Hech narsa topilmadi</h2>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
