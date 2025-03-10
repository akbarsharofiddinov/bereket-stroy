import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import noOrders from "@/assets/no-orders.png";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const { token } = useAppSelector((state) => state.projectSlice);
  const dispatch = useAppDispatch();
  async function getAllOrders() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast("Buyurtmalarni ko'rish uchun avval tizimdan ro'yxatdan o'ting", {
        type: "warning",
      });
      dispatch(setAuthModal(true));
    }
  }

  useEffect(() => {
    if (token) {
      getAllOrders();
    }
  }, [token]);
  return (
    <>
      <div className="orders-page">
        <div className="container">
          {orders.length ? (
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
                  <button className={status === "all" ? "active" : ""}>
                    Barchasi
                  </button>
                </div>
              </div>
            </>
          ) : (
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
                <Link to={"/"}>Bosh sahifaga o‘tish</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
