import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/cartUtils';

// 1. Get data from local storage (or use defaults)
const itemsFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// 2. Define Initial State
// We spread the storage items but FORCE isCartOpen to false on load
const initialState = {
  ...itemsFromStorage,
  isCartOpen: false, 
};

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
        // We do NOT call updateCart here to avoid saving the open state unnecessarily,
        // though the initialState fix handles it either way.
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