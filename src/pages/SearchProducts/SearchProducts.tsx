import { Products } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { setSearchedProducts } from "@/store/productSlice";
import axios from "axios";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const SearchProducts: React.FC = () => {
  const { product_name } = useParams();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  async function searchProducts(query: string) {
    try {
      const response = await axios.get(
        `https://bereket.webclub.uz/api/product-search?name=${query}`,
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setSearchedProducts(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (product_name) searchProducts(product_name);
  }, [product_name]);

  return (
    <>
      <div className="search-products">
        <div className="container">
          <Products />
        </div>
      </div>
    </>
  );
};

export default SearchProducts;
