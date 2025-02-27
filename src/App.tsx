import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import {
  Cart,
  Catalog,
  CatalogDetails,
  Checkout,
  Favorites,
  Home,
  Orders,
  ProductDetails,
  Profile,
} from "@/pages";
import { PageNotFound } from "@/components";

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
      },
      {
        path: "/catalog-details/:details_slug",
        element: <CatalogDetails />,
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
