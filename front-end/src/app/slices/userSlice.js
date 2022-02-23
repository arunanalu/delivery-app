import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { id, name, token } = action.payload;
      state.id = id;
      state.name = name;
      state.token = token;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
