import React from "react";
import checkout from "@/assets/checkout.png";
import { useNavigate } from "react-router-dom";

const CheckoutModal: React.FC = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="checkout-modal" onClick={() => navigate("/")}>
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <img src={checkout} alt="bereket-strop_photo" />
          <h2 className="title">Buyurtmangiz qabul qilindi !</h2>
          <p className="desc">Tez orada operatorlar siz bilan bog’lanishadi!</p>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
