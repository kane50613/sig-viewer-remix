export type ApiResponse<T> = {
  data: T;
  status: number;
};

export type User = {
  _id: string;
  name: string;
  avatar: string;
  customId: string;
  description: string;
  email: string;
  displayName: string;
  identity: string;
};

export type ApiPost = {
  _id: string;
  sig:
    | string
    | {
        _id: string;
        name?: string;
      };
  title: string;
  cover: string;
  content: string;
  user:
    | string
    | {
        _id: string;
        name?: string;
      };
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

export type Post = ApiPost & {
  cleanContent: string;
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

export type ApiComment = {
  _id: string;
  content: string;
  createdAt: string;
  like: string[];
  post: string;
  removed: boolean;
  reply: string;
  updatedAt: string;
  user: {
    customId: string;
    avatar: string;
  };
};
