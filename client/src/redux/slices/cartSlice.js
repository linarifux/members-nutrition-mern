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
      
      // We use 'sku' (or a combination of ID + variant) to identify unique items
      const existItem = state.cartItems.find((x) => x.sku === item.sku);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.sku === existItem.sku ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Automatically open the drawer when user adds an item
      state.isCartOpen = true; 
      
      return updateCart(state);
    },
    
    removeFromCart: (state, action) => {
      // Filter out by SKU
      state.cartItems = state.cartItems.filter((x) => x.sku !== action.payload);
      return updateCart(state);
    },

    toggleCartDrawer: (state, action) => {
        // If true/false is passed, set it. Otherwise toggle.
        state.isCartOpen = action.payload !== undefined ? action.payload : !state.isCartOpen;
    },
    
    clearCart: (state) => {
        state.cartItems = [];
        return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart, toggleCartDrawer, clearCart } = cartSlice.actions;

export default cartSlice.reducer;