import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    role: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
