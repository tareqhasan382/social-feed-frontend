
import { createSlice } from "@reduxjs/toolkit";

const authString = localStorage.getItem("social_auth");
const auth = authString ? JSON.parse(authString) : null;

const initialState = {
  accessToken: auth?.accessToken || null,
  user: auth?.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      localStorage.setItem(
        "social_auth",
        JSON.stringify({
          accessToken: action.payload.accessToken,
          user: action.payload.user,
        })
      );
    },

    userLoggedOut: (state) => {
      localStorage.removeItem("social_auth");
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;