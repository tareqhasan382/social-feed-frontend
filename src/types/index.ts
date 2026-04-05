export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string; // Optional because it's not always in the author object
  avatarUrl?: string | null;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string | null;
  visibility: 'PUBLIC' | 'PRIVATE';
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
}

export interface Reply {
  id: string;
  text: string;
  authorId: string;
  postId: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  isLiked: boolean;
  likesCount: number;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  author: User;
  replies: Reply[];
  isLiked: boolean;
  likesCount: number;
  repliesCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface CreatePostDto {
  content: string;
  imageUrl?: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
}

export interface CreateCommentDto {
  text: string;
  postId: string;
  parentId?: string;
}

export interface ToggleLikeDto {
  postId?: string;
  commentId?: string;
}
