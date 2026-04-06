import type { CreatePostDto, Post } from "../types";
import { baseApi } from "./api/baseApi";
import { getSocket } from "./api/socket";


export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[]; nextCursor?: string }, { cursor?: string; limit?: number; search?: string } | void>({
      query: (params) => ({
        url: "/api/v1/posts",
        params: params || {},
      }),
      // Only serialize based on search, ignore cursor for merging
      serializeQueryArgs: ({ queryArgs }) => {
        const search = (queryArgs as any)?.search || 'default';
        return { search };
      },
      // Merge incoming posts with existing ones
      merge: (currentCache, newItems, { arg }) => {
        if (!arg || !arg.cursor) {
          return newItems;
        }
        // Filter out any duplicates if they exist
        const existingIds = new Set(currentCache.posts.map(p => p.id));
        const uniqueNewPosts = newItems.posts.filter(p => !existingIds.has(p.id));
        
        return {
          ...newItems,
          posts: [...currentCache.posts, ...uniqueNewPosts],
        };
      },
      // Refetch when search OR cursor changes
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          (currentArg as any)?.search !== (previousArg as any)?.search ||
          (currentArg as any)?.cursor !== (previousArg as any)?.cursor
        );
      },
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ id }) => ({ type: "posts" as const, id })),
              { type: "posts", id: "LIST" },
            ]
          : [{ type: "posts", id: "LIST" }],
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const authString = localStorage.getItem("social_auth");
        const auth = authString ? JSON.parse(authString) : null;
        const socket = getSocket(auth?.accessToken);

        if (!socket) {
          console.log('[Socket] No socket available for onCacheEntryAdded');
          return;
        }

        try {
          await cacheDataLoaded;
          console.log('[Socket] Cache loaded, setting up listeners for getPosts');

          const handlePostUpdate = (data: { 
            postId: string, 
            likesCount: number, 
            commentsCount: number, 
            likedBy?: { id: string, avatarUrl: string | null }[],
            comment?: any
          }) => {
            console.log(`[Socket] Received ${data.postId} update:`, data);
            updateCachedData((draft) => {
              if (draft?.posts) {
                const post = draft.posts.find((p) => p.id === data.postId);
                if (post) {
                  console.log(`[Socket] Updating post ${data.postId} in cache (getPosts)`);
                  post.likesCount = data.likesCount;
                  post.commentsCount = data.commentsCount;
                  // If likedBy is provided (even if empty), update likedUsers
                  if (data.likedBy !== undefined) {
                    post.likedUsers = data.likedBy;
                  }
                  // Optional: Update latest comment if UI needs it (not currently used in PostCard)
                }
              }
            });
          };

          socket.on('postLiked', handlePostUpdate);
          socket.on('postUnliked', handlePostUpdate);
          socket.on('commentAdded', handlePostUpdate);
          socket.on('commentDeleted', handlePostUpdate);

        } catch (err) {
          console.error('[Socket] Error in onCacheEntryAdded:', err);
        }

        await cacheEntryRemoved;
        console.log('[Socket] Cache entry removed, cleaning up getPosts listeners');
        socket.off('postLiked');
        socket.off('postUnliked');
        socket.off('commentAdded');
        socket.off('commentDeleted');
      },
    }),

    getPost: builder.query<Post, string>({
      query: (id) => `/api/v1/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "posts", id }],
      async onCacheEntryAdded(id, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const authString = localStorage.getItem("social_auth");
        const auth = authString ? JSON.parse(authString) : null;
        const socket = getSocket(auth?.accessToken);

        if (!socket) return;

        try {
          await cacheDataLoaded;

          const handlePostUpdate = (data: { 
            postId: string, 
            likesCount: number, 
            commentsCount: number, 
            likedBy?: { id: string, avatarUrl: string | null }[] 
          }) => {
            if (data.postId === id) {
              console.log(`[Socket] Updating single post ${id} in cache (getPost)`);
              updateCachedData((draft) => {
                if (draft) {
                  draft.likesCount = data.likesCount;
                  draft.commentsCount = data.commentsCount;
                  if (data.likedBy !== undefined) {
                    draft.likedUsers = data.likedBy;
                  }
                }
              });
            }
          };

          socket.on('postLiked', handlePostUpdate);
          socket.on('postUnliked', handlePostUpdate);
          socket.on('commentAdded', handlePostUpdate);
          socket.on('commentDeleted', handlePostUpdate);

        } catch {
          // no-op
        }

        await cacheEntryRemoved;
        socket.off('postLiked');
        socket.off('postUnliked');
        socket.off('commentAdded');
        socket.off('commentDeleted');
      },
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
