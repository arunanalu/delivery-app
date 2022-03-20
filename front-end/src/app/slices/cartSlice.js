import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    setInitialCart: (state, action) => {
      const { total, items } = action.payload;
      state.total = total;
      state.items = [...items];
    },
    addOneToCart: (state, action) => {
      const { items } = state;
      const { id, name, price } = action.payload;
      const productInCart = items.find((product) => product.id === id);
      if (!productInCart) {
        const newProduct = {
          name,
          price,
          id,
          quantity: 1,
        };
        items.push(newProduct);
      } else {
        const productIndex = items.indexOf(productInCart);
        items[productIndex].quantity += 1;
      }
    },
    decreaseOneFromCart: (state, action) => {
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
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const { items } = state;
      const productInCart = items.find((product) => product.id === id);
      if (!productInCart) return;

      const productIndex = items.indexOf(productInCart);
      items.splice(productIndex, 1);
    },
    removeAllFromCart: (state) => {
      const { items } = state;
      items.splice(0, items.length);
    },
    updateTotal: (state) => {
      const { items } = state;
      const totalCartValue = items.reduce((total, currentItem) => {
        const itemPrice = parseFloat(currentItem.price);
        const totalItemPrice = currentItem.quantity * itemPrice;
        total += totalItemPrice;
        return total;
      }, 0);
      state.total = (totalCartValue * 100) / 100;
    },
  },
});

export const {
  addOneToCart,
  removeFromCart,
  decreaseOneFromCart,
  updateTotal,
  setItemQuantity,
  removeAllFromCart,
  setInitialCart,
} = cart.actions;

export default cart.reducer;
