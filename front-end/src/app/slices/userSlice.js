import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    token: '',
    role: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
