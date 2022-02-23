import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { items } = state;
      const { id, name, price } = action.payload;
      const productInCart = items.find((product) => product.id === id);
      if (productInCart) {
        const productIndex = items.indexOf(productInCart);
        items[productIndex].quantity += 1;
      } else {
        const newProduct = {
          name,
          price,
          id,
          quantity: 1,
        };

        items.push(newProduct);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const { items } = state;
      const productInCart = items.find((product) => product.id === id);
      if (productInCart) {
        const productIndex = items.indexOf(productInCart);
        if (items[productIndex].quantity === 1) {
          items.splice(productIndex, 1);
        } else {
          items[productIndex].quantity -= 1;
        }
      }
    },
    updateTotal: (state) => {
      const { items } = state;
      const totalCartValue = items.reduce((total, currentItem) => {
        const itemPrice = parseFloat(currentItem.price);
        const totalItemPrice = currentItem.quantity * itemPrice;
        total += Math.round(totalItemPrice * 100) / 100;
        return Math.round(total * 100) / 100;
      }, 0);
      state.total = totalCartValue;
    },
  },
});

export const { addToCart, removeFromCart, updateTotal } = cart.actions;

export default cart.reducer;
