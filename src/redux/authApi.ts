import baseApi from "./api/baseApi";
import { userLoggedIn } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data?.data?.accessToken;
          const refreshToken = data?.data?.refreshToken;
          const user = data?.data?.user;
          
          dispatch(
            userLoggedIn({
              accessToken,
              refreshToken,
              user,
            })
          );
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;