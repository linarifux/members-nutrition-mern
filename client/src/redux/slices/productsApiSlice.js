import { PRODUCTS_URL } from '../../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Fetch All Products
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // Cache data for 5 seconds
    }),
    
    // 2. Fetch Single Product
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export hooks for usage in components
// format: use + QueryName + Query
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;