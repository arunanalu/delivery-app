import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
