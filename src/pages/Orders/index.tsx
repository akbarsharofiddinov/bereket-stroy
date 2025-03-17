import { useAppDispatch } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";

import React, { useEffect, useState } from "react";

import noOrders from "@/assets/no-orders.png";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/currencyFormat";
import { useGetOrdersQuery } from "@/store/API/RTKQuery";
import { Loading } from "@/pages";
import { CommentModal } from "@/components";

type statusType = "all" | "inProgress" | "delivered" | "canceled";

const Orders: React.FC = () => {
  const [status, setStatus] = useState<statusType>("all");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  const dispatch = useAppDispatch();
  // async function getAllOrders() {
  //   try {
  //     const response = await axios.get(
  //       "https://bereket.webclub.uz/api/orders",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setOrders(response.data.data);
  //     }
  //   } catch (error) {
  //     toast("Buyurtmalarni ko'rish uchun avval tizimdan ro'yxatdan o'ting", {
  //       type: "warning",
  //     });
  //     dispatch(setAuthModal(true));
  //   }
  // }

  const { isLoading, isSuccess, isError, data } = useGetOrdersQuery();

  console.log(data);

  useEffect(() => {
    if (isSuccess) if (isSuccess) setOrders(data.data);
  }, [isSuccess]);

  return (
    <>
      <div className="orders-page">
        <div className="container">
          {isLoading ? (
            <Loading />
          ) : isError ? (
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
                <p
                  onClick={() => {
                    dispatch(setAuthModal(true));
                  }}
                >
                  Buyurtmalaringizni ko'rish uchun tizimga kiring
                </p>
                <Link to={"/"}>Bosh sahifaga o‘tish</Link>
              </div>
            </div>
          ) : (
            <>
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
                    Ortga
                  </Link>
                  <div>
                    <h2 className="title">Buyurtmalar</h2>
                  </div>
                </div>

                <div className="status-switcher">
                  <button
                    className={status === "all" ? "active" : ""}
                    onClick={() => setStatus("all")}
                  >
                    Barchasi
                  </button>
                  <button
                    className={status === "inProgress" ? "active" : ""}
                    onClick={() => setStatus("inProgress")}
                  >
                    Amaldagi
                  </button>
                  <button
                    className={status === "delivered" ? "active" : ""}
                    onClick={() => setStatus("delivered")}
                  >
                    Yetib kelgan
                  </button>
                  <button
                    className={status === "canceled" ? "active" : ""}
                    onClick={() => setStatus("canceled")}
                  >
                    Bekor qilingan
                  </button>
                </div>

                <div className="orders">
                  {orders.map((orderItem, index) => (
                    <div className="order-item" key={index}>
                      <div className="order-info">
                        <div className="info-top">
                          <p>
                            <span>ID raqam:</span>
                            {orderItem.id}
                          </p>
                          <span>Yo‘lda</span>
                        </div>

                        <div className="content">
                          <div className="left">
                            <p>
                              Do‘kon manzil:
                              <span>{orderItem.branch}</span>
                            </p>

                            <button className="cancel-order">
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
                              Buyurtmani bekor qilish
                            </button>
                          </div>
                          <div className="right">
                            <p className="order-date">
                              Buyurtma berilgan sana:
                              <span>
                                {orderItem.created_at
                                  .split(" ")[0]
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </span>
                            </p>
                            <p className="total-price">
                              Umumiy summa:
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
                          showProducts
                            ? "order-products active"
                            : "order-products"
                        }
                      >
                        <div
                          className="top"
                          onClick={() => setShowProducts((prev) => !prev)}
                        >
                          <p className="title">
                            Mahsulotlar soni:
                            <span>{orderItem.products_count} ta</span>
                          </p>

                          <button>
                            Ko'rsatish
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
                                    Mahsulot soni:
                                    <span>{item.quantity} ta</span>
                                  </p>
                                </div>
                              </div>
                              <p
                                className="right"
                                onClick={() => setCommentModal(true)}
                              >
                                Komment qoldirish
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
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
