import type { ApiResponse, ToggleLikeDto } from "../../types";
import baseApi from "../api/baseApi";
import { postsApi } from "../postsApi";
import type { RootState } from "../store";

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<ApiResponse<{ liked: boolean }>, ToggleLikeDto>({
      query: (body) => ({
        url: "/api/v1/likes/toggle",
        method: "POST",
        body,
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled, getState }) {
        if (!postId) return;

        const state = getState() as RootState;
        const currentUser = state.auth.user;

        // Optimized patch for getPosts
        const patchResultPosts = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined as any, (draft) => {
            if (!draft?.posts) return;
            const post = draft.posts.find((p) => p.id === postId);
            if (post) {
              const wasLiked = post.isLiked;
              post.isLiked = !wasLiked;
              post.likesCount += wasLiked ? -1 : 1;
              
              if (currentUser) {
                if (post.isLiked) {
                  post.likedUsers = [
                    { id: currentUser.id, avatarUrl: currentUser.avatarUrl },
                    ...(post.likedUsers || []).slice(0, 2)
                  ];
                } else {
                  post.likedUsers = (post.likedUsers || []).filter(u => u.id !== currentUser.id);
                }
              }
            }
          })
        );

        // Optimized patch for getPost
        const patchResultSingle = dispatch(
          postsApi.util.updateQueryData('getPost', postId, (draft) => {
            if (draft) {
              const wasLiked = draft.isLiked;
              draft.isLiked = !wasLiked;
              draft.likesCount += wasLiked ? -1 : 1;
              
              if (currentUser) {
                if (draft.isLiked) {
                  draft.likedUsers = [
                    { id: currentUser.id, avatarUrl: currentUser.avatarUrl },
                    ...(draft.likedUsers || []).slice(0, 2)
                  ];
                } else {
                  draft.likedUsers = (draft.likedUsers || []).filter(u => u.id !== currentUser.id);
                }
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResultPosts.undo();
          patchResultSingle.undo();
        }
      },
      invalidatesTags: (_result, _error, { commentId }) => 
        commentId ? ["comments"] : [],
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
