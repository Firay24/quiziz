import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer;
