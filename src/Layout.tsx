import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, SearchModal } from "@/components";

const Layout: React.FC = () => {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <>
      <Header searchModal={searchModal} setSearchModal={setSearchModal} />
      {searchModal ? <SearchModal setSearchModal={setSearchModal} /> : ""}
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
