import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

//console.log("BASEURL-------->", BASE_URL)
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: () => ({}),
  tagTypes: ["posts","comments","likes"],
});

export default baseApi;