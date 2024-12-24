import { fetchPost } from "~/lib/api";
import type { Route } from "./+types/posts.$postId._index";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const post = await fetchPost(params.postId);

  return {
    post,
  };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return <div>Post</div>;
}
