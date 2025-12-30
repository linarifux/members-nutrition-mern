import { PRODUCTS_URL, UPLOAD_URL } from "../../constants";
import { apiSlice } from "./apiSlice";


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
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data, // <--- Now sends the form data
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in components
// format: use + QueryName + Query
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation, // <--- Export
  useUpdateProductMutation, // <--- Export
  useDeleteProductMutation, // <--- Export
  useUploadProductImageMutation, // <--- Export
} = productsApiSlice;
