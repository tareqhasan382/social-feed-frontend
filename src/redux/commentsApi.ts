import type { Comment, CreateCommentDto } from "../types";
import { baseApi } from "./api/baseApi";


export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/api/v1/comments/post/${postId}`,
      providesTags: (result, _error, postId) => 
        result 
          ? [...result.map(({ id }) => ({ type: "comments" as const, id })), { type: "comments", id: `LIST-${postId}` }]
          : [{ type: "comments", id: `LIST-${postId}` }],
    }),

    createComment: builder.mutation<Comment, CreateCommentDto>({
      query: (body) => ({
        url: "/api/v1/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "comments", id: `LIST-${postId}` },
        { type: "posts", id: postId }
      ],
    }),

    updateComment: builder.mutation<Comment, { id: string; text: string; postId: string }>({
      query: ({ id, text }) => ({
        url: `/api/v1/comments/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [{ type: "comments", id: `LIST-${postId}` }],
    }),

    deleteComment: builder.mutation<{ success: boolean }, { id: string; postId: string }>({
      query: ({ id }) => ({
        url: `/api/v1/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "comments", id: `LIST-${postId}` },
        { type: "posts", id: postId }
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
