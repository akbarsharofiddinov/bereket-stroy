import React, { useEffect, useState } from "react";
import Suggestions from "../Suggestions";
import axios from "axios";
interface IProps {
  discount_data: IDiscount;
}

const DiscountSlider: React.FC<IProps> = ({ discount_data }) => {
  const [data, setData] = useState<IProduct[]>([]);
  async function getDiscountedProducts() {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/discount-products?discount_slug=${discount_data.slug}`
      );
      if (response.status === 200) setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDiscountedProducts();
  }, []);

  return (
    <>
      <Suggestions
        data={data}
        link=""
        title={discount_data.name}
        isSuccess={true}
      />
    </>
  );
};

export default DiscountSlider;
