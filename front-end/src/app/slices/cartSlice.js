import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const productInCart = state.find((product) => product.id === id);
      if (productInCart) {
        const productIndex = state.indexOf(productInCart);
        state[productIndex].quantity += 1;
      } else {
        const newProduct = {
          name,
          price,
          id,
          quantity: 1,
        };

        state.push(newProduct);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const productInCart = state.find((product) => product.id === id);
      if (productInCart) {
        const productIndex = state.indexOf(productInCart);
        if (state[productIndex].quantity === 1) {
          state.splice(productIndex, 1);
        } else {
          state[productIndex].quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cart.actions;

export default cart.reducer;
