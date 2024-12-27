import type { Post } from "~/lib/types";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { PostHeader, PostHeaderSkeleton } from "./post-card";
import { Link } from "react-router";
import type { ReactNode } from "react";

export function CompactPostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post._id}`}>
      <Card className="flex w-full min-w-72 flex-col p-4">
        <PostHeader post={post} className="text-sm" />
        <CardTitle className="mb-2 text-lg">{post.title}</CardTitle>
        <p className="line-clamp-2 break-all text-sm text-muted-foreground">
          {post.cleanContent}
        </p>
      </Card>
    </Link>
  );
}

export function CompactPostCardSkeleton() {
  return (
    <Card className="flex w-full min-w-72 flex-col gap-1 p-4 text-transparent">
      <PostHeaderSkeleton className="text-sm" />
      <Skeleton className="w-2/3">
        <CardTitle className="text-lg">loading...</CardTitle>
      </Skeleton>
      <Skeleton>
        <p className="text-sm">loading...</p>
      </Skeleton>
      <Skeleton className="w-1/2">
        <p className="text-sm">more loading...</p>
      </Skeleton>
    </Card>
  );
}

export function CompactPostCardsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="no-scrollbar container flex w-full gap-3 overflow-scroll py-4">
      {children}
    </div>
  );
}
