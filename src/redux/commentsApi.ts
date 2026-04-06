import type { Comment, CreateCommentDto } from "../types";
import { baseApi } from "./api/baseApi";
import { getSocket } from "./api/socket";
import { postsApi } from "./postsApi";
import type { RootState } from "./store";


export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/api/v1/comments/post/${postId}`,
      providesTags: (result, _error, postId) => 
        result 
          ? [...result.map(({ id }) => ({ type: "comments" as const, id })), { type: "comments", id: `LIST-${postId}` }]
          : [{ type: "comments", id: `LIST-${postId}` }],
      async onCacheEntryAdded(postId, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const authString = localStorage.getItem("social_auth");
        const auth = authString ? JSON.parse(authString) : null;
        const socket = getSocket(auth?.accessToken);

        if (!socket) return;

        try {
          await cacheDataLoaded;

          socket.on('commentAdded', (data: any) => {
            if (data.postId === postId) {
              console.log(`[Socket] commentAdded received for post ${postId}:`, data);
              updateCachedData((draft) => {
                if (data.comment) {
                  if (!draft.some((c) => c.id === data.comment.id)) {
                    draft.push({ 
                      ...data.comment, 
                      replies: [], 
                      repliesCount: 0, 
                      isLiked: false, 
                      likesCount: 0 
                    });
                  }
                }
              });
            }
          });

          socket.on('replyAdded', (data: any) => {
            console.log(`[Socket] New reply added to comment ${data.parentId}:`, data.id);
            updateCachedData((draft) => {
              const parentComment = draft.find((c) => c.id === data.parentId);
              if (parentComment) {
                if (!parentComment.replies) parentComment.replies = [];
                if (!parentComment.replies.some(r => r.id === data.id)) {
                  parentComment.replies.push(data);
                  // Only update repliesCount if it exists on the comment object
                  if (typeof parentComment.repliesCount === 'number') {
                    parentComment.repliesCount += 1;
                  }
                }
              }
            });
          });

          socket.on('commentDeleted', (data: any) => {
            if (data.postId === postId && data.commentId) {
              console.log(`[Socket] Comment deleted from post ${postId}:`, data.commentId);
              updateCachedData((draft) => {
                // Find and remove the comment or its nested reply
                const index = draft.findIndex((c) => c.id === data.commentId);
                if (index !== -1) {
                  draft.splice(index, 1);
                } else {
                  // If not a top-level comment, check replies
                  draft.forEach((comment) => {
                    if (comment.replies) {
                      const replyIndex = comment.replies.findIndex((r) => r.id === data.commentId);
                      if (replyIndex !== -1) {
                        comment.replies.splice(replyIndex, 1);
                        if (typeof comment.repliesCount === 'number') {
                          comment.repliesCount -= 1;
                        }
                      }
                    }
                  });
                }
              });
            }
          });

        } catch {
          // no-op
        }

        await cacheEntryRemoved;
        socket.off('commentAdded');
        socket.off('replyAdded');
        socket.off('commentDeleted');
      },
    }),

    createComment: builder.mutation<Comment, CreateCommentDto>({
      query: (body) => ({
        url: "/api/v1/comments",
        method: "POST",
        body,
      }),
      async onQueryStarted({ postId, parentId, text }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const currentUser = state.auth.user;
        if (!currentUser) return;

        // Optimistic update for comments list
        const patchResult = dispatch(
          commentsApi.util.updateQueryData('getComments', postId, (draft) => {
            const tempId = `temp-${Date.now()}`;
            const newComment = {
              id: tempId,
              text,
              authorId: currentUser.id,
              postId,
              parentId: parentId || null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              author: currentUser,
              replies: [],
              isLiked: false,
              likesCount: 0,
              repliesCount: 0,
            };

            if (parentId) {
              const parent = draft.find(c => c.id === parentId);
              if (parent) {
                parent.replies.push(newComment as any);
                parent.repliesCount += 1;
              }
            } else {
              draft.push(newComment as any);
            }
          })
        );

        // Optimistic update for post comment count
        const patchPostResult = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined as any, (draft) => {
            const post = draft?.posts?.find(p => p.id === postId);
            if (post) post.commentsCount += 1;
          })
        );

        const patchSinglePostResult = dispatch(
          postsApi.util.updateQueryData('getPost', postId, (draft) => {
            if (draft) draft.commentsCount += 1;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchPostResult.undo();
          patchSinglePostResult.undo();
        }
      },
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
      async onQueryStarted({ id, text, postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData('getComments', postId, (draft) => {
            const comment = draft.find(c => c.id === id);
            if (comment) {
              comment.text = text;
            } else {
              draft.forEach(c => {
                const reply = c.replies?.find(r => r.id === id);
                if (reply) reply.text = text;
              });
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, { postId }) => [{ type: "comments", id: `LIST-${postId}` }],
    }),

    deleteComment: builder.mutation<{ success: boolean }, { id: string; postId: string }>({
      query: ({ id }) => ({
        url: `/api/v1/comments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData('getComments', postId, (draft) => {
            const index = draft.findIndex(c => c.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            } else {
              draft.forEach(c => {
                const rIndex = c.replies?.findIndex(r => r.id === id);
                if (rIndex !== -1) {
                  c.replies.splice(rIndex, 1);
                  c.repliesCount -= 1;
                }
              });
            }
          })
        );

        // Optimistic update for post comment count
        const patchPostResult = dispatch(
          postsApi.util.updateQueryData('getPosts', undefined as any, (draft) => {
            const post = draft?.posts?.find(p => p.id === postId);
            if (post) post.commentsCount -= 1;
          })
        );

        const patchSinglePostResult = dispatch(
          postsApi.util.updateQueryData('getPost', postId, (draft) => {
            if (draft) draft.commentsCount -= 1;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchPostResult.undo();
          patchSinglePostResult.undo();
        }
      },
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
