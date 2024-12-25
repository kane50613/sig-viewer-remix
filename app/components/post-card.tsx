import type { Post } from "~/lib/types";
import { Skeleton } from "./ui/skeleton";
import { cn } from "~/lib/utils";
import { getRelativeTimeString } from "~/lib/relative-time";

export function PostHeader({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between", className)}>
      <span>{post.sig.name}</span>
      <span className="text-muted-foreground">
        {getRelativeTimeString(new Date(post.createdAt))}
      </span>
    </div>
  );
}

function PostCardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mb-2">{children}</h2>;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col py-6">
      <PostHeader post={post} />
      <PostCardTitle>{post.title}</PostCardTitle>
      <p className="text-gray-600 line-clamp-2">{post.cleanContent}</p>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 py-6 text-transparent">
      <Skeleton>
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
    <div className="flex flex-col gap-4 divide-y container">{children}</div>
  );
}
