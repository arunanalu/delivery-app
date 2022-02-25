import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
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
    setItemQuantity: (state, action) => {
      const { items } = state;
      const { id, name, price, quantity } = action.payload;
      const productInCart = items.find((product) => product.id === id);
      if (!productInCart) {
        const newProduct = {
          name,
          price,
          id,
          quantity,
        };
        items.push(newProduct);
      } else {
        const productIndex = items.indexOf(productInCart);
        if (quantity === 0) {
          items.splice(productIndex, 1);
        } else {
          items[productIndex].quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      console.log(id)
      let { items } = state;
      const productInCart = items.find((product) => product.id === id);
      if (!productInCart) return;

      const productIndex = items.indexOf(productInCart);
      items.splice(productIndex, 1);
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

export const {
  addOneToCart,
  removeFromCart,
  decreaseOneFromCart,
  updateTotal,
  setItemQuantity,
} = cart.actions;

export default cart.reducer;
