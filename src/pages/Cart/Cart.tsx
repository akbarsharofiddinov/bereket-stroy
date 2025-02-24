import React from "react";
import emptyCart from "@/assets/empty-cart.png";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const cart = false;
  return (
    <div className="cart-page">
      <div className="container">
        <div className="inner">
          {cart ? (
            ""
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
