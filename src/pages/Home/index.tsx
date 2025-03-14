import React from "react";
import {
  Banner,
  Banner2,
  Branches,
  Categories,
  Partners,
  Services,
} from "@/components";

import Suggestions from "@/components/Suggestions";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Banner2 />
      <Suggestions title="Eng yaxshi takliflar" link="" />
      <Categories />
      <Suggestions title="Har doim foydali bo'ladi" link="" />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
