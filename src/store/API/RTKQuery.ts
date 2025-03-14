import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../";

interface APIResponse<T> {
  data: T;
  status: string;
  message: string;
  pagination: {
    current_page: number;
    total_page: number;
    total: number;
    per_page: number;
    links: {
      first: string;
      last: string;
      prev: null | string;
      next: null | string;
    };
  };
}

export const bereketAPI = createApi({
  reducerPath: "bereketAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://bereket.webclub.uz/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const projectSlice = state.projectSlice;

      if (projectSlice.currentLanguage) {
        headers.set("Access-Language", projectSlice.currentLanguage);
      }
      if (projectSlice.token) {
        headers.set("Authorization", `Bearer ${projectSlice.token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<APIResponse<IProduct[]>, void>({
      query: () => `/products`,
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
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetAllCategoriesQuery,
  useGetUserInfoQuery,
} = bereketAPI;
