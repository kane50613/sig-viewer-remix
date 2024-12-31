import type { Post } from "~/lib/types";
import { Skeleton } from "./ui/skeleton";
import { cn, idOrNameDisplay } from "~/lib/utils";
import { getRelativeTimeString } from "~/lib/relative-time";
import { Suspense } from "react";
import { Await, Link } from "react-router";

export function PostHeader({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between", className)}>
      <span>{idOrNameDisplay(post.sig)}</span>
      <span className="text-muted-foreground">
        {getRelativeTimeString(new Date(post.createdAt))}
      </span>
    </div>
  );
}

export function PostHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-between text-transparent", className)}>
      <Skeleton>
        <span>loading...</span>
      </Skeleton>
    </div>
  );
}

function PostCardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 text-2xl font-bold">{children}</h2>;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative flex flex-col gap-1 py-6">
      <PostHeader post={post} />
      <Link
        to={`/posts/${post._id}`}
        className="before:absolute before:inset-0"
      >
        <PostCardTitle>{post.title}</PostCardTitle>
      </Link>
      <p className="line-clamp-2 text-gray-600">{post.cleanContent}</p>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 py-6 text-transparent">
      <PostHeaderSkeleton />
      <Skeleton className="mb-2">
        <PostCardTitle>loading...</PostCardTitle>
      </Skeleton>
      <Skeleton>
        <p>loading...</p>
      </Skeleton>
    </div>
  );
}

export function PostCardsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col gap-4 divide-y">{children}</div>
  );
}

export function PostCardsAsyncList({ promise }: { promise: Promise<Post[]> }) {
  return (
    <Suspense
      fallback={
        <PostCardsContainer>
          {Array.from({ length: 5 }, (_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </PostCardsContainer>
      }
    >
      <Await resolve={promise}>
        {(posts) => (
          <PostCardsContainer>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </PostCardsContainer>
        )}
      </Await>
    </Suspense>
  );
}
