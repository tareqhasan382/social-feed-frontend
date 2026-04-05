import type { CreatePostDto, Post } from "../types";
import { baseApi } from "./api/baseApi";


export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[]; nextCursor?: string }, { cursor?: string; limit?: number; search?: string } | void>({
      query: (params) => ({
        url: "/api/v1/posts",
        params: params || {},
      }),
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ id }) => ({ type: "posts" as const, id })),
              { type: "posts", id: "LIST" },
            ]
          : [{ type: "posts", id: "LIST" }],
    }),

    getPost: builder.query<Post, string>({
      query: (id) => `/api/v1/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "posts", id }],
    }),

    createPost: builder.mutation<Post, CreatePostDto>({
      query: (body) => ({
        url: "/api/v1/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "posts", id: "LIST" }],
    }),

    updatePost: builder.mutation<Post, { id: string; body: Partial<CreatePostDto> }>({
      query: ({ id, body }) => ({
        url: `/api/v1/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "posts", id },
        { type: "posts", id: "LIST" },
      ],
    }),

    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "posts", id },
        { type: "posts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
