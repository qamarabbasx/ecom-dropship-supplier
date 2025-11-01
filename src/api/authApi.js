import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "https://backend.ecomdropship.ai/", //"http://localhost:8000/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login-v1",
        method: "POST",
        body: credentials,
      }),
    }),
    getOverview: builder.query({
      query: () => ({
        url: "dashboard/overview",
        method: "GET",
      }),
    }),
    getUserProducts: builder.query({
      query: ({
        searchFilter,
        sortBy,
        sortOrder,
        selectedDate,
        page,
        limit,
      }) => {
        const params = { search: searchFilter, sortBy, sortOrder, page, limit };
        if (selectedDate) {
          params.date = selectedDate;
        }
        return {
          url: "products/user-products",
          method: "GET",
          params,
        };
      },
    }),
    getInvoices: builder.query({
      query: ({
        page,
        limit,
        sortBy = "DESC",
        sortOrder = "created",
        startDate,
        endDate,
        searchFilter,
        status,
      }) => ({
        url: "invoices",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          startDate,
          endDate,
          searchFilter,
          status,
        },
      }),
    }),
    getOrders: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "order.created",
        sortOrder = "DESC",
        startDate,
        endDate,
        searchFilter,
        supplier = false,
      }) => {
        const params = {
          page,
          limit,
          sortBy,
          sortOrder,
          searchFilter,
          supplier,
        };
        if (startDate) {
          params.startDate = startDate;
        }
        return {
          url: "orders",
          method: "GET",
          params,
        };
      },
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "users/changePassword",
        method: "POST",
        body: passwordData,
      }),
    }),
    getUsers: builder.query({
      query: ({
        page,
        limit,
        sortBy = "firstName",
        sortOrder = "ASC",
        searchFilter,
      }) => ({
        url: "users",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchFilter,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "users/updateProfile",
        method: "PATCH",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "users/create",
        method: "POST",
        body: userData,
      }),
    }),
    updateUserRoleAndStatus: builder.mutation({
      query: ({ userId, newRole, newStatus }) => ({
        url: `users/updateRoleAndStatus`,
        method: "PATCH",
        body: { userId, newRole, newStatus },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetOverviewQuery,
  useGetUserProductsQuery,
  useGetInvoicesQuery,
  useGetUserProfileQuery,
  useChangePasswordMutation,
  useGetOrdersQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useUpdateUserRoleAndStatusMutation,
} = authApi;
