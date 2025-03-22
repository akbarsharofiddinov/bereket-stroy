import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type productsParams = {
  page?: number;
  category_slug?: string;
  sub_category_slug?: string;
  sub_sub_category_slug?: string;
  sort_by?: string;
  brandIDsStr?: string;
  countryIDsStr?: string;
  min_price?: string;
  max_price?: string;
  pagination?: number;
};

// type createOrderParams = {
//   receiver_name: string;
//   receiver_phone: string;
//   receiver_comment: string;
//   delivery_method_id: number;
//   region: string;
//   district: string;
//   address: string;
//   latitude: string;
//   longitude: string;
//   payment_type: string;
//   comment: string;
//   products: {
//     product_id: number;
//     quantity: number;
//   }[];
// };

export const bereketAPI = createApi({
  reducerPath: "bereketAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://bereket.webclub.uz/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      const language = localStorage.getItem("language");

      if (language) {
        headers.append("Access-Language", language);
      }
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query<APIResponse<IProduct[]>, productsParams>({
      query: ({
        page,
        pagination,
        category_slug,
        sub_category_slug,
        sub_sub_category_slug,
        sort_by,
        brandIDsStr,
        countryIDsStr,
        max_price,
        min_price,
      }) => {
        return {
          url: `/products?${
            brandIDsStr
              ? `${brandIDsStr}`
              : countryIDsStr
              ? `${countryIDsStr}`
              : ""
          }`,
          params: {
            page,
            pagination,
            category_slug,
            sub_category_slug,
            sub_sub_category_slug,
            sort_by,
            min_price,
            max_price,
          },
        };
      },
    }),

    getProductDetails: build.query<APIResponse<IProduct[]>, string>({
      query: (slug) => `/products?slug=${slug}`,
    }),

    getAllCategories: build.query<APIResponse<ICategory[]>, void>({
      query: () => {
        return {
          url: `/categories`,
        };
      },
    }),

    getUserInfo: build.query<any, void>({
      query: () => "/user/me",
    }),

    getBestOfferedProducts: build.query<APIResponse<IProduct[]>, void>({
      query: () => "/best-offers",
    }),

    getSiteSettings: build.query<APIResponse<ISiteSetting>, void>({
      query: () => "/setting",
    }),

    getSimilarProducts: build.query<APIResponse<IProduct[]>, string>({
      query: (product_slug) => `/similar-products/${product_slug}`,
    }),

    createOrder: build.mutation<any, any>({
      query: (data) => {
        console.log(data);
        return {
          url: "/orders",
          method: "POST",
          body: data,
        };
      },
    }),

    getOrders: build.query<APIResponse<IOrder[]>, number | undefined>({
      query: (order_status_id) =>
        `/orders${
          order_status_id ? `?order_status_id=${order_status_id}` : ""
        }`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetAllCategoriesQuery,
  useGetUserInfoQuery,
  useGetBestOfferedProductsQuery,
  useGetSiteSettingsQuery,
  useCreateOrderMutation,
  useGetSimilarProductsQuery,
  useGetOrdersQuery,
} = bereketAPI;
