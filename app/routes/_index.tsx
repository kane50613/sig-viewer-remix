import { fetchPosts, fetchSigs, fetchTopPosts } from "~/lib/api";
import type { Route } from "./+types/_index";
import { Suspense } from "react";
import { Await } from "react-router";
import { SigCardsAsyncList } from "~/components/sig-card";
import {
  PostCard,
  PostCardsAsyncList,
  PostCardsContainer,
  PostCardSkeleton,
} from "~/components/post-card";
import {
  CompactPostCard,
  CompactPostCardsContainer,
  CompactPostCardSkeleton,
} from "~/components/compact-post-card";

export async function clientLoader() {
  const posts = fetchPosts(0, 10);
  const topPosts = fetchTopPosts();
  const sigs = fetchSigs();

  return {
    posts,
    topPosts,
    sigs,
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <SigCardsAsyncList promise={loaderData.sigs} />
      <Suspense
        fallback={
          <CompactPostCardsContainer>
            {Array.from({ length: 3 }, (_, i) => (
              <CompactPostCardSkeleton key={i} />
            ))}
          </CompactPostCardsContainer>
        }
      >
        <Await resolve={loaderData.topPosts}>
          {(posts) => (
            <CompactPostCardsContainer>
              {posts.map((post) => (
                <CompactPostCard key={post._id} post={post} />
              ))}
            </CompactPostCardsContainer>
          )}
        </Await>
      </Suspense>
      <PostCardsAsyncList promise={loaderData.posts} />
    </div>
  );
}
