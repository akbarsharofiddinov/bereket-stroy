import React from "react";
import {
  Banner,
  Banner2,
  Banner3,
  Branches,
  // Categories,
  Partners,
  Services,
  Suggestion,
} from "@/components";

const Home: React.FC = () => {
  

  return (
    <>
      <Banner />
      <Banner2 />
      {/* <Categories /> */}
      <Suggestion title="Eng yaxshi takliflar" link="" />
      <Banner3 />
      <Suggestion title="Har doim foydali bo'ladi" link="" />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
