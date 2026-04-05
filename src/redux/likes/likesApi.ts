import type { ApiResponse, ToggleLikeDto } from "../../types";
import baseApi from "../api/baseApi";
// import { ToggleLikeDto, ApiResponse } from "../../types";

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<ApiResponse<{ liked: boolean }>, ToggleLikeDto>({
      query: (body) => ({
        url: "/api/v1/likes/toggle",
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts", "comments"],
    }),
    
    getPostLikes: builder.query<any[], string>({
      query: (postId) => `/api/v1/likes/post/${postId}`,
      providesTags: (_result, _error, postId) => [{ type: "likes", id: `POST-${postId}` }],
    }),
  }),
});

export const {
  useToggleLikeMutation,
  useGetPostLikesQuery,
} = likesApi;
