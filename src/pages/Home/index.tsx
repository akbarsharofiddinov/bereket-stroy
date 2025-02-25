import React from "react";
import {
  Banner,
  Banner2,
  Banner3,
  Branches,
  Categories,
  Partners,
  Services,
  Suggestion,
} from "@/components";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Categories />
      <Suggestion title="Eng yaxshi takliflar" link="" />
      <Banner2 />
      <Suggestion title="Har doim foydali bo'ladi" link="" />
      <Banner3 />
      <Partners />
      <Branches />
      <Services />
    </>
  );
};

export default Home;
