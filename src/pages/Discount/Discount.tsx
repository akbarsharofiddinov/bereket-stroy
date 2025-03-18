import { Products } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedCardProducts } from "@/store/productSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Discount: React.FC = () => {
  const { discount_slug } = useParams();
  const dispatch = useAppDispatch();

  async function getDiscountedProducts() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/discount-products?discount_slug=${discount_slug}`
      );
      if (response.status === 200)
        dispatch(setSelectedCardProducts(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (discount_slug) getDiscountedProducts();
  }, [discount_slug]);

  return (
    <>
      <div className="discount-page">
        <div className="container">
          <Products />
        </div>
      </div>
    </>
  );
};

export default Discount;
