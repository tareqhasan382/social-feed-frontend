export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  online?: boolean;
}

export interface Story {
  id: string;
  user: User;
  isOwn?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  likes: number;
  time: string;
}

export interface Post {
  id: string;
  author: User;
  time: string;
  visibility: string;
  content: string;
  image?: string;
  reactions: number;
  comments: number;
  shares: number;
  commentList: Comment[];
}

export interface ExploreItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  link: string;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  month: string;
  goingCount: number;
}
