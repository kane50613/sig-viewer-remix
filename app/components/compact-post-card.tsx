import type { Post } from "~/lib/types";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function CompactPostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4 flex flex-col gap-1">
      <CardTitle className="text-lg">{post.title}</CardTitle>
      <p className="line-clamp-2 text-muted-foreground text-sm break-all">
        {post.content}
      </p>
    </Card>
  );
}

export function CompactPostCardSkeleton() {
  return (
    <Card className="text-transparent p-4 flex flex-col gap-1">
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
    <div className="grid md:grid-cols-3 container gap-3 py-4">{children}</div>
  );
}
