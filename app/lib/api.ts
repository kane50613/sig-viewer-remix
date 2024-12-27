import type { ApiPost, ApiResponse, Post, Sig } from "./types";
import removeMarkdown from "remove-markdown";

const postCache = new Map<string, Post>();
const sigCache = new Map<string, Sig>();

export async function fetchApi<T>(path: string) {
  const response = await fetch(
    new URL(path, "https://sig-api.mingdao.edu.tw/"),
  );

  const json = (await response.json()) as ApiResponse<T>;

  return json.data;
}

export async function fetchPosts(skip: number, limit: number) {
  const posts = await fetchApi<ApiPost[]>(
    `/post/list?skip=${skip}&limit=${limit}&sort=latest`,
  );

  const cleanedPosts = posts.map((post) => ({
    ...post,
    cleanContent: removeMarkdown(post.content),
  }));

  for (const post of cleanedPosts) {
    postCache.set(post._id, post);
  }

  return cleanedPosts;
}

export async function fetchSigPosts(sigId: string, skip = 0, limit = 10) {
  const posts = await fetchApi<ApiPost[]>(
    `/post/list/sig/${sigId}?skip=${skip}&limit=${limit}&sort=latest`,
  );

  const cleanedPosts = posts.map((post) => ({
    ...post,
    cleanContent: removeMarkdown(post.content),
  }));

  for (const post of cleanedPosts) {
    postCache.set(post._id, post);
  }

  return cleanedPosts;
}

export async function fetchTopPosts(limit = 3) {
  const posts = await fetchApi<ApiPost[]>(`/post/list?limit=${limit}&skip=0`);

  const cleanedPosts = posts.map((post) => ({
    ...post,
    cleanContent: removeMarkdown(post.content),
  }));

  for (const post of cleanedPosts) {
    postCache.set(post._id, post);
  }

  return cleanedPosts;
}

export async function fetchPost(id: string) {
  if (postCache.has(id)) {
    return postCache.get(id);
  }

  const post = await fetchApi<ApiPost>(`/post/${id}`);

  const cleanedPost = {
    ...post,
    cleanContent: removeMarkdown(post.content),
  };

  postCache.set(post._id, cleanedPost);

  return cleanedPost;
}

export async function fetchSigs() {
  const sigs = await fetchApi<Sig[]>("/sig/list");

  for (const sig of sigs) {
    sigCache.set(sig._id, sig);
  }

  return sigs;
}

export async function fetchSig(handle: string) {
  if (sigCache.has(handle)) {
    return sigCache.get(handle);
  }

  const sig = await fetchApi<Sig>(`/sig/${handle}`);

  sigCache.set(sig._id, sig);

  return sig;
}
