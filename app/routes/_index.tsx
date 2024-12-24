import { fetchPosts, fetchSigs, fetchTopPosts } from "~/lib/api";
import type { Route } from "./+types/_index";
import { Suspense } from "react";
import { Await } from "react-router";
import {
  SigCard,
  SigCardsContainer,
  SigCardSkeleton,
} from "~/components/sig-card";
import {
  PostCard,
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
      <Suspense
        fallback={
          <SigCardsContainer>
            {Array.from({ length: 5 }, (_, i) => (
              <SigCardSkeleton key={i} />
            ))}
          </SigCardsContainer>
        }
      >
        <Await resolve={loaderData.sigs}>
          {(sigs) => (
            <SigCardsContainer>
              {sigs.map((sig) => (
                <SigCard key={sig._id} sig={sig} />
              ))}
            </SigCardsContainer>
          )}
        </Await>
      </Suspense>
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
      <Suspense
        fallback={
          <PostCardsContainer>
            {Array.from({ length: 5 }, (_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </PostCardsContainer>
        }
      >
        <Await resolve={loaderData.posts}>
          {(posts) => (
            <PostCardsContainer>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </PostCardsContainer>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
