export type ApiResponse<T> = {
  data: T;
  status: number;
};

type User = {
  _id: string;
  name: string;
};

export type Post = {
  _id: string;
  sig: Pick<Sig, "_id" | "name">;
  title: string;
  cover: string;
  content: string;
  user: Pick<User, "_id" | "name">;
  hashtag: string[];
  like: string[];
  likes: number;
  priority: number;
  pinned: boolean;
  removed: boolean;
  createdAt: string;
  updatedAt: string;
  comments: number;
};

export type Sig = {
  _id: string;
  avatar: string;
  customId: string;
  description: string;
  follower: string[];
  leader: string[];
  moderator: string[];
  name: string;
  removed: boolean;
};
