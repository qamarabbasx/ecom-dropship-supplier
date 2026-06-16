import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Orders", "Warehouses", "Products"],
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
    verifyUser: builder.query({
      query: () => "auth",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login-v1",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `auth/reset-password/${token}`,
        method: "POST",
        body: { newPassword },
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
        startDate,
        endDate,
        page,
        limit,
        status,
        owner,
      }) => {
        const params = { search: searchFilter, sortBy, sortOrder, page, limit };
        if (startDate) {
          params.startDate = startDate;
        }
        if (endDate) {
          params.endDate = endDate;
        }
        if (status) {
          params.status = status;
        }
        if (owner) {
          params.owner = owner;
        }
        return {
          url: "products/user-products",
          method: "GET",
          params,
        };
      },
      providesTags: ["Products"],
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
    getInvoiceById: builder.query({
      query: (invoiceId) => ({
        url: `invoices/${invoiceId}`,
        method: "GET",
      }),
      providesTags: ["Invoices"],
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
        status,
        orderType,
        customer,
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
        if (endDate) {
          params.endDate = endDate;
        }
        if (status) {
          params.status = status;
        }
        if (orderType) {
          params.orderType = orderType;
        }
        if (customer) {
          params.customer = customer;
        }
        return {
          url: "orders",
          method: "GET",
          params,
        };
      },
      providesTags: ["Orders"],
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
    deleteProducts: builder.mutation({
      query: (productIds) => ({
        url: "products",
        method: "DELETE",
        body: { products: productIds },
      }),
      invalidatesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, reason }) => ({
        url: `orders/${orderId}`,
        method: "PUT",
        body: { status, ...(reason && { reason }) },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getCustomers: builder.query({
      query: () => ({
        url: "orders/customers",
        method: "GET",
      }),
    }),
    getProductOwners: builder.query({
      query: () => ({
        url: "products/owners",
        method: "GET",
      }),
    }),
    getWarehouses: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "created",
        sortOrder = "DESC",
        searchFilter,
      }) => {
        const params = {
          page,
          limit,
          sortBy,
          sortOrder,
        };
        if (searchFilter) {
          params.searchFilter = searchFilter;
        }
        return {
          url: "ware-house/list",
          method: "GET",
          params,
        };
      },
      providesTags: ["Warehouses"],
    }),
    getWareHouseManagers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "firstName",
        sortOrder = "ASC",
        searchFilter,
      }) => {
        const params = {
          page,
          limit,
          sortBy,
          sortOrder,
        };
        if (searchFilter) {
          params.searchFilter = searchFilter;
        }
        return {
          url: "ware-house/managers/list",
          method: "GET",
          params,
        };
      },
    }),
    createWareHouse: builder.mutation({
      query: (warehouseData) => ({
        url: "ware-house/create",
        method: "POST",
        body: warehouseData,
      }),
      invalidatesTags: ["Warehouses"],
    }),
    updateWareHouseManager: builder.mutation({
      query: ({ warehouseId, managerId }) => ({
        url: `ware-house/${warehouseId}/manager`,
        method: "PUT",
        body: { managerId },
      }),
      invalidatesTags: ["Warehouses"],
    }),
    getStripeConnectStatus: builder.query({
      query: () => ({
        url: "payments/connect/supplier/status",
        method: "GET",
      }),
    }),
    createStripeConnectOnboardingLink: builder.mutation({
      query: () => ({
        url: "payments/connect/supplier/onboarding",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useVerifyUserQuery,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetOverviewQuery,
  useGetUserProductsQuery,
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetUserProfileQuery,
  useChangePasswordMutation,
  useGetOrdersQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useUpdateUserRoleAndStatusMutation,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetCustomersQuery,
  useGetProductOwnersQuery,
  useGetWarehousesQuery,
  useGetWareHouseManagersQuery,
  useCreateWareHouseMutation,
  useUpdateWareHouseManagerMutation,
  useGetStripeConnectStatusQuery,
  useCreateStripeConnectOnboardingLinkMutation,
} = authApi;
