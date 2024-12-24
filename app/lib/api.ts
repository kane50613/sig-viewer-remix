import type { ApiResponse, Post, Sig } from "./types";

const postCache = new Map<string, Post>();

export async function fetchApi<T>(path: string) {
  const response = await fetch(
    new URL(path, "https://sig-api.mingdao.edu.tw/")
  );

  const json = (await response.json()) as ApiResponse<T>;

  return json.data;
}

export async function fetchPosts(skip: number, limit: number) {
  const posts = await fetchApi<Post[]>(
    `/post/list?skip=${skip}&limit=${limit}&sort=latest`
  );

  for (const post of posts) {
    postCache.set(post._id, post);
  }

  return posts;
}

export async function fetchTopPosts(limit = 3) {
  const posts = await fetchApi<Post[]>(`/post/list?limit=${limit}&skip=0`);

  for (const post of posts) {
    postCache.set(post._id, post);
  }

  return posts;
}

export async function fetchPost(id: string) {
  if (postCache.has(id)) {
    return postCache.get(id);
  }

  const post = await fetchApi<Post>(`/post/${id}`);

  postCache.set(post._id, post);

  return post;
}

export function fetchSigs() {
  return fetchApi<Sig[]>("/sig/list");
}
