import { fetchComments, fetchPost, fetchsigById, fetchUser } from "~/lib/api";
import type { Route } from "./+types/posts.$postId._index";
import Markdown from "markdown-to-jsx";
import { Suspense } from "react";
import { Await } from "react-router";
import { SigCard } from "~/components/sig-card";
import { CommentsCard } from "~/components/comments-card";
import { AuthorCard } from "~/components/author-card";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const post = await fetchPost(params.postId);

  if (!post) {
    throw new Response("Post Not Found", {
      status: 404,
    });
  }

  return {
    sig: fetchsigById(typeof post.sig === "string" ? post.sig : post.sig._id),
    post,
    comments: fetchComments(post._id),
    author: fetchUser(
      typeof post.user === "string" ? post.user : post.user._id,
    ),
  };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container grid gap-4 p-4 sm:grid-cols-[2fr_1fr]">
      <article className="flex flex-col gap-4 p-4">
        <div className="prose">
          <h1>{loaderData.post.title}</h1>
          <img
            src={loaderData.post.cover}
            className="aspect-video w-full rounded-lg object-contain"
          />
          <Markdown>{loaderData.post.content}</Markdown>
        </div>
      </article>
      <aside className="sticky top-20 flex h-fit flex-col gap-4">
        <Suspense>
          <Await resolve={loaderData.author}>
            {(author) => <AuthorCard user={author} />}
          </Await>
        </Suspense>
        <Suspense>
          <Await resolve={loaderData.sig}>
            {(sig) => <SigCard sig={sig} />}
          </Await>
        </Suspense>
        <Suspense>
          <Await resolve={loaderData.comments}>
            {(comments) => <CommentsCard comments={comments} />}
          </Await>
        </Suspense>
      </aside>
    </div>
  );
}
