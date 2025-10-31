import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BASE_URL || "https://backend.ecomdropship.ai/" //"http://localhost:8000/"

export const handle401Error = async () => {
  console.log("handle401Error called!");
  // Rest of your middleware logic
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    credentials: "include",
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(handle401Error),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "products/create",
        method: "POST",
        body,
      }),
    }),
    getProducts: builder.query({
      query: (type) => `products/public?badge=TICK_TOK_VERIFIED&type=${type}`,
    }),
    getProductDetail: builder.query({
      query: (id) => `products/public/${id}?type=BEST_SELLING`,
    }),
    getSupplierProducts: builder.query({
      query: () => `products`,
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetSupplierProductsQuery,
} = productApi;
