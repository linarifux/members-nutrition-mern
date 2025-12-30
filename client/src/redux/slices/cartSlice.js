import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/cartUtils';

// Load from localStorage if available
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal', isCartOpen: false };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Use 'sku' to identify unique items (Variant SKU or Product ID fallback)
      const existItem = state.cartItems.find((x) => x.sku === item.sku);

      if (existItem) {
        // If item exists, replace it (updates qty and options)
        state.cartItems = state.cartItems.map((x) =>
          x.sku === existItem.sku ? item : x
        );
      } else {
        // If not, add new item
        state.cartItems = [...state.cartItems, item];
      }

      // Automatically open the drawer when user adds an item
      state.isCartOpen = true; 
      
      return updateCart(state);
    },
    
    removeFromCart: (state, action) => {
      // Filter out by SKU (The payload must be the SKU string)
      state.cartItems = state.cartItems.filter((x) => x.sku !== action.payload);
      return updateCart(state);
    },

    toggleCartDrawer: (state, action) => {
        // If true/false is passed, set it. Otherwise toggle.
        state.isCartOpen = action.payload !== undefined ? action.payload : !state.isCartOpen;
    },
    
    clearCartItems: (state) => {
        state.cartItems = [];
        return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

export const { 
    addToCart, 
    removeFromCart, 
    toggleCartDrawer, 
    clearCartItems, 
    savePaymentMethod, 
    saveShippingAddress 
} = cartSlice.actions;

export default cartSlice.reducer;