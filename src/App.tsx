import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { Cart, Catalog, Checkout, Home, ProductDetails } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "details",
        element: <ProductDetails />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
