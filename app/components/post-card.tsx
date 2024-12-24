import type { Post } from "~/lib/types";
import { Skeleton } from "./ui/skeleton";

function PostCardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <PostCardTitle>{post.title}</PostCardTitle>
      <p className="text-gray-600 line-clamp-2">{post.content}</p>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 text-transparent">
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
