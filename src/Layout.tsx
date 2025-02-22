import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
