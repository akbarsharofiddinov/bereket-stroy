import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModal } from "@/store/projectSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Orders: React.FC = () => {
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
      console.log(response);
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
        <div className="continer"></div>
      </div>
    </>
  );
};

export default Orders;
