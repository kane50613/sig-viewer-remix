import type { Post } from "~/lib/types";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { PostHeader } from "./post-card";

export function CompactPostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4 flex flex-col min-w-72 w-full">
      <PostHeader post={post} className="text-sm" />
      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
      <p className="line-clamp-2 text-muted-foreground text-sm break-all">
        {post.cleanContent}
      </p>
    </Card>
  );
}

export function CompactPostCardSkeleton() {
  return (
    <Card className="text-transparent p-4 flex flex-col gap-1 w-full min-w-72">
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
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full overflow-scroll no-scrollbar container gap-3 py-4">
      {children}
    </div>
  );
}
