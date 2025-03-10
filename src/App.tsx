import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import {
  Cart,
  Catalog,
  Checkout,
  Favorites,
  Home,
  Orders,
  ProductDetails,
  Profile,
  SubCatalogDetails,
  SubSubCatalogDetails,
} from "@/pages";
import { PageNotFound } from "@/components";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "catalogs/:catalog_slug",
        element: <Catalog />,
        children: [
          {
            path: ":sub_catalog_slug",
            element: <SubCatalogDetails />,
            children: [
              {
                path: ":sub_sub_catalog_slug",
                element: <SubSubCatalogDetails />,
              },
            ],
          },
        ],
      },

      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "details/:product_slug",
        element: <ProductDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: ":menu_slug",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
