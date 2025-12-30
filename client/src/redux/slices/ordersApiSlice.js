import { apiSlice } from './apiSlice';
const ORDERS_URL = '/api/orders';
const PAYPAL_URL = '/api/config/paypal';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create New Order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),

    // 2. Get Single Order Details
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 3. Pay Order (User)
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),

    // 4. Get PayPal ID
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    // 5. Get Logged In User's Orders (Profile)
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 6. Get ALL Orders (Admin Only)
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    // 7. Mark Order as Delivered (Admin Only)
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,      // <--- For Profile Page
  useGetOrdersQuery,        // <--- For Admin Dashboard
  useDeliverOrderMutation,  // <--- For Admin Dashboard
} = ordersApiSlice;