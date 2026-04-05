import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import toast from "react-hot-toast";
import { userLoggedIn, userLoggedOut } from "../authSlice";

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const authString = localStorage.getItem("social_auth");
    const auth = authString ? JSON.parse(authString) : null;
    const token = auth?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const authString = localStorage.getItem("social_auth");
        const auth = authString ? JSON.parse(authString) : null;
        const refreshToken = auth?.refreshToken;

        if (refreshToken) {
          const refreshResult: any = await baseQuery(
            {
              url: "/api/v1/auth/refresh-token",
              method: "POST",
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const { accessToken, refreshToken: newRefreshToken } = refreshResult.data.data;
            
            // Update the state and local storage
            api.dispatch(
              userLoggedIn({
                accessToken,
                refreshToken: newRefreshToken,
                user: auth.user,
              })
            );

            // Retry the original request
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Refresh token failed
            api.dispatch(userLoggedOut());
            toast.error("Session expired. Please login again.");
          }
        } else {
          // No refresh token available
          api.dispatch(userLoggedOut());
          // Only show message if the user was supposedly logged in
          if (auth?.accessToken) {
            toast.error("Session expired. Please login again.");
          }
        }
      } finally {
        release();
      }
    } else {
      // Wait for the refresh to finish and then retry
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["posts", "comments", "likes"],
});

export default baseApi;