import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CatalogsModal, Footer, Header, SearchModal } from "@/components";
import { useAppDispatch } from "./store/hooks";
import axios from "axios";
import { setAllCategories } from "./store/categorySlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();

  async function getAllCategories() {
    try {
      const response = await axios.get(
        "https://bereket.webclub.uz/api/categories"
      );
      if (response.status === 200) {
        dispatch(setAllCategories(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Header />
      <SearchModal />
      <CatalogsModal />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
