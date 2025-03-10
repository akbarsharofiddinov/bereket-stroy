import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import noOrders from "@/assets/no-orders.png";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
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
        <div className="continer">
          {orders.length ? (
            <>
              <div className="page-inner">
                <div className="top"></div>
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
