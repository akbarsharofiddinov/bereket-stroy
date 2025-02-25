import React from "react";
import { Outlet } from "react-router-dom";
import { CatalogsModal, Footer, Header, SearchModal } from "@/components";

const Layout: React.FC = () => {
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
