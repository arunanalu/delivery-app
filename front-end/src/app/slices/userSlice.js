import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    getAllUsersOnLoad: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  addUser,
  getAllUsersOnLoad,
} = user.actions;

export default user.reducer;
