import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../";

type productsParams = {
  page?: number;
  category_slug?: string;
  sub_category_slug?: string;
  sub_sub_category_slug?: string;
  sort_by?: string;
};

export const bereketAPI = createApi({
  reducerPath: "bereketAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://bereket.webclub.uz/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const projectSlice = state.projectSlice;

      const token = localStorage.getItem("token");

      if (projectSlice.currentLanguage) {
        headers.set("Access-Language", projectSlice.currentLanguage);
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<APIResponse<IProduct[]>, productsParams>({
      query: ({
        page,
        category_slug,
        sub_category_slug,
        sub_sub_category_slug,
        sort_by,
      }) => ({
        url: `/products`,
        params: {
          page,
          category_slug,
          sub_category_slug,
          sub_sub_category_slug,
          sort_by,
        },
      }),
    }),

    getProductDetails: build.query<APIResponse<IProduct[]>, string>({
      query: (slug) => `/products?slug=${slug}`,
    }),

    getAllCategories: build.query<APIResponse<ICategory[]>, void>({
      query: () => `/categories`,
    }),

    getUserInfo: build.query<any, void>({
      query: () => "/user/me",
    }),

    getBestOfferedProducts: build.query<APIResponse<IProduct[]>, void>({
      query: () => "/best-offers",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetAllCategoriesQuery,
  useGetUserInfoQuery,
  useGetBestOfferedProductsQuery,
} = bereketAPI;
