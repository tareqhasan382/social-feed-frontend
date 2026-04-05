
import { createSlice } from "@reduxjs/toolkit";

const authString = localStorage.getItem("social_auth");
const auth = authString ? JSON.parse(authString) : null;

const initialState = {
  accessToken: auth?.accessToken || null,
  refreshToken: auth?.refreshToken || null,
  user: auth?.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;

      localStorage.setItem(
        "social_auth",
        JSON.stringify({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          user: action.payload.user,
        })
      );
    },

    userLoggedOut: (state) => {
      localStorage.removeItem("social_auth");
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;